const router = require("express").Router();

router.get("/", (req, res) => {
  const user = req.session;
  res.render("home", {
    isHome: true,
    title: "Home",
    user: user,
    loggedIn: !!user.userId,
  });
});

module.exports = router;
