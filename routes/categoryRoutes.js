// Rotas de Categorias
// CRUD completo de categorias

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const isAuth = require('../middleware/isAuth');

// Todas as rotas são protegidas
router.get('/categorias', isAuth, CategoryController.listar);
router.get('/categorias/nova', isAuth, CategoryController.criar);
router.post('/categorias', isAuth, CategoryController.salvar);
router.get('/categorias/:id', isAuth, CategoryController.editar);
router.put('/categorias/:id', isAuth, CategoryController.atualizar);
router.delete('/categorias/:id', isAuth, CategoryController.excluir);

module.exports = router;
