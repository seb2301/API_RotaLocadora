import { debugRegisterVehicle, checkApiHealth } from './services/debugApi';

const vehicleData = {
  plate: 'MJW-2725',
  brand: 'Ford',
  model: 'Fiesta',
  year: 2013,
  color: 'Red',
  usage: 'Uso pessoal',
  latitude: '-35.578',
  longitude: '-99.9887',
  isNew: false,
  comfortLevel: 3
};

debugRegisterVehicle(vehicleData);
checkApiHealth();
