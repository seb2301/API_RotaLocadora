const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./config/database"); 

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/history", authMiddleware, historyRoutes);
app.use("/api/vehicles", authMiddleware, vehicleRoutes);

// Middleware para tratar erros gerais
app.use((err, req, res, next) => {
  console.error("Erro capturado pelo middleware:", err.message);
  if (!res.headersSent) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

async function connectToDatabase(retries = 5) {
  while (retries) {
    try {
      await prisma.$connect();
      console.log("Conexão com o banco de dados bem-sucedida!");
      break;
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados. Tentando novamente...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Espera uns 5 segundos antes de tentar novamente
    }
  }
  if (!retries) {
    throw new Error("Não foi possível conectar ao banco de dados após várias tentativas.");
  }
}

connectToDatabase();
