const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
	"User",
	{
		id: {

        },
        name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		passwordHash: {

		}
	},
	{
		tableName: "users",
		timestamps: false,
	},
);

module.exports = User;
