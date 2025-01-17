const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prismaClient"); // Certifique-se de importar o Prisma Client

router.get("/test-db", async (req, res) => {
  try {
    // Tente acessar o modelo User
    const users = await prisma.user.findMany(); // Certifique-se de que "user" corresponde ao modelo em schema.prisma
    res.status(200).json({
      message: "Conexão com o banco de dados bem-sucedida!",
      data: users,
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    res.status(500).json({
      message: "Erro ao conectar com o banco de dados.",
      error: error.message,
    });
  }
});

module.exports = router;
