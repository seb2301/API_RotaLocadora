const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Operações relacionadas aos usuários
module.exports = {
  // Buscar todos os usuários
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  // Criar um novo usuário
  createUser: async (userData) => {
    return await prisma.user.create({
      data: userData,
    });
  },

  // Buscar um usuário por ID
  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  },

  // Atualizar um usuário
  updateUser: async (id, userData) => {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
  },

  // Excluir um usuário
  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  },
};
