const app = require("./src/app");

const PORT = 3000;

app.db.sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`Aplicação ativa em: http://localhost:${PORT}`),
	);
});
