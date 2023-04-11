const router = require("express").Router();
const home = require("./homeRoutes");
const login = require("./loginRoutes");
const profile = require("./profileRoutes");
const admin = require("./adminRoutes");

router.use("/", home);
router.use("/", login);
router.use("/profile", profile);
router.use("/admin", admin);

module.exports = router;
