const router = require('express').Router();
const { User } = require('../../models');
const { Op } = require('sequelize');

//get route for getting the user's name
router.get('/search', async (req, res) => {
	try {
		const input = req.query.search;
		const users = await User.findAll({
			where: {
				username: {
					[Op.like]: `%${input}%`,
				},
			},
		});
		res.json(users);
		console.log(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// get route for user id
router.get('/:id', async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.id);
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

/* Update a specific user */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, facebookUrl, instagramUrl, twitterUrl } = req.body;

    const user = req.session;

    const entity = await User.findOne({ where: { id: id } });

    // User does not exist
    if (!entity) {
      return next();
    }

    if (user.userId !== entity.id) {
      const error = new Error("Permission denied");
      return next(error);
    }

    const updatedEntity = User.update(
      {
        name: name,
        facebookUrl: facebookUrl,
        instagramUrl: instagramUrl,
        twitterUrl: twitterUrl,
      },
      { where: { id: id } }
    );

    res.json(updatedEntity);
  } catch (error) {
    next(error);
  }
});

// Route to find user's id using their username
router.get('/username/:username', async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.params.username,
			},
		});
		if (user) {
			res.json(user);
		} else {
			res.json({ message: 'No user was found with that username' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// get route for finding current user by username
router.get('/current/user', async (req, res) => {
	try {
		const username = req.session.username;
		res.json(username);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
