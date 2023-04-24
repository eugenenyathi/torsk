import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/helpers/axios.js";
import "@fontsource/lato";

createApp(App).use(store).use(router).mount("#app");
