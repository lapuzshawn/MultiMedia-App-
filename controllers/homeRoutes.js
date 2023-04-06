const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup&login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

router.get("/protected", withAuth, (req, res) => {
    res.render("protected");
})
module.exports = router;