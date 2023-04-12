const router = require('express').Router();
const withAuth = require('../../utils/auth');

// GET request to render a chat room
router.get('/', withAuth, (req, res) => {
	const { room } = req.query;
	res.render('pages/chat', { roomName: room });
});

module.exports = router;
