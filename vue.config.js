module.exports = {
	chainWebpack: (config) => {
		config.set("externals", {
			vue: "Vue",
			"vue-router": "VueRouter",
			vuex: "Vuex",
			"vue-lazyload": "VueLazyload",
			"element-ui": "ELEMENT",
			axios: "axios",
		});
	},
};
