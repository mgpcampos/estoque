const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT || "sqlite",
	storage: process.env.DB_STORAGE || "database/database.sqlite",
});

sequelize
	.authenticate()
	.then(() => console.log(`A conexão foi estabelecida com sucesso.`))
	.catch((err) =>
		console.error(`Não foi possível conectar-se ao banco de dados:`, err),
	);

module.exports = sequelize;
