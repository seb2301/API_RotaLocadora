// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Normalmente o token vem em "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1]; // Pega a segunda parte após 'Bearer'
    if (!token) {
      return res.status(401).json({ message: "Token inválido ou ausente." });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Salva o userId na request para usar nos controllers
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("Erro no authMiddleware:", err.message);
    return res.status(401).json({ message: "Token inválido." });
  }
};
