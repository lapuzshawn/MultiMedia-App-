const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { User } = require('./User');
const { Conversation } = require('./Conversation');

class Message extends Model {}

Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sender_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		receiver_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		conversation_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Conversation,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: 'message',
	},
);

module.exports = Message;
