const db = require('../db');
const bcrypt = require('../api/bcrypt');
const { logger } = require('../logger/logger');
const constValue = require('../common/constants');
const dbExceptionLogger = require('../logger/dbExceptionLogger');

const staffRegister = async (empUserName, password,userType,apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    
    try {
        const [res1] = await connection.query(`SELECT  id, empUsrName, password, userType FROM loginCredentials
           WHERE empUsrName = ? AND isDelete = 0`, [empUserName]);
        if (res1.length === 0) {
          const bpassword =await bcrypt.hash(password)
          
            const [res2] = await connection.query(`INSERT INTO loginCredentials (empUsrName, password,userType) VALUES (?,?,?)`, [empUserName, bpassword,userType]);
            if (res2.insertId > 0) {
                result = { success: true, data: 'staff created successfully' };
              }
        } else {
            result = {
                data: 'already exist',
                success: false,
                register: false,
                
            }
        }
        await connection.commit();
} catch (error) {
    await connection.rollback();
      logger('error', JSON.stringify(error));
      await dbExceptionLogger.insertException(apiName,result.data,error)
    result = {
      data: error.message,
      success: false,
      login: false,
    };
  } finally {
     connection.release();
  }
  return result;
}

module.exports.staffRegister=staffRegister