const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth"); // Certifique-se do caminho correto
const prisma = require("./prismaClient"); // Certifique-se que este arquivo foi configurado corretamente

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);

module.exports = app;
