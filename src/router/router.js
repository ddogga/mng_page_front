import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "Main",
      component: Main,
    },
  ],
});

export default router;
