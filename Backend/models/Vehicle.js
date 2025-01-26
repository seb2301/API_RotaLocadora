const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Exporta o modelo Vehicle diretamente do Prisma
module.exports = prisma.vehicle;
