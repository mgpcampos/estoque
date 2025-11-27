const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./Category");

const Produto = sequelize.define(
	"Produto",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		categoria_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'categorias',
				key: 'id'
			}
		},
		quantidade: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},
	{
		tableName: "produtos",
		timestamps: false,
	},
);

Produto.belongsTo(Categoria, {
	foreignKey: 'categoria_id',
	targetKey: 'id',
});

module.exports = Produto;
