const User = require('./User');
const Conversation = require('./Conversation');
const Message = require('./Message');
const { sequelize } = require('../config/connection');

User.hasMany(Conversation, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

User.hasMany(Message, {
	foreignKey: 'sender_id',
	onDelete: 'CASCADE',
});

Message.belongsTo(User, {
	foreignKey: 'sender_id',
});

Message.belongsTo(User, {
	foreignKey: 'receiver_id',
});

Message.belongsTo(Conversation, {
	foreignKey: 'conversation_id',
});

Conversation.belongsToMany(User, {
	through: 'UserConversation',
});

User.belongsToMany(Conversation, {
	through: 'UserConversation',
});

module.exports = { User, Conversation, Message, sequelize };
