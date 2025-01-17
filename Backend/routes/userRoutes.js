const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { name, birthDate, email, password } = req.body;

    // Validação simples
    if (!name || !birthDate || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword, // Salva a senha criptografada
      },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ error: "Erro ao registrar usuário. Tente novamente." });
  }
});
