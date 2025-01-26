// routes/vehicleRoutes.js
const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// Rota para criar veículo
router.post("/", vehicleController.createVehicle);

// Rota para buscar todos os veículos
router.get("/", vehicleController.getAllVehicles);

// Rota para atualizar um veículo
router.put("/:id", vehicleController.updateVehicle);

// Rota para deletar um veículo
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
