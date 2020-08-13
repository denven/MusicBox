<template>
	<span class="artist-name">
		<span class="name"> {{ artist.name }}</span>
		<img v-lazy="$helpers.getSmallPicture(artist.picUrl, 200)" alt="" />
	</span>
</template>

<script>
export default {
	name: "AlbumName",
	props: { artist: { type: Object } },

	// methods: {
	// 	viewDetail(artist) {
	// 		this.$router.push({ name: "ar-detail", params: { artist } });
	// 	},
	// },
};
</script>

<style lang="scss" scoped>
.artist-name {
	position: relative;
	.name {
		padding-right: 5px;
		color: #517eaf;
		// cursor: pointer;
	}

	img {
		width: 200px;
		height: 200px;
		display: none;
	}

	&:hover {
		.name {
			text-decoration: underline;
		}
		img {
			display: block;
			position: absolute;
			bottom: -202px;
			left: 0;
			z-index: 100;
			border-radius: 4px;
		}
	}
}
</style>
