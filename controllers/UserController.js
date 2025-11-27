// Controller de Usuários
// Gerencia CRUD de usuários (sem criação - feita via registro)

const Usuario = require("../models/User");

// Lista todos os usuários
async function listar(req, res) {
	try {
		const usuarios = await Usuario.findAll();
		res.render('pages/usuarios/index', { usuarios });
	} catch (erro) {
		console.error('Erro ao listar usuários:', erro);
		res.status(500).send('Erro ao carregar usuários');
	}
}

// Exibe formulário de edição
async function editar(req, res) {
	try {
		const { id } = req.params;
		const usuario = await Usuario.findByPk(id);
		
		if (!usuario) {
			return res.status(404).send('Usuário não encontrado');
		}
		
		res.render('pages/usuarios/editar', { usuario, erro: null });
	} catch (erro) {
		console.error('Erro ao buscar usuário:', erro);
		res.status(500).send('Erro ao carregar usuário');
	}
}

// Atualiza dados do usuário
async function atualizar(req, res) {
	try {
		const { id } = req.params;
		const { nome, senha } = req.body;
		
		const usuario = await Usuario.findByPk(id);
		
		if (!usuario) {
			return res.status(404).send('Usuário não encontrado');
		}
		
		// Atualiza nome
		usuario.nome = nome;
		
		// Se senha foi fornecida, atualiza hash
		if (senha && senha.trim() !== '') {
			usuario.hashDaSenha = await Usuario.criarHashSenha(senha);
		}
		
		await usuario.save();
		res.redirect('/usuarios');
	} catch (erro) {
		console.error('Erro ao atualizar usuário:', erro);
		const usuario = await Usuario.findByPk(req.params.id);
		res.render('pages/usuarios/editar', { 
			usuario, 
			erro: 'Erro ao atualizar usuário' 
		});
	}
}

// Exclui usuário
async function excluir(req, res) {
	try {
		const { id } = req.params;
		
		// Não permite excluir o próprio usuário logado
		if (parseInt(id) === req.session.userId) {
			return res.redirect('/usuarios');
		}
		
		await Usuario.destroy({ where: { id } });
		res.redirect('/usuarios');
	} catch (erro) {
		console.error('Erro ao excluir usuário:', erro);
		res.redirect('/usuarios');
	}
}

module.exports = {
	listar,
	editar,
	atualizar,
	excluir
};