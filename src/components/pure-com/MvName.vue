<template>
	<span class="mv-name">
		<span class="name"> {{ mv.name }}</span>
		<img v-lazy="$helpers.getSmallPicture(mv.cover, 250, 140)" alt="" />
	</span>
</template>

<script>
export default {
	name: "MvName",
	props: { mv: { type: Object } },
};
</script>

<style lang="scss" scoped>
.mv-name {
	position: relative;
	.name {
		color: #517eaf;
		cursor: pointer;
	}

	img {
		width: 250px;
		height: 140px;
		display: none;
		position: absolute;
		bottom: -252px;
		left: 0;
		z-index: 1000;
		border-radius: 4px;
	}

	&:hover {
		.name {
			text-decoration: underline;
		}
		img {
			display: block;
		}
	}
}
</style>
