import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";

// ==========================================
// Style
// ==========================================
import "@/assets/css/sb-admin-2.min.css";
import "@/assets/vendor/fontawesome-free/css/all.min.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
