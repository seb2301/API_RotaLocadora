const express = require("express");
const dotenv = require("dotenv");
const app = require("./app"); // Configuração de rotas e middlewares
const prisma = require("./prisma");

dotenv.config();

// Testa a conexão com o banco de dados
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
  }
})();
