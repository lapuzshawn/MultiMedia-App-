const router = require('express').Router();

const authApis = require('./authApis');
router.use("/user", authApis);

const userApis = require('./userApis');
router.use("/user", userApis);

const bioApis = require('./bioApis');
router.use("/bio", bioApis);

const linkApis = require('./linkApis');
router.use("/link", linkApis);

module.exports = router;
