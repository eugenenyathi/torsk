import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./helpers/axios.js";

createApp(App).use(store).use(router).mount("#app");
