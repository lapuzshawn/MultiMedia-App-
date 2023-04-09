const router = require('express').Router();
const { User, Conversation, Message } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/messages', withAuth, async (req, res) => {
	try {
		const messages = await Message.findAll();
		res.json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/messages', withAuth, async (req, res) => {
	try {
		const messages = await Message.create(req.body);
		res.status(200).json(messages);
	} catch (err) {
		res.status(500).json(err);
	}
});
