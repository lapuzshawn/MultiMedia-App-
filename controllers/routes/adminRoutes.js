const router = require("express").Router();
const { User, Bio, Link } = require("../../models");
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

router.get("/:id", withAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const user = req.session;

    var hostUrl = req.protocol + "://" + req.get("host") + "/bio/";

    const admin = await loadUserProfile(userId);
    const socialLinks = await loadUserSocialLinks(userId);
    const bioLinks = (await Bio.findAll({ where: { userId: userId } })).map(
      (b) => {
        return {
          id: b.id,
          userId: b.userId,
          linkUrl: hostUrl + b.linkUrl,
          thumbnail: b.thumbnail,
        };
      }
    );

    bioLinks.forEach(async (b) => {
      b.links = (await Link.findAll({ where: { bioId: b.id } })).map((l) => {
        return {
          id: l.id,
          linkUrl: l.linkUrl,
          label: l.label,
          imageUrl: l.imageUrl,
        };
      });
    });

    console.log(bioLinks);

    res.render("pages/admin", {
      title: "Admin",
      user,
      bioLinks,
      socialLinks,
      admin,
      viewMyProfile: user.userId === admin.userId,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Request" });
  }
});

// /*Testing PUT routes -SL*/
// router.put("/:id/update-profile", withAuth, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = req.session;

//     // Update user profile
//     const updatedProfile = await updateProfile(userId, req.body);

//     // Send response with updated profile data
//     res.status(200).json({
//       message: "Profile updated successfully",
//       profile: updatedProfile,
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Request" });
//   }
// });

// router.put("/:id/update-social-links", withAuth, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = req.session;

//     // Update user social links
//     const updatedSocialLinks = await updateSocialLinks(userId, req.body);

//     // Send response with updated social links data
//     res.status(200).json({
//       message: "Social links updated successfully",
//       socialLinks: updatedSocialLinks,
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Request" });
//   }
// });

// router.put("/:id/update-recent-posts", withAuth, async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = req.session;

//     // Update user recent posts
//     const updatedRecentPosts = await updateRecentPosts(userId, req.body);

//     // Send response with updated recent posts data
//     res.status(200).json({
//       message: "Recent posts updated successfully",
//       recentPosts: updatedRecentPosts,
//     });
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Request" });
//   }
// });

module.exports = router;
