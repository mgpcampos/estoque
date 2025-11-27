// Rotas de Usuários
// CRUD de usuários (sem criação - feita via registro)

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const isAuth = require("../middleware/isAuth");

// Todas as rotas são protegidas
router.get("/usuarios", isAuth, UserController.listar);
router.get("/usuarios/:id", isAuth, UserController.editar);
router.put("/usuarios/:id", isAuth, UserController.atualizar);
router.delete("/usuarios/:id", isAuth, UserController.excluir);

module.exports = router;
