const express = require('express');
const router = express.Router();
const prisma = require("../config/database");
const historyController = require("../controllers/historyController");

router.get("/", historyController.getAllHistories);


module.exports = router;