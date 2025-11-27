const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("node:path");

const app = express();

// Configuração do method-override para PUT e DELETE
app.use(methodOverride("_method"));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Parser de body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração da sessão
app.use(session({
	secret: 'chave-secreta-do-sistema-de-estoque',
	resave: false,
	saveUninitialized: false
}));

// Middleware global para injetar usuário nas views
app.use((req, res, next) => {
	res.locals.user = req.session.userId || null;
	next();
});

// Rotas
app.use(require('./routes/authRoutes'));
app.use(require('./routes/indexRoutes'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/categoryRoutes'));
app.use(require('./routes/productRoutes'));

module.exports = app;
