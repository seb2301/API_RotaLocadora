// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import router from "./router";
import vuetify from "./plugins/vuetify";
import { setAuthToken } from "@/services/api"; // Import só da função, se só ela for usada
import "vuetify/styles";
import '@/assets/vcalendar-overrides.css';
import "@mdi/font/css/materialdesignicons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';




// 1) Carregar token salvo (caso exista)
const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken); // Assim, o axios já terá Authorization
}

// 2) Criar a aplicação e montar
createApp(App)
  .use(router)
  .use(vuetify)
  .use(VCalendar, {})
  .mount("#app");





