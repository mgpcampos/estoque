// Middleware de autenticação
// Verifica se o usuário está logado antes de acessar rotas protegidas

function isAuth(req, res, next) {
	if (req.session.userId) {
		return next();
	}
	return res.redirect("/registrar");
}

module.exports = isAuth;
