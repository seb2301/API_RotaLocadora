import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/UserLogin.vue';
import Register from '../views/UserRegister.vue';
import VehicleList from '../views/VehicleList.vue';
import History from '../views/UserHistory.vue';
import VehicleDetails from '../views/VehicleDetailsPage.vue';

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
