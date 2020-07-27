<template>
	<div class="body">
		<ul class="nav">
			<li class="nav-item"><i class="el-icon-s-home"> Discovery </i></li>
			<li class="nav-item"><i class="el-icon-s-home"> Podcasts </i></li>
			<li class="nav-item"><i class="el-icon-s-home"> Latest Songs </i></li>
			<li class="nav-item"><i class="el-icon-s-home"> Latest MVs </i></li>
			<li class="nav-item"><i class="el-icon-s-home"> My Playlist </i></li>
		</ul>
		<div class="content"></div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.body {
	width: 100vw;
	height: calc(100vh - #{$header-height});
	background-color: beige;

	.nav {
		width: 200px;
		height: 100%;
		background-color: #ededed;

		li {
			padding: 10px 20px;
			text-align: left;
		}
	}
}
</style>
