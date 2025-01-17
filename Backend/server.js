const app = require("./app"); // Importa o arquivo app.js
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
