const router = require('express').Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const login = require('../../controllers/login.controllers');


router.post(
    '/masterLogin',
    // joiValidator.validateStaffLogin,
    asyncMiddleware(login.masterLogin),
);
  
module.exports = router;