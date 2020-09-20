import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import Parse from 'parse';

Parse.initialize("fda647fd8cc2b83ce84a557d3c95086c");
Parse.serverURL = "https://visitormanagement-5676.nodechef.com/parse";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
