const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	res.render('home', {
		isHome: true,
		logged_in: req.session.loggedIn,
	});
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('login', {});
});

router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup', {});
});

router.get('/protected', withAuth, (req, res) => {
	res.render('protected');
});

// GET request to render a chat room
router.get('/chat', withAuth, (req, res) => {
	const { room } = req.query;
	res.render('chat', { roomName: room });
});

module.exports = router;
