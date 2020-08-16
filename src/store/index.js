// import Vue from "vue";
// import Vuex from "vuex";

const Vue = require("vue");
const Vuex = require("vuex");
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// for music play
		song: {
			audioUrl: "",
			picUrl: "",
			name: "",
			artist: "",
		},
		// for search results
		curSearchTab: "tracks",
		videoPlaying: false,
	},
	mutations: {},
	actions: {},
	modules: {},
});
