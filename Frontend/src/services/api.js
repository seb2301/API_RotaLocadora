import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000/api',
});

export default api;
