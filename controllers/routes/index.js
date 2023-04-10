const router = require("express").Router();
const home = require("./homeRoutes");
const login = require("./loginRoutes");
const profile = require("./profileRoutes");

router.use("/", home);
router.use("/", login);
router.use("/profile", profile);

module.exports = router;
