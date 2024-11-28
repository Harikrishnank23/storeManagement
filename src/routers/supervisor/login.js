const router = require('express').Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const login = require('../../controllers/login.controllers');


router.post(
    '/supervisorLogin',
    asyncMiddleware(login.supervisorLogin),
);



module.exports = router;