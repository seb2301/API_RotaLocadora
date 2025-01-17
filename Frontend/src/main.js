import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importa as rotas
import vuetify from "./plugins/vuetify"; // Importa o Vuetify
import "vuetify/styles"; // Estilos do Vuetify
import "@mdi/font/css/materialdesignicons.css"; // Ícones do Vuetify

createApp(App).use(router).use(vuetify).mount("#app");
