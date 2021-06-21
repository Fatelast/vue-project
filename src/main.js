import Vue from "vue";
import App from "./App.vue";
import Footer from "./components/Footer";
import TypeNav from "./components/TypeNav";

import router from "./router";
import store from "./store";

import "./assets/css/normalize.css";
import "./assets/css/reset.css";

Vue.config.productionTip = false;

// 全局注册
Vue.component("Footer", Footer);
Vue.component("TypeNav", TypeNav);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
