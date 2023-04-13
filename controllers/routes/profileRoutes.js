const router = require("express").Router();
const { User, Bio } = require("../../models");
const withAuth = require("../../utils/auth");

async function loadUserProfile(userId) {
  const user = await User.findOne({ where: { id: userId } });
  return {
    userId: user.id,
    name: user.name,
    username: user.username,
    avatar: "https://www.w3schools.com/w3images/avatar1.png",
  };
}

async function loadUserSocialLinks(userId) {
  const user = await User.findOne({ where: { id: userId } });
  return [
    {
      label: "Facebook",
      isEnable: !!user.facebookUrl,
      link: user.facebookUrl,
    },
    {
      label: "Instagram",
      isEnable: !!user.instagramUrl,
      link: user.instagramUrl,
    },
    {
      label: "Twitter",
      isEnable: !!user.twitterUrl,
      link: user.twitterUrl,
    },
  ];
}

async function loadUserRecentPosts(req, userId) {
  const bios = await Bio.findAll({ where: { userId: userId } });

  var hostUrl = req.protocol + "://" + req.get("host") + "/bio/";

  return bios.map((e) => {
    return {
      id: e.id,
      image:
        e.thumbnail ||
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674371886/logrocket-css-masonry/10.jpg",
      link: hostUrl + e.linkUrl,
      createdAt: 123,
    };
  });
}

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = req.session;

    const profile = await loadUserProfile(userId);
    const socialLinks = await loadUserSocialLinks(userId);
    const recentposts = await loadUserRecentPosts(req, userId);

    res.render("pages/profile", {
      title: "Profile",
      isIncludeHeader: true,
      user,
      loggedIn: !!user.userId,
      isProfilePage: true,
      recentposts,
      socialLinks,
      profile,
      viewMyProfile: user.userId === profile.userId,
    });
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: "Invalid Request" });
  }
});

module.exports = router;
