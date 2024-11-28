const db = require("../db");
const logger = require("./logger");

const insertException = async (apiName, datas, exception) => {
  const data = JSON.stringify(datas);
  const insertData = {
    apiName,
    data,
    exception,
  };
 
  
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    const sqlQuery = "INSERT INTO loggerexception SET ? ";
    await connection.query(sqlQuery, [insertData]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
  } finally {
    connection.release();
  }
};

async function logs(req, res, next) {
  let data;
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.replace("Bearer ", "");
    data = {
      apiUrl: req.url,
      user: bearerToken,
      data: JSON.stringify(req.body),
    };
  } else {
    data = {
      apiUrl: req.url,
      user: null,
      data: JSON.stringify(req.body),
    };
  }
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    const sqlQuery1 = "INSERT INTO logger SET ?";
    await connection.query(sqlQuery1, [data]);

    await connection.commit();
  } catch (error) {
    logger.logger("error", error.message);
    await connection.rollback();
  } finally {
    connection.release();
  }
  next();
}

module.exports.insertException = insertException;
module.exports.logs = logs;
