import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/admin/Login.vue";
import Join from "../views/admin/Join.vue";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/shop/login",
    },
    {
      path: "/shop",
      redirect: "/shop/login",
    },
    {
      path: "/shop/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/shop/join",
      name: "Join",
      component: Join,
    },
    {
      path: "/shop/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
  ],
});

export default router;
