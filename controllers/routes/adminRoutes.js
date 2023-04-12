const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

async function loadUserProfile(userId) {
  const user = await User.findOne({ where: { id: userId } });
  return {
    userId: user.id,
    name: user.name,
    username: user.username,
    avatar: "https://www.w3schools.com/w3images/avatar1.png"
  };
}

function loadUserSocialLinks(userId) {
  return [
    {
      label: "Facebook",
      link: "https://facebook.com/",
      icon: "fa fa-book",
    },
    {
      label: "Instagram",
      link: "https://instagram.com/",
      icon: "fa fa-book",
    },
    {
      label: "Twitter",
      link: "https://twitter.com/",
      icon: "fa fa-book",
    },
  ];
}

function loadUserRecentPosts(userId) {
  return [
    {
      image:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674371886/logrocket-css-masonry/10.jpg",
      link: "abc",
      createdAt: 123,
    },
    {
      image:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674344289/logrocket-css-masonry/8.jpg",
      link: "abc",
      createdAt: 123,
    },
    {
      image:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674373487/logrocket-css-masonry/window.jpg",
      link: "abc",
      createdAt: 123,
    },
    {
      image:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674344282/logrocket-css-masonry/4.jpg",
      link: "abc",
      createdAt: 123,
    },
    {
      image:
        "https://res.cloudinary.com/dkfptto8m/image/upload/v1674344280/logrocket-css-masonry/7.jpg",
      link: "abc",
      createdAt: 123,
    },
  ];
}

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = req.session;

    const admin = await loadUserProfile(userId);
    const socialLinks = await loadUserSocialLinks(userId);
    const recentposts = await loadUserRecentPosts(userId);

    res.render("pages/admin", {
      title: "Admin",
      user,
      recentposts,
      socialLinks,
      admin,
      viewMyProfile: user.userId === admin.userId,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request" });
  }
});


/*Testing PUT routes -SL*/
router.put("/:id/update-profile", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.session;

    // Update user profile
    const updatedProfile = await updateProfile(userId, req.body);

    // Send response with updated profile data
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request" });
  }
});

router.put("/:id/update-social-links", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.session;

    // Update user social links
    const updatedSocialLinks = await updateSocialLinks(userId, req.body);

    // Send response with updated social links data
    res.status(200).json({
      message: "Social links updated successfully",
      socialLinks: updatedSocialLinks,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request" });
  }
});

router.put("/:id/update-recent-posts", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.session;

    // Update user recent posts
    const updatedRecentPosts = await updateRecentPosts(userId, req.body);

    // Send response with updated recent posts data
    res.status(200).json({
      message: "Recent posts updated successfully",
      recentPosts: updatedRecentPosts,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request" });
  }
});

module.exports = router;
