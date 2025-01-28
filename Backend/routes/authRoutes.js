const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/database"); 
const router = express.Router();

// Endpoint para registrar usuário
router.post("/register", async (req, res) => {
  const { name, birth_date, email, password } = req.body;

  console.log("Dados recebidos no backend:", req.body);

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

    // Converte e valida a data de nascimento
    const formattedBirthDate = new Date(birth_date);
    if (isNaN(formattedBirthDate.getTime())) {
      return res.status(400).json({ message: "Data de nascimento inválida." });
    }

    // Cria um novo usuário no banco
    const newUser = await prisma.user.create({
      data: {
        name,
        birthDate: formattedBirthDate,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res
      .status(500)
      .json({ message: "Erro ao registrar usuário.", error });
  }
});

// Endpoint para login de usuário
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token inválido:", err.message);
      } else {
        console.log("Token válido:", decoded);
      }
    });

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({
      message: "Erro no servidor ao tentar fazer login.",
      error: error.message,
    });
  }
});

module.exports = router;
