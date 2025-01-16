const { DataTypes } = require('sequelize');
const db = require('../database/config');

const Vehicle = db.define('Vehicle', {
  plate: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING },
  usePurpose: { type: DataTypes.STRING },
  latitude: { type: DataTypes.FLOAT },
  longitude: { type: DataTypes.FLOAT },
  comfortLevel: { type: DataTypes.INTEGER },
  zeroKm: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Vehicle;
