const app = require("./app");
const sequelize = require("./config/database");

const PORT = 3000;

sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`Aplicação ativa em: http://localhost:${PORT}`),
	);
});
