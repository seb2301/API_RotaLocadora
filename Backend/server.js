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

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/history", authMiddleware, historyRoutes);
app.use("/api/vehicles", authMiddleware, vehicleRoutes);

// Middleware para erros gerais
app.use((err, req, res, next) => {
  console.error("Erro capturado pelo middleware:", err.message);
  if (!res.headersSent) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});

const PORT = process.env.PORT || 3000;

/**
 * Função que tenta conectar ao banco de dados N vezes (retorna erro se falhar).
 */
async function connectToDatabase(retries = 5) {
  while (retries) {
    try {
      await prisma.$connect();
      console.log("Conexão com o banco de dados bem-sucedida!");
      return; // sai da função ao conectar com sucesso
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados. Tentando novamente...", err);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  throw new Error("Não foi possível conectar ao banco de dados após várias tentativas.");
}

/**
 * Função principal para subir o servidor.
 * Ela conecta primeiro ao DB e depois inicia a API.
 */
async function bootstrap() {
  try {
    await connectToDatabase(); // Tenta conectar ao DB
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro fatal ao inicializar a aplicação:", err);
    process.exit(1); // encerra se não conseguiu conectar ao DB
  }
}

// Inicia tudo
bootstrap();
