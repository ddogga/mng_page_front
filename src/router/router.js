import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/admin/Login.vue";
import Join from "../views/admin/Join.vue";
import Dashboard from "../views/Dashboard.vue";

import UserList from "../views/admin/UserList.vue";

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
    {
      path: "/shop/user_list",
      name: "UserList",
      component: UserList,
    },
  ],
});

export default router;
