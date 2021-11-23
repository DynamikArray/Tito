import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import("./plugins/vueToastr");
import("./filters");

import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Ok",
  buttonTrueColor: "green",
  buttonFalseText: "Cancel",
  buttonFalseColor: "red",
  color: "red",
  icon: "fa-exclamation-circle",
  title: "Are you sure?",
  width: 350,
  property: "$confirm"
});

Vue.config.productionTip = false;
const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

//Allows us to reference VUE things in our store, like $toastr
store.$app = app;
