const router = require('express').Router();
const asyncMiddleware = require('../../middleware/asyncMiddleware');
const store = require('../../controllers/store.controller');
const jwt=require('../../api/auth/jwt')


router.post(
    '/createStore',
    jwt.isValid,
    asyncMiddleware(store.createStore),
);
router.get(
    '/listallStore',
    jwt.isValid,
    asyncMiddleware(store.listallStore),
);
router.put(
    '/updateStore',
    jwt.isValid,
    asyncMiddleware(store.updateStore),
);
router.put(
    '/deleteStore',
    jwt.isValid,
    asyncMiddleware(store.deleteStore),
);



module.exports = router;