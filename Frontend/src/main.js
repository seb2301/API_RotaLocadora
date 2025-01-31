import { createApp } from "vue";
import App from "./App.vue";
import VCalendar from 'v-calendar';
import router from "./router";
import vuetify from "./plugins/vuetify";
import { setAuthToken } from "@/services/api"; 
import '@/assets/vcalendar-overrides.css';
import "@mdi/font/css/materialdesignicons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken); 
}

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VCalendar, {})
  .use(L)
  .mount("#app");





