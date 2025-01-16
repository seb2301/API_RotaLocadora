require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const db = require('./database/config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);

db.sync({ force: false }).then(() => console.log('Banco de dados conectado.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
