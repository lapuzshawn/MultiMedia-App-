const router = require('express').Router();
const { User } = require('../../models');
const { Op } = require('sequelize');

// POST /api/users is a registration route for creating a new user
router.post('/', async (req, res) => {
	try {
		console.log(req.body.name);
		const newUser = await User.create(req.body);

		req.session.save(() => {
			req.session.userId = newUser.id;
			req.session.name = newUser.name;
			req.session.username = newUser.username;
			req.session.loggedIn = true;

			res.json(newUser);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// POST /api/users/login is a login route for an existing user
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		// error if no user found
		if (!user) {
			res.status(400).json({ message: 'No user account found!' });
			return;
		}

		// check password against the db password
		const validPassword = user.checkPassword(req.body.password);

		// error if invalid password
		if (!validPassword) {
			res.status(400).json({ message: 'No user account found!' });
		}

		req.session.save(() => {
			req.session.userId = user.id;
			req.session.name = user.name;
			req.session.username = user.username;
			req.session.loggedIn = true;

			res.json({ user, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json({ message: 'No user account found!' });
	}
});

// POST /api/user/logout is a logout route for an existing user
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

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
