const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// Lista todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Cria um novo usuário
router.post("/", async (req, res) => {
  try {
    const { name, birthDate, email, password } = req.body;
    const user = await prisma.user.create({
      data: { name, birthDate: new Date(birthDate), email, password },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

module.exports = router;
