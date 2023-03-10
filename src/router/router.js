import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/admin/Login.vue";
import Join from "../views/admin/Join.vue";

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
      path: "/shop/main",
      name: "Main",
      component: Main,
    },
  ],
});

export default router;
