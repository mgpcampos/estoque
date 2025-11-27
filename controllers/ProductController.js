// Controller de Produtos
// Gerencia CRUD completo de produtos com relacionamento de categoria

const Produto = require("../models/Product");
const Categoria = require("../models/Category");

// Lista todos os produtos com suas categorias (JOIN)
async function listar(_req, res) {
	try {
		const produtos = await Produto.findAll({
			include: [{ model: Categoria, as: "categoria" }],
		});
		res.render("pages/produtos/index", { produtos });
	} catch (erro) {
		console.error("Erro ao listar produtos:", erro);
		res.status(500).send("Erro ao carregar produtos");
	}
}

// Exibe formulário de criação
async function criar(_req, res) {
	try {
		const categorias = await Categoria.findAll();
		res.render("pages/produtos/novo", { categorias, erro: null });
	} catch (erro) {
		console.error("Erro ao carregar formulário:", erro);
		res.status(500).send("Erro ao carregar formulário");
	}
}

// Salva novo produto
async function salvar(req, res) {
	try {
		const { nome, quantidade, categoria_id } = req.body;

		await Produto.create({
			nome,
			quantidade: parseInt(quantidade, 10) || 0,
			categoria_id,
		});

		res.redirect("/produtos");
	} catch (erro) {
		console.error("Erro ao criar produto:", erro);
		const categorias = await Categoria.findAll();
		res.render("pages/produtos/novo", {
			categorias,
			erro: "Erro ao criar produto",
		});
	}
}

// Mostra detalhes de um produto (JOIN com categoria)
async function mostrar(req, res) {
	try {
		const { id } = req.params;
		const produto = await Produto.findByPk(id, {
			include: [{ model: Categoria, as: "categoria" }],
		});

		if (!produto) {
			return res.status(404).send("Produto não encontrado");
		}

		res.render("pages/produtos/mostrar", { produto });
	} catch (erro) {
		console.error("Erro ao buscar produto:", erro);
		res.status(500).send("Erro ao carregar produto");
	}
}

// Exibe formulário de edição
async function editar(req, res) {
	try {
		const { id } = req.params;
		const produto = await Produto.findByPk(id);

		if (!produto) {
			return res.status(404).send("Produto não encontrado");
		}

		const categorias = await Categoria.findAll();
		res.render("pages/produtos/editar", { produto, categorias, erro: null });
	} catch (erro) {
		console.error("Erro ao buscar produto:", erro);
		res.status(500).send("Erro ao carregar produto");
	}
}

// Atualiza produto (pode alterar FK categoria_id)
async function atualizar(req, res) {
	try {
		const { id } = req.params;
		const { nome, quantidade, categoria_id } = req.body;

		const produto = await Produto.findByPk(id);

		if (!produto) {
			return res.status(404).send("Produto não encontrado");
		}

		produto.nome = nome;
		produto.quantidade = parseInt(quantidade, 10) || 0;
		produto.categoria_id = categoria_id;

		await produto.save();
		res.redirect("/produtos");
	} catch (erro) {
		console.error("Erro ao atualizar produto:", erro);
		const produto = await Produto.findByPk(req.params.id);
		const categorias = await Categoria.findAll();
		res.render("pages/produtos/editar", {
			produto,
			categorias,
			erro: "Erro ao atualizar produto",
		});
	}
}

// Exclui produto
async function excluir(req, res) {
	try {
		const { id } = req.params;
		await Produto.destroy({ where: { id } });
		res.redirect("/produtos");
	} catch (erro) {
		console.error("Erro ao excluir produto:", erro);
		res.redirect("/produtos");
	}
}

module.exports = {
	listar,
	criar,
	salvar,
	mostrar,
	editar,
	atualizar,
	excluir,
};
