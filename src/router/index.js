import Vue from "vue";
import VueRouter from "vue-router";

// for lazy loading
// this generates a separate chunk (componnet.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const showRecommend = () =>
	import(/* webpackChunkName: "recommend" */ "@/views/recommend/");
//const showLatestReleases = () =>
//	import(/* webpackChunkName: "latest-release" */ "views/latest-releases/");

const showHomePage = showRecommend;

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: showHomePage,
	},
	{
		path: "/recommend",
		name: "Recommend",
		component: showRecommend,
	},
	// {
	// 	path: "/latest-releases",
	// 	name: "LatestReleases",
	// 	component: showLatestReleases,
	// },
];

const router = new VueRouter({
	routes,
	mode: "history", //do not show # in URL(otherwise it will call location.hash() to use hash mode)
});

export default router;
