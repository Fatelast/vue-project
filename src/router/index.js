import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register"),
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
