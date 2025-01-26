// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./config/database"); 

// Importação das rotas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

// Importação do middleware de autenticação
const authMiddleware = require("./middlewares/authMiddleware");

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Cria instância do Express
const app = express();

// Middlewares principais
app.use(cors());
app.use(express.json());

// Rotas que não requerem login (ex: autenticação)
app.use("/api/auth", authRoutes);

// Rotas que requerem usuário logado
// (aplicamos o 'authMiddleware' antes de passar para as rotas específicas)
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/history", authMiddleware, historyRoutes);
app.use("/api/vehicles", authMiddleware, vehicleRoutes);

// Middleware para tratar erros gerais
app.use((err, req, res, next) => {
  console.error("Erro capturado pelo middleware:", err.message);
  if (!res.headersSent) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

// Função autoexecutável para conectar ao banco e iniciar o servidor
(async () => {
  try {
    await prisma.$connect();
    console.log("Conexão com o banco de dados bem-sucedida!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  }
})();

module.exports = app;
