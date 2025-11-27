// Rotas da Página Principal
// Rota protegida para dashboard

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const isAuth = require('../middleware/isAuth');

// Página inicial (protegida)
router.get('/', isAuth, IndexController.inicio);

module.exports = router;
