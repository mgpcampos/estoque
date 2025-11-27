// Controller da Página Principal
// Exibe dashboard com resumo de todas as entidades

const Usuario = require('../models/User');
const Categoria = require('../models/Category');
const Produto = require('../models/Product');

// Exibe página inicial com tabelas de usuários, categorias e produtos
async function inicio(req, res) {
	try {
		const usuarios = await Usuario.findAll();
		const categorias = await Categoria.findAll();
		const produtos = await Produto.findAll({ 
			include: [{ model: Categoria, as: 'categoria' }] 
		});
		
		res.render('pages/index', { usuarios, categorias, produtos });
	} catch (erro) {
		console.error('Erro ao carregar página inicial:', erro);
		res.status(500).send('Erro ao carregar dados');
	}
}

module.exports = { inicio };
