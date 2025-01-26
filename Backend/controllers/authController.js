const prisma = require("../config/database"); // Importa a conexão Prisma
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controlador responsável pelo registro
exports.register = async (req, res) => {
  // Recebe os dados do body. Aqui estou usando "birth_date" para casar com seu form
  const { name, birth_date, email, password } = req.body;

  try {
    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Converte a data de nascimento
    const birthDateConverted = new Date(birth_date);
    if (isNaN(birthDateConverted.getTime())) {
      return res.status(400).json({ message: "Data de nascimento inválida." });
    }

    // Cria o novo usuário no banco
    const newUser = await prisma.user.create({
      data: {
        name,
        birthDate: birthDateConverted,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso!", id: newUser.id });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

// Controlador responsável pelo login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica a senha
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Cria o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Login realizado com sucesso.",
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res
      .status(500)
      .json({ message: "Erro no servidor ao tentar fazer login." });
  }
};
