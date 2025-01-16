import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import VehicleList from '../views/VehicleList.vue';
import History from '../views/History.vue';
import VehicleDetails from '../views/VehicleDetails.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/vehicles', component: VehicleList },
  { path: '/history', component: History },
  { path: '/vehicles/:id', component: VehicleDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
