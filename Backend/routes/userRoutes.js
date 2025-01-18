const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { name, birthDate, email, password } = req.body;

    if (!name || !birthDate || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res
      .status(500)
      .json({ error: "Erro ao registrar usuário. Tente novamente." });
  }
});
