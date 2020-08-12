import Vue from "vue";
import VueRouter from "vue-router";

// for lazy loading
// this generates a separate chunk (componnet.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const showFeatured = () => import(/* webpackChunkName: "featured" */ "@/views/featured/");

const showSearchResults = () => import(/* webpackChunkName: "search" */ "@/views/search/");

const showLeadboards = () => import(/* webpackChunkName: "leadboards" */ "@/views/leadboards/");

const showPlaylists = () => import(/* webpackChunkName: "playlists" */ "@/views/playlists/");
const showPlaylistDetail = () => import(/* webpackChunkName: "playlists-detail" */ "@/views/playlists/PlaylistDetail");

const showArtists = () => import(/* webpackChunkName: "artists" */ "@/views/artists/");
const showArtistDetail = () => import(/* webpackChunkName: "artist-detail" */ "@/views/artists/ArtistDetail");

const showAllAlbums = () => import(/* webpackChunkName: "albums" */ "@/views/albums/");
const showAlbumDetail = () => import(/* webpackChunkName: "album-detail" */ "@/views/albums/AlbumDetail");

const showLatestMvs = () => import(/* webpackChunkName: "videos" */ "@/views/videos/");

const showPodcasts = () => import(/* webpackChunkName: "podcasts" */ "@/views/podcasts/");

const showMvDetail = () => import(/* webpackChunkName: "/videos/" */ "@/views/videos/MvPage.vue");

const showHomePage = showFeatured;

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
		path: "/featured",
		name: "Featured",
		component: showFeatured,
	},
	{
		path: "/playlists",
		name: "Playlists",
		component: showPlaylists,
	},
	{
		path: "/videos",
		name: "LatestMvs",
		component: showLatestMvs,
	},
	{
		path: "/artists",
		name: "Artists",
		component: showArtists,
	},
	{
		path: "/albums",
		name: "Albums",
		component: showAllAlbums,
	},
	{
		path: "/leadboards",
		name: "Leadboards",
		component: showLeadboards,
	},
	{
		path: "/podcasts",
		name: "Podcasts",
		component: showPodcasts,
	},
	{ path: "/videos/detail", name: "mv", component: showMvDetail },
	{ path: "/playlists/detail", name: "mv-detail", component: showPlaylistDetail },
	{ path: "/artists/detail", name: "ar-detail", component: showArtistDetail },
	{ path: "/albums/detail", name: "al-detail", component: showAlbumDetail },
];

const router = new VueRouter({
	routes,
	mode: "history", //do not show # in URL(otherwise it will call location.hash() to use hash mode)
});

export default router;
