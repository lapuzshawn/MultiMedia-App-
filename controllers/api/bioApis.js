const router = require("express").Router();
const { Bio } = require("../../models");

/* Get all bios */
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const entites = await Bio.findAll({ where: { userId: userId } });

      res.json(entites);
      return;
    }

    const entites = await Bio.findAll({});

    res.json(entites);
  } catch (error) {
    next(error);
  }
});

/* Get a specific link */
router.get("/search", async (req, res, next) => {
  try {
    const { linkUrl } = req.query;
    console.log("search bio ", linkUrl)

    const entity = await Bio.findOne({ where: { linkUrl: linkUrl } });

    if (!entity) {
      const error = new Error("Bio does not exist");
      return next(error);
    }

    res.json(entity);
  } catch (error) {
    next(error);
  }
});

/* Get a specific bio */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const entity = await Bio.findOne({ where: { id: id } });

    if (!entity) {
      const error = new Error("Bio does not exist");
      return next(error);
    }

    res.json(entity);
  } catch (error) {
    next(error);
  }
});

/* Create a new bio */
router.post("/", async (req, res, next) => {
  try {
    const { linkUrl, thumbnail } = req.body;

    console.log("create bio ", linkUrl, thumbnail)

    const user = req.session;

    const bio = await Bio.findOne({ where: { linkUrl: linkUrl } });

    // Bio already exists
    if (bio) {
      res.status(409); // conflict error
      const error = new Error("Bio already exists");
      return next(error);
    }

    const entity = await Bio.create({
      userId: user.userId,
      linkUrl: linkUrl,
      thumbnail: thumbnail,
    });

    console.log("New bio has been created");
    res.status(201).json(entity);
  } catch (error) {
    next(error);
  }
});

/* Update a specific bio */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { linkUrl, thumbnail } = req.body;

    console.log("update bio, ", id, linkUrl, thumbnail)

    const user = req.session;

    const entity = await Bio.findOne({ where: { id: id } });

    // Bio does not exist
    if (!entity) {
      return next();
    }

    if (user.userId !== entity.userId) {
      const error = new Error("Permission denied");
      return next(error);
    }

    const updatedEntity = Bio.update(
      {
        linkUrl: linkUrl,
        thumbnail: thumbnail,
      },
      { where: { id: id } }
    );

    res.json(updatedEntity);
  } catch (error) {
    next(error);
  }
});

/* Delete a specific bio */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const entity = await Bio.findOne({ where: { id: id } });

    // Bio does not exist
    if (!entity) {
      return next();
    }

    await Bio.destroy({ where: { id: id } });

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
