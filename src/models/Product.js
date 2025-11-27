const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
	"Product",
	{
		id: {

		},
	},
	{
		tableName: "products",
		timestamps: false,
	},
);

module.exports = Product;
