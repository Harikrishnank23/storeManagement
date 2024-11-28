const router = require('express').Router();
router.use('/login', require('./login'));
router.use('/store', require('./store'));
module.exports = router;