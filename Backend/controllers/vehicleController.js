// controllers/vehicleController.js
const prisma = require("../config/database");

/**
 * GET /api/vehicles
 * Busca todos os veículos
 */
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    return res.status(500).json({ error: "Erro ao buscar veículos." });
  }
};

/**
 * POST /api/vehicles
 * Cria um novo veículo e registra no histórico
 */
exports.createVehicle = async (req, res) => {
  const {
    plate,
    brand,
    model,
    year,
    color,
    usage,
    isNew,
    comfortLevel,
    latitude,
    longitude,
  } = req.body;

  try {
    // Combine latitude e longitude em uma string para o campo "location"
    const location = `${latitude},${longitude}`;

    // Cria o veículo
    const newVehicle = await prisma.vehicle.create({
      data: {
        plate,
        brand,
        model,
        year: parseInt(year, 10),
        color,
        usage,
        isNew: Boolean(isNew),
        comfortLevel: parseInt(comfortLevel, 10),
        location,
      },
    });

    // Registra no histórico
    await prisma.history.create({
      data: {
        userId: req.userId || 1,
        action: "Criou Veículo",
        details: `Usuário criou o veículo de placa ${newVehicle.plate}`,
      },
    });

    return res
      .status(201)
      .json({ message: "Veículo criado com sucesso!", id: newVehicle.id });
  } catch (error) {
    console.error("Erro ao criar veículo:", error);
    return res.status(500).json({ message: "Erro ao criar veículo." });
  }
};

/**
 * PUT /api/vehicles/:id
 * Atualiza um veículo e registra no histórico
 */
exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const {
    plate,
    brand,
    model,
    year,
    color,
    usage,
    isNew,
    comfortLevel,
    latitude,
    longitude,
  } = req.body;

  try {
    const location = `${latitude},${longitude}`;

    const updatedVehicle = await prisma.vehicle.update({
      where: { id: parseInt(id, 10) },
      data: {
        plate,
        brand,
        model,
        year: parseInt(year, 10),
        color,
        usage,
        isNew: Boolean(isNew),
        comfortLevel: parseInt(comfortLevel, 10),
        location,
      },
    });

    // Registra no histórico
    await prisma.history.create({
      data: {
        userId: req.userId || 1,
        action: "Editou Veículo",
        details: `Usuário editou o veículo de placa ${updatedVehicle.plate}`,
      },
    });

    return res
      .status(200)
      .json({
        message: "Veículo atualizado com sucesso!",
        vehicle: updatedVehicle,
      });
  } catch (error) {
    console.error("Erro ao atualizar veículo:", error);
    return res.status(500).json({ message: "Erro ao atualizar veículo." });
  }
};


exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVehicle = await prisma.vehicle.delete({
      where: { id: parseInt(id, 10) },
    });

    // Registra no histórico
    await prisma.history.create({
      data: {
        userId: req.userId || 1,
        action: "Excluiu Veículo",
        details: `Usuário excluiu o veículo de placa ${deletedVehicle.plate}`,
      },
    });

    return res.json({ message: "Veículo excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir veículo:", error);
    return res.status(500).json({ message: "Erro ao excluir veículo." });
  }
};