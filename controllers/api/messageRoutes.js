const router = require('express').Router();
const { User, Message, Conversation } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [
				{
					model: Message,
					as: 'Messages',
					include: [
						{
							model: User,
							as: 'Sender',
							attributes: ['username'],
						},
					],
				},
			],
		});
		//if there's no messages then still load the messagePage
		if (!userData) {
			res.render('messagePage', {
				messages: [],
				loggedIn: true,
			});
			return;
		}
		const user = userData.get({ plain: true });
		const messages = user.Messages || [];
		const messagesWithSender = await Promise.all(
			messages.map(async (message) => {
				const sender = await User.findByPk(message.sender_id);
				message.senderName = sender.username;
				return message;
			}),
		);
		res.render('messagePage', {
			messages: messagesWithSender,
			loggedIn: true,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/conversations', async (req, res) => {
	const { username } = req.body;

	try {
		// Check if the user with the given username exists
		const user = await User.findOne({ username: username });
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		// Create a new conversation
		const conversation = new Conversation({
			members: [req.user.id, user.id],
		});
		await conversation.save();

		res.json(conversation);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Handle POST requests to send message
router.post('/', async (req, res) => {
	try {
		const { sender, receiver, text } = req.body;

		const newMessage = new Message({ sender, receiver, text });

		await newMessage.save();

		res.status(201).json({ message: 'Message saved successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;
