<template>
	<div class="header">
		<div class="left">
			<div class="icon screen-buttons">
				<i class="icon el-icon-s-home"></i>
				<i class="icon el-icon-full-screen"></i>
			</div>
			<div class="icon nav-buttons">
				<i class="icon el-icon-arrow-left"></i>
				<i class="icon el-icon-arrow-right"></i>
				<i class="icon el-icon-arrow-down"></i>
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
export default {};
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
		.screen-buttons,
		.nav-buttons {
			width: 50px;
			@include flex-align(row, space-around, center);
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
