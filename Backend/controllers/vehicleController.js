const Vehicle = require("../models/Vehicle");

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.json({ message: "Veículo adicionado com sucesso!", vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.update(req.body, { where: { id } });
    res.json({ message: "Veículo atualizado com sucesso!", vehicle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await Vehicle.destroy({ where: { id } });
    res.json({ message: "Veículo excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
