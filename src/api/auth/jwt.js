const jwt = require('jsonwebtoken');
const config = require('../../../config');
const constants = require('../../common/index');
const responseFormatter = require('../../common/res_formatter');
const { logger } = require('../../logger/logger');

function isValid(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(constants.status_unauthorized)
            .json(
                responseFormatter.unAuthRes('Authentication Error - No Token In Header'),
            );
    }
    const token = req.headers.authorization.replace('Bearer ', '');

    if (token) {
        try {
            const { id, userType } = jwt.verify(token, config.JWTSECRET);
            req.userData = {
                id,
                userType,
              };
              return next();

        }catch (err) {
            logger('error', `JWT Invalid Error - ${JSON.stringify(err)}`);
      
            return res
              .status(constants.status_unauthorized)
              .json(
                responseFormatter.unAuthRes('Authentication Error - Invalid Token'),
              );
          }
    } else {
        logger('error', 'JWT Invalid Error');
    
        return res
          .status(constants.status_unauthorized)
          .json(responseFormatter.unAuthRes('Authentication Error - Invalid Token'));
      }
}

module.exports.isValid = isValid;