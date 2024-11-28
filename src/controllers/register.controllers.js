const register = require('../model/register.model');
const responseFormater = require('../common/res_formatter');
//const config = require('../../config/index');
const constants = require('../common/index');

const createStaff = async (req,res) => {
    
    
    const { empUserName,password,userType } = req.body;
    const apiName = req.method + req.originalUrl;
    const result = await register.staffRegister(empUserName, password,userType,apiName);
 
    
    if (result.data ==='already exist') {
        return res
        .status(constants.status_unauthorized)
        .json(responseFormater.unAuthRes(result.data, 'already exist'));
    } if (result.success) {
        return res
        .status(constants.status_success)
        .json(responseFormater.successRes(result.data, 'register Success'));
}
   
}



module.exports.createStaff=createStaff
