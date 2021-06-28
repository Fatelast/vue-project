//引入组件
import Vue from "vue";
import App from "./App.vue";
import Footer from "./components/Footer";
import TypeNav from "./components/TypeNav";

//引入router store
import router from "./router";
import store from "./store";

import * as API from "./api";

// 引入mock使其生效
import "./mock";

//引入样式
import "./assets/css/normalize.css";
import "./assets/css/reset.css";
import "./assets/css/iconfont.css";

Vue.config.productionTip = false;

// 全局注册
Vue.component("Footer", Footer);
Vue.component("TypeNav", TypeNav);

Vue.prototype.$API = API;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
