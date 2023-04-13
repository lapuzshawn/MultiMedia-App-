const router = require("express").Router();
const { User, Bio, Link } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const bioId = req.params.id;

    const bio = await Bio.findOne({ where: { linkUrl: bioId } });
    // Bio not exists
    if (!bio) {
      const error = new Error("Bio not exists");
      return next(error);
    }

    const bioUser = await User.findOne({ where: { id: bio.userId } });
    const bioLinks = await Link.findAll({ where: { bioId: bio.id } });

    res.render("pages/bio", {
      title: "Claimed Link",
      profile: {
        name: bioUser.name,
        facebookUrl: bioUser.facebookUrl,
        instagramUrl: bioUser.instagramUrl,
        twitterUrl: bioUser.twitterUrl,
        avatar: "https://www.w3schools.com/w3images/avatar1.png",
      },
      bioLinks: bioLinks.map((e) => {
        return {
          linkUrl: e.linkUrl,
          label: e.label,
          imageUrl: e.imageUrl,
        };
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid Request" });
  }
});

module.exports = router;
