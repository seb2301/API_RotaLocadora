const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Testando a conexão com o modelo User
    const users = await prisma.user.findMany(); // Altere 'user' para o nome do modelo no seu `schema.prisma`
    console.log("Conexão com o banco bem-sucedida!");
    console.log("Usuários encontrados:", users);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
