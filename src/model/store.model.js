const db = require('../db');
const bcrypt = require('../api/bcrypt');
const { logger } = require('../logger/logger');
const constValue = require('../common/constants');
const dbExceptionLogger=require('../logger/dbExceptionLogger')

const createStore = async ( storeNo,storeName,area,apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    
    try {
        const [res1] = await connection.query(`SELECT  storeNo,area,storeName FROM store
           WHERE storeNo = ? AND isDelete = 0`, [storeNo]);
        if (res1.length === 0) {
          
            const [res2] = await connection.query(`INSERT INTO store (storeNo,storeName,area) VALUES (?,?,?)`, [storeNo,storeName,area]);
            if (res2.insertId > 0) {
                result = { success: true, data: 'store created successfully' };
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
const listallStore = async (apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    
    try {
        const [res1] = await connection.query(`SELECT * FROM store
           WHERE isDelete = 0`);
        if (res1.length === 0) {
            result = {
                data: 'data not found',
                success: true
            }
        } else {
            result = {
                data: res1[0],
                success: true,
                
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
const updateStore = async ( storeNo,storeName,area,apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    
    try {
        const [res1] = await connection.query(`SELECT  storeNo,area,storeName FROM store
           WHERE storeNo = ? AND storeName= ? AND area=? AND isDelete = 0`, [storeNo,storeName,area]);
        if (res1.length === 0) {
          
            const [res2] = await connection.query(`UPDATE store  SET storeNo=?,storeName=?,area=? `, [storeNo,storeName,area]);
            if (res2.changedRows > 0) {
                result = { success: true, data: 'store updated successfully' };
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
const deleteStore = async ( storeNo,apiName) => {
    const connection = await db.getConnection();
    await connection.beginTransaction();
    let result;
    
    try {
        const [res1] = await connection.query(`SELECT  storeNo,area,storeName FROM store
           WHERE storeNo = ? AND isDelete = 0`, [storeNo]);
        if (res1.length !== 0) {
          
            const [res2] = await connection.query(`UPDATE store  SET isDelete = 1 `);
            if (res2.changedRows > 0) {
                result = { success: true, data: 'store deleted successfully' };
            }
        } else {
            result = {
                data: 'store dosent exists or deleted already',
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
module.exports.createStore=createStore
module.exports.listallStore=listallStore
module.exports.updateStore=updateStore
module.exports.deleteStore=deleteStore