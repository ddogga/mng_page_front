import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";

// ==========================================
// Js
// ==========================================

// Bootstrap core JavaScript
import "@/assets/vendor/jquery/jquery.min.js";
import "@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";

// Core plugin JavaScript
import "@/assets/vendor/jquery-easing/jquery.easing.min.js";

// Custom scripts for all pages
// import "@/assets/js/sb-admin-2.min.js";

// Page level plugins
import "@/assets/vendor/chart.js/Chart.min.js";

// Page level custom scripts
import "@/assets/js/demo/chart-area-demo.js";
import "@/assets/js/demo/chart-pie-demo.js";

// ==========================================
// Style
// ==========================================
import "@/assets/css/sb-admin-2.min.css";
import "@/assets/vendor/fontawesome-free/css/all.min.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
