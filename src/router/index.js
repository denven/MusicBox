import Vue from "vue";
import VueRouter from "vue-router";

// for lazy loading
// this generates a separate chunk (componnet.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const showRecommend = () =>
	import(/* webpackChunkName: "recommend" */ "@/views/recommend/");

const showSearchResults = () =>
	import(/* webpackChunkName: "search" */ "@/views/search/");

//const showLatestReleases = () =>
//	import(/* webpackChunkName: "latest-release" */ "views/latest-releases/");

const showHomePage = showRecommend;

Vue.use(VueRouter);

// To avoid error message "Avoided redundant navigation to current location"
// when pushing the same route, this is done by preventing pushing the same route,
// but we need re-submission for searching feature, so this isn't the right solution
// The final solution is add key on the router-view tag:
//         <router-view :key="$route.path + $route.query.keywords"
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const routes = [
	{
		path: "/",
		name: "Home",
		component: showHomePage,
	},
	{
		path: "/search",
		name: "Search",
		component: showSearchResults,
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
