const sequelize = require("./models/index");

sequelize.sync({ force: false }).then(() => {
  console.log("Tabelas sincronizadas com sucesso!");
});

require("dotenv").config();

