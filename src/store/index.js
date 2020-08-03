import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		song: {
			audioUrl: "",
			picUrl: "",
			name: "",
			artist: "",
		},
		curSearchTab: "tracks",
	},
	mutations: {},
	actions: {},
	modules: {},
});
