const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);

module.exports = app;
