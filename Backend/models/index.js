const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = {};

// Configuração do Sequelize com o dialect explícito
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco de dados
  process.env.DB_USERNAME,  // Nome de usuário
  process.env.DB_PASSWORD,  // Senha
  {
    host: process.env.DB_HOST,          // Host do banco
    dialect: process.env.DB_DIALECT,    // Dialeto (ex.: mysql, postgres)
    logging: false,                     // Desativa logs de SQL
  }
);

// Carregamento de modelos
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Configuração de associações entre os modelos
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

