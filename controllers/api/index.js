const router = require('express').Router();

const userApi = require('./userRoutes');
router.use("/user", userApi);

module.exports = router;
