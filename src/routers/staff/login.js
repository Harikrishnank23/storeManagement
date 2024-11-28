const router = require('express').Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const login = require('../../controllers/login.controllers');

router.post(
    '/staffLogin',
    asyncMiddleware(login.staffLogin),
);
  
module.exports = router;