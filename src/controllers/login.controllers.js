const jwt = require('jsonwebtoken');
const login = require('../model/login.model');
const responseFormater = require('../common/res_formatter');
const config = require('../../config/index');
const constants = require('../common/index');


const masterLogin = async (req, res) => {
  const apiName = req.method + req.originalUrl;
    const { empUserName, password,userType } = req.body;
   
    const result = await login.masterLogin(empUserName, password,userType,apiName);
    
    if (result.data === 'username error') {
      return res
        .status(constants.status_unauthorized)
        .json(responseFormater.unAuthRes(result.data, 'Invalid Username'));
    }
    if (result.data === 'password error') {
      return res
        .status(constants.status_unauthorized)
        .json(responseFormater.unAuthRes(result.data, 'Invalid Password'));
    }
    if (result.login === true) {
      const id = result.data;
      const userType = result.data;
      const empName = result.data;
  
      const jwtInfo = {
        id: id[0].id,
        userType: userType[0].userType,
      };
  
      const token = jwt.sign({ ...jwtInfo }, config.JWTSECRET);
      const data = {
        token,
        userType: userType[0].userType,
        id: id[0].id,
        empName: empName[0].empName,
      };
      return res
        .status(constants.status_success)
        .json(responseFormater.successRes(data, 'Login Success'));
    }
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes('Invalid username or password'));
};
  

const staffLogin = async (req, res) => {
  const { empUserName, password,userType } = req.body;
  const apiName = req.method + req.originalUrl;
  const result = await login.staffLogin(empUserName, password,userType,apiName);
  
  if (result.data === 'username error') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'Invalid Username'));
  }
  if (result.data === 'password error') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'Invalid Password'));
  }
  if (result.data === 'invalid usertype') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'invalid usertype'));
  }
  return res
        .status(constants.status_success)
        .json(responseFormater.successRes(result.data, 'Login Success'));
    

}

const supervisorLogin = async (req, res) => {
  const { empUserName, password,userType } = req.body;
  const apiName = req.method + req.originalUrl;
  const result = await login.supervisorLogin(empUserName, password,userType,apiName);
  
  if (result.data === 'username error') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'Invalid Username'));
  }
  if (result.data === 'password error') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'Invalid Password'));
  }
  if (result.data === 'invalid usertype') {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, 'invalid usertype'));
  }
  return res
        .status(constants.status_success)
        .json(responseFormater.successRes(result.data, 'Login Success'));
    

}
module.exports.masterLogin=masterLogin
module.exports.staffLogin=staffLogin
module.exports.supervisorLogin=supervisorLogin