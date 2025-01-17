import { createRouter, createWebHistory } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import UserRegister from "@/views/UserRegister.vue";

const routes = [
  { path: "/", name: "Login", component: UserLogin },
  { path: "/register", name: "Register", component: UserRegister },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
