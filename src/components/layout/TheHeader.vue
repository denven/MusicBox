<template>
	<div class="header">
		<div class="left">
			<div class="icon nav-buttons">
				<i class="icon el-icon-s-home"></i>
				<i class="icon el-icon-full-screen" @click="toggleFullScreen"></i>
				<i class="icon el-icon-arrow-down"></i>
				<i class="icon el-icon-arrow-left"></i>
				<i class="icon el-icon-arrow-right"></i>
			</div>
		</div>
		<div class="right">
			<input class="search" type="text" />
			<div class="theme">
				<i class="icon el-icon-s-custom"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		toggleFullScreen() {
			const ele = document.documentElement;

			/* Enter Fullscrenn */
			if (ele.requestFullscreen) {
				ele.requestFullscreen();
			} else if (ele.mozRequestFullScreen) {
				/* Firefox */
				ele.mozRequestFullScreen();
			} else if (ele.webkitRequestFullscreen) {
				/* Chrome, Safari and Opera */
				ele.webkitRequestFullscreen();
			} else if (ele.msRequestFullscreen) {
				/* IE/Edge */
				ele.msRequestFullscreen();
			}

			/* Exit fullscreen */
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				/* Firefox */
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				/* Chrome, Safari and Opera */
				console.log("Chrome, Safari and Opera");
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE/Edge */
				document.msExitFullscreen();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

.header {
	@include flex-align();

	height: $header-height;
	padding: 0 20px;
	background-color: #c33f18;

	.left {
		@include flex-align();
		width: $header-left-width;
		.nav-buttons {
			width: 180px;
			@include flex-align(row, space-between, center);
		}
	}

	.right {
		@include flex-align();
		width: $header-right-width;
	}

	.icon {
		color: white;
	}

	.search {
		border-radius: 10px;
	}
}
</style>
