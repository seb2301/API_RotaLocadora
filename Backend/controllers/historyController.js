// controllers/historyController.js
const prisma = require("../config/database");

// Listar todas as entradas do histórico
exports.getAllHistories = async (req, res) => {
  try {
    const histories = await prisma.history.findMany({
      include: { user: true }, // Inclui informações do usuário relacionado
    });
    res.status(200).json(histories);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ message: "Erro ao buscar histórico." });
  }
};
