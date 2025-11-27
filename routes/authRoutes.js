// Rotas de Autenticação
// Rotas públicas para login, registro e logout

const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Rotas públicas
router.get("/entrar", AuthController.mostrarLogin);
router.post("/entrar", AuthController.entrar);
router.get("/registrar", AuthController.mostrarRegistro);
router.post("/registrar", AuthController.registrar);

// Rota de logout (protegida implicitamente - só funciona se houver sessão)
router.post("/sair", AuthController.sair);

module.exports = router;
