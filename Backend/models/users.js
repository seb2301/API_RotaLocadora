const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  createUser: async (userData) => {
    return await prisma.user.create({
      data: userData,
    });
  },

  getUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  },

  updateUser: async (id, userData) => {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData,
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  },
};
