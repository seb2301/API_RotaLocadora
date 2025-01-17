const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient"); // Certifique-se que o caminho está correto
const router = express.Router(); // Define o roteador do Express

// Rota de registro de usuário
router.post("/register", async (req, res) => {
  const { name, birthDate, email, password } = req.body;

  try {
    // Verifica se o e-mail já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
      },
    });

    // Retorna o sucesso
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar usuário.", error });
  }
});

module.exports = router;
