<template>
	<div class="body">
		<ul class="nav">
			<!-- Use iconfont icons -->
			<li class="nav-item">
				<router-link to="/recommend">
					<i class="iconfont icon-rebang"> Recommend </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/leadboard">
					<i class="iconfont icon-paihangbang1"> Leadboard </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/categories">
					<i class="iconfont icon-gedan"> Categories </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/artists">
					<i class="iconfont icon-artist"> All Artists </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/music-videos">
					<i class="iconfont icon-ziyuan"> Music Videos </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/latest-releases">
					<i class="iconfont icon-ziyuan"> Latest Releases </i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/podcasts">
					<i class="iconfont icon-podcast"> Podcasts </i>
				</router-link>
			</li>
		</ul>

		<div class="content">
			<!-- <Recommend class="content-vertical-align" /> -->
			<router-view class="content-vertical-align" />
		</div>
	</div>
</template>

<script>
// import Recommend from "@/views/recommend/";

export default {
	// components: { Recommend },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/universal.scss";
@import "@/assets/styles/mixin.scss";

.body {
	width: 100vw;
	// height: calc(100vh - #{$header-height});
	height: 100vh;
	background-color: beige;
	padding: 50px 0;

	@include flex-align(row, space-between, flex-start);

	.nav {
		width: 200px;
		height: 100%;
		background-color: #ededed;
		padding-top: 10px;

		li {
			padding: 10px 20px;
			text-align: left;
			cursor: pointer;
		}
	}

	.content {
		float: 1;
		width: calc(100% - 200px);
		height: 100%;
		overflow: auto;
	}
}
</style>
