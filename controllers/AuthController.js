// Controller de Autenticação
// Gerencia login, registro e logout de usuários

const Usuario = require("../models/User");

// Exibe formulário de login
async function mostrarLogin(_req, res) {
	res.render("pages/auth/entrar", { erro: null });
}

// Processa login
async function entrar(req, res) {
	try {
		const { nome, senha } = req.body;

		const usuario = await Usuario.validarCredenciais(nome, senha);

		if (!usuario) {
			return res.render("pages/auth/entrar", {
				erro: "Nome ou senha inválidos",
			});
		}

		req.session.userId = usuario.id;
		res.redirect("/");
	} catch (erro) {
		console.error("Erro ao entrar:", erro);
		res.render("pages/auth/entrar", {
			erro: "Erro ao processar login",
		});
	}
}

// Exibe formulário de registro
async function mostrarRegistro(_req, res) {
	res.render("pages/auth/registrar", { erro: null });
}

// Processa registro
async function registrar(req, res) {
	try {
		const { nome, senha } = req.body;

		// Verifica se usuário já existe
		const usuarioExistente = await Usuario.findOne({ where: { nome } });
		if (usuarioExistente) {
			return res.render("pages/auth/registrar", {
				erro: "Este nome de usuário já está em uso",
			});
		}

		// Cria hash da senha e novo usuário
		const hashDaSenha = await Usuario.criarHashSenha(senha);
		const novoUsuario = await Usuario.create({ nome, hashDaSenha });

		// Loga automaticamente após registro
		req.session.userId = novoUsuario.id;
		res.redirect("/");
	} catch (erro) {
		console.error("Erro ao registrar:", erro);
		res.render("pages/auth/registrar", {
			erro: "Erro ao criar conta",
		});
	}
}

// Processa logout
async function sair(req, res) {
	req.session.destroy((erro) => {
		if (erro) {
			console.error("Erro ao sair:", erro);
		}
		res.redirect("/entrar");
	});
}

module.exports = {
	mostrarLogin,
	entrar,
	mostrarRegistro,
	registrar,
	sair,
};
