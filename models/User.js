const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

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
			unique: true,
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

// Método para criar hash da senha
Usuario.criarHashSenha = async function(senha) {
	const saltos = 10;
	return await bcrypt.hash(senha, saltos);
};

// Método para validar credenciais
Usuario.validarCredenciais = async function(nome, senha) {
	const usuario = await Usuario.findOne({ where: { nome } });
	if (!usuario) {
		return null;
	}
	const senhaValida = await bcrypt.compare(senha, usuario.hashDaSenha);
	return senhaValida ? usuario : null;
};

module.exports = Usuario;
