// Controller de Categorias
// Gerencia CRUD completo de categorias

const Categoria = require("../models/Category");
const Produto = require("../models/Product");

// Lista todas as categorias
async function listar(req, res) {
	try {
		const categorias = await Categoria.findAll();
		res.render('pages/categorias/index', { categorias, erro: null, sucesso: null });
	} catch (erro) {
		console.error('Erro ao listar categorias:', erro);
		res.status(500).send('Erro ao carregar categorias');
	}
}

// Exibe formulário de criação
async function criar(req, res) {
	res.render('pages/categorias/nova', { erro: null });
}

// Salva nova categoria
async function salvar(req, res) {
	try {
		const { nome } = req.body;
		
		await Categoria.create({ nome });
		res.redirect('/categorias');
	} catch (erro) {
		console.error('Erro ao criar categoria:', erro);
		res.render('pages/categorias/nova', { 
			erro: 'Erro ao criar categoria. Verifique se o nome já existe.' 
		});
	}
}

// Exibe formulário de edição
async function editar(req, res) {
	try {
		const { id } = req.params;
		const categoria = await Categoria.findByPk(id);
		
		if (!categoria) {
			return res.status(404).send('Categoria não encontrada');
		}
		
		res.render('pages/categorias/editar', { categoria, erro: null });
	} catch (erro) {
		console.error('Erro ao buscar categoria:', erro);
		res.status(500).send('Erro ao carregar categoria');
	}
}

// Atualiza categoria
async function atualizar(req, res) {
	try {
		const { id } = req.params;
		const { nome } = req.body;
		
		const categoria = await Categoria.findByPk(id);
		
		if (!categoria) {
			return res.status(404).send('Categoria não encontrada');
		}
		
		categoria.nome = nome;
		await categoria.save();
		
		res.redirect('/categorias');
	} catch (erro) {
		console.error('Erro ao atualizar categoria:', erro);
		const categoria = await Categoria.findByPk(req.params.id);
		res.render('pages/categorias/editar', { 
			categoria, 
			erro: 'Erro ao atualizar categoria' 
		});
	}
}

// Exclui categoria (verifica se há produtos associados)
async function excluir(req, res) {
	try {
		const { id } = req.params;
		
		// Verifica se há produtos associados
		const produtosAssociados = await Produto.count({ where: { categoria_id: id } });
		
		if (produtosAssociados > 0) {
			const categorias = await Categoria.findAll();
			return res.render('pages/categorias/index', { 
				categorias, 
				erro: 'Não é possível excluir esta categoria pois existem produtos associados.',
				sucesso: null
			});
		}
		
		await Categoria.destroy({ where: { id } });
		res.redirect('/categorias');
	} catch (erro) {
		console.error('Erro ao excluir categoria:', erro);
		res.redirect('/categorias');
	}
}

module.exports = {
	listar,
	criar,
	salvar,
	editar,
	atualizar,
	excluir
};
