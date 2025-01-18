const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prismaClient");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, birthDate, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
      },
    });

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
