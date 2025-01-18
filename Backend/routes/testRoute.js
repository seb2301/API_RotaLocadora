const express = require("express");
const router = express.Router();
const prisma = require("../prisma/prismaClient");

router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
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
