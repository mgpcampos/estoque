// Rotas de Produtos
// CRUD completo de produtos

const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const isAuth = require("../middleware/isAuth");

// Todas as rotas são protegidas
router.get("/produtos", isAuth, ProductController.listar);
router.get("/produtos/novo", isAuth, ProductController.criar);
router.post("/produtos", isAuth, ProductController.salvar);
router.get("/produtos/:id", isAuth, ProductController.mostrar);
router.get("/produtos/:id/editar", isAuth, ProductController.editar);
router.put("/produtos/:id", isAuth, ProductController.atualizar);
router.delete("/produtos/:id", isAuth, ProductController.excluir);

module.exports = router;
