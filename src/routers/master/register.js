const router = require('express').Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const register = require('../../controllers/register.controllers');
const jwt=require('../../api/auth/jwt')


router.post(
    '/createStaff',
    jwt.isValid,
    asyncMiddleware(register.createStaff),
);
  
module.exports = router;