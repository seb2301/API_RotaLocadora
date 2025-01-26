const express = require("express");
const router = express.Router();
const prisma = require("../config/database");

// GET /users - listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// GET /users/:id - buscar usuário pelo id
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

// PUT /users/:id - atualizar dados do usuário
router.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, birth_date } = req.body;

  try {
    // Exemplo: atualiza name e birthDate
    let birthDateConverted = undefined;
    if (birth_date) {
      birthDateConverted = new Date(birth_date);
      if (isNaN(birthDateConverted.getTime())) {
        return res
          .status(400)
          .json({ message: "Data de nascimento inválida." });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        birthDate: birthDateConverted, // se for undefined, não atualiza
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// DELETE /users/:id - apagar usuário
router.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    return res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

module.exports = router;
