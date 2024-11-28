const db = require('../db');
const bcrypt = require('../api/bcrypt');
const { logger } = require('../logger/logger');
const dbExceptionLogger=require('../logger/dbExceptionLogger')
const constValue = require('../common/constants');



const masterLogin = async (empUserName, password,userType,apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    try {
      const [res2] = await connection.query(
        `SELECT  id, empUsrName, password, userType FROM loginCredentials
           WHERE empUsrName = ? AND userType=? AND isDelete = 0`,
       [empUserName,userType]
      );
      
      if (res2.length === 0) {
        result = {
          data: 'username error',
          success: false,
          login: false,
        };
      }
      const userTypes = [constValue.userType.STAFF, constValue.userType.SUPERVISOR,
            constValue.userType.SPT];
            
        if (!userTypes.includes(res2[0].userType)) {
        result = {
          data: 'invalid',
          success: false,
          login: false,
        };
      }
      
        const ps = await bcrypt.compare(password, res2[0].password); 
      if (ps) {
        const [res1] = await connection.query(
          `SELECT  id, empUsrName, password, userType FROM loginCredentials
           WHERE id = ? AND isDelete = 0
                `,
          [res2[0].id],
        );
        result = {
          data: res1,
          success: true,
          login: true,
        };
      } else {
        result = {
          data: 'password error',
          success: false,
          login: false,
        };
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      result = {
        data: error.message,
        success: false,
        login: false,
      };
      logger('error', JSON.stringify(error));
      await dbExceptionLogger.insertException(apiName,result.data,error)
      
    } finally {
      if (connection) connection.release();
    }
    return result;
};

const staffLogin = async (empUserName, password, userType,apiName) => {
 
  
  const connection = await db.getConnection();
  await connection.beginTransaction();
  let result;
  try {
    
    const [res2] = await connection.query(
      `SELECT  id, empUsrName, password, userType FROM loginCredentials
         WHERE empUsrName = ? AND isDelete = 0`,
      [empUserName],
    );
    if (res2.length === 0) {
       return result = {
        data: 'username error',
        success: false,
        login: false,
      };
    }
    const userTypes = [constValue.userType.STAFF];
          
      if (userTypes!==res2[0].userType) {
      result = {
        data: 'invalid usertype',
        success: false,
        login: false,
      };
    }
    
      const ps = await bcrypt.compare(password, res2[0].password); 
    if (ps) {
      const [res1] = await connection.query(
        `SELECT  id, empUsrName, password, userType FROM loginCredentials
         WHERE id = ? AND isDelete = 0
              `,
        [res2[0].id],
      );
      result = {
        data:'login successfull',
        success: true,
        login: true,
      };
    } else {
      result = {
        data: 'password error',
        success: false,
        login: false,
      };
    }
    
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    result = {
      data: error.message,
      success: false,
      login: false,
    };
    logger('error', JSON.stringify(error));
    await dbExceptionLogger.insertException(apiName,result.data,error)
    
  } finally {
    if (connection) connection.release();
  }
  return result;
};
const supervisorLogin = async (empUserName, password, userType,apiName) => {
 
  
  const connection = await db.getConnection();
  await connection.beginTransaction();
  let result;
  try {
    
    const [res2] = await connection.query(
      `SELECT  id, empUsrName, password, userType FROM loginCredentials
         WHERE empUsrName = ? AND userType= ? AND isDelete = 0`,
      [empUserName,userType],
    );
    
    if (res2.length === 0) {
      return  result = {
        data: 'username error',
        success: false,
        login: false,
      };
    }
    const userTypes = [constValue.userType.SUPERVISOR];
          
      if (userTypes!==res2[0].userType) {
       result = {
        data: 'invalid usertype',
        success: false,
        login: false,
      };
    }
    
      const ps = await bcrypt.compare(password, res2[0].password); 
    if (ps) {
      const [res1] = await connection.query(
        `SELECT  id, empUsrName, password, userType FROM loginCredentials
         WHERE id = ? AND isDelete = 0
              `,
        [res2[0].id],
      );
      result = {
        data:'login successfull',
        success: true,
        login: true,
      };
    } else {
      result = {
        data: 'password error',
        success: false,
        login: false,
      };
    }
    
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    result = {
      data: error.message,
      success: false,
      login: false,
    };
    logger('error', JSON.stringify(error));
    await dbExceptionLogger.insertException(apiName,result.data,error)
    
  } finally {
    if (connection) connection.release();
  }
  return result;
};
  
module.exports.masterLogin=masterLogin
module.exports.staffLogin=staffLogin
module.exports.supervisorLogin=supervisorLogin