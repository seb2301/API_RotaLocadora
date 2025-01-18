const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log("Conexão com o banco bem-sucedida!");
    console.log("Usuários encontrados:", users);
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
