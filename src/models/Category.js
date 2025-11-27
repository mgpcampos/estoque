const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
	"Category",
	{
		id: {

		},
	},
	{
		tableName: "categories",
		timestamps: false,
	},
);

module.exports = Category;
