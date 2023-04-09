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
	res.render('login', {
		isHome: false,
	});
});

router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup', {
		isHome: false,
	});
});

router.get('/protected', withAuth, (req, res) => {
	res.render('protected');
});

router.get('/chat', withAuth, (req, res) => {
	res.render('chat');
});

module.exports = router;
