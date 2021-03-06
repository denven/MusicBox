// import Vue from "vue";
// import router from "./router";
// import vueLazyload from "vue-lazyload";
// import ElementUI from "element-ui";

const Vue = require("vue");
const vueLazyload = require("vue-lazyload");
const ElementUI = require("element-ui");

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/assets/styles/reset.scss";
// import "element-ui/lib/theme-chalk/index.css";

import helpers from "@/common/helpers";
import session from "@/common/session";

Vue.prototype.$helpers = helpers;
Vue.prototype.$session = session;

const MINI_B64_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vueLazyload, {
	loading: MINI_B64_IMG,
	error: MINI_B64_IMG,
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
