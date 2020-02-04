import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./request/api.js";
import { Icon } from 'vant';
// import { Swipe, SwipeItem } from 'vant';

// Vue.use(Swipe);
// Vue.use(SwipeItem);
Vue.use(Icon);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
// Vue.config.module.rules.push({
//   enforce: 'pre',
//   test: /\.(js|vue)$/,
//   loader: 'eslint-loader',
//   exclude: /(node_modules)/,
//   options: {
//     fix: true
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
