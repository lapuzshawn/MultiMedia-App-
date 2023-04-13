const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our Bio model
class Bio extends Model {
}

Bio.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		linkUrl: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		thumbnail: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		hooks: {
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'Bio',
	},
);

module.exports = Bio;
