import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import Parse from 'parse';
import AsyncComputed from 'vue-async-computed';

Parse.initialize("visitorManagement");
Parse.serverURL = "https://visitor-management-parse.herokuapp.com/parse";

Vue.config.productionTip = false;
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
