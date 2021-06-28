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
    // 当当前路由加载了，meta参数就会传入的$route.meta中
    meta: {
      isHideFooter: true,
    },
  },
  {
    // params参数，路径必须是:xxx写法才行
    // :xxx? 可选的params参数，可以有可以没有
    // :xxx 必填的params参数，必要要有，没有地址重定向到/
    path: "/search/:keyword?",
    name: "Search",
    component: () => import("../views/Search"),
  },
  {
    name: "Detail",
    path: "/detail/:id",
    component: () => import("../views/Detail"),
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
  //切换路由时，控制滚动条位置
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
