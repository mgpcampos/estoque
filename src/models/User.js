const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
	"Usuario",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hashDaSenha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "usuarios",
		timestamps: false,
	},
);

module.exports = Usuario;
