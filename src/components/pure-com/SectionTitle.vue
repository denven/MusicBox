<template>
	<div class="section">
		<div class="title">
			<slot></slot>
			<span>{{ title }}</span>
		</div>

		<div class="button">
			More
			<i class="iconfont icon-artist"> </i>
		</div>
	</div>
</template>

<script>
export default {
	name: "SectionTitle",
	props: ["title"],
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";

.section {
	width: 100%;
	height: 20px;
	padding: 20px 0;
	border-bottom: 2px solid red;
	margin-top: 20px;

	@include flex-align(row, space-between);

	.title {
		color: red;
		font-size: 18px;
		font-weight: 600;

		span {
			margin-left: 10px;
		}
	}
}
</style>
