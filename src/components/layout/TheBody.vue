<template>
	<div class="body">
		<ul class="nav">
			<!-- Use iconfont icons -->
			<li class="nav-item">
				<i class="iconfont icon-rebang"> Recommend </i>
			</li>
			<li class="nav-item">
				<i class="iconfont icon-paihangbang1"> Leadboard </i>
			</li>
			<li class="nav-item"><i class="iconfont icon-gedan"> Playlist </i></li>
			<li class="nav-item"><i class="iconfont icon-podcast"> Podcasts </i></li>
			<li class="nav-item"><i class="iconfont icon-artist"> Artists </i></li>
			<li class="nav-item">
				<i class="iconfont icon-ziyuan"> Latest Releases </i>
			</li>
		</ul>
		<div class="content">
			<Recommend />
		</div>
	</div>
</template>

<script>
import Recommend from "@/views/recommend/";
export default {
	components: { Recommend },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

.body {
	width: 100vw;
	height: calc(100vh - #{$header-height});
	background-color: beige;

	@include flex-align(row, space-between);

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
	}
}
</style>
