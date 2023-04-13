const router = require("express").Router();
const { Link, Bio } = require("../../models");

/* Get all links */
router.get("/", async (req, res, next) => {
  try {
    const { bioId } = req.query;
    const entites = await Link.findAll({ where: {bioId: bioId}});
    res.json(entites);
  } catch (error) {
    next(error);
  }
});

/* Get a specific link */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const entity = await Link.findOne({ where: { id: id } });

    if (!entity) {
      const error = new Error("Link does not exist");
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
    const { linkUrl, label, imageUrl } = req.body;
    const { bioId } = req.query;

    // const user = req.session;

    const bio = await Bio.findOne({ where: { id: bioId } });

    // Bio not exists
    if (!bio) {
      const error = new Error("Bio not exists");
      return next(error);
    }

    const entity = await Link.create({
      bioId: bioId,
      linkUrl: linkUrl,
      label: label,
      imageUrl: imageUrl,
    });

    console.log("New link has been created");
    res.status(201).json(entity);
  } catch (error) {
    next(error);
  }
});

/* Update a specific bio */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { linkUrl, label, imageUrl } = req.body;

	// const user = req.session;

    const entity = await Link.findOne({ where: { id: id } });

    // Link does not exist
    if (!entity) {
      return next();
    }

    const updatedEntity = Link.update(
      {
        linkUrl: linkUrl,
        label: label,
        imageUrl: imageUrl,
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

    const entity = await Link.findOne({ where: { id: id } });

    // Link does not exist
    if (!entity) {
      return next();
    }

    await Link.destroy({ where: { id: id } });

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
