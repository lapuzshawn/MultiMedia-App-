const router = require("express").Router();

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("pages/login", {
    isIncludeHeader: false,
    title: "Login",
  });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("pages/signup", {
    isIncludeHeader: false,
    title: "Register",
  });
});

module.exports = router;
