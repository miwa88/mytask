import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.filter("upperCase", function(value) {
  return value.toUpperCase();
});
new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
