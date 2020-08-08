import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueLazyload from "vue-lazyload";

import "@/assets/styles/reset.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import helpers from "@/common/helpers";

Vue.prototype.$helpers = helpers;

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
