import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "@/views/UserLogin.vue";
import UserRegister from "@/views/UserRegister.vue";
import VehicleList from "@/views/VehicleList.vue";
import UserHistory from "@/views/UserHistory.vue";


const routes = [
  { path: "/", name: "UserLogin", component: UserLogin },
  { path: "/register", name: "UserRegister", component: UserRegister },
  { path: "/vehicles", name: "VehicleList", component: VehicleList },
  { path: "/history", name: "UserHistory", component: UserHistory },
  { path: '/vehicle-details/:id', name: 'VehicleDetails', component: () => import('@/views/VehicleDetailsPage.vue') },
  { path: "/login", name: "Login", component: () => import("@/views/UserLogin.vue") },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
