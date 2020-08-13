<template>
	<div class="album-name">
		<span class="name" @click="viewDetail(album.id)"> {{ album.name }}</span>
		<img v-lazy="$helpers.getSmallPicture(album.picUrl, 200)" alt="" />
	</div>
</template>

<script>
export default {
	name: "AlbumName",
	props: { album: { type: Object } },

	methods: {
		viewDetail(albumId) {
			this.$router.push(`/albums/detail` + `?id=${albumId}`);
		},
	},
};
</script>

<style lang="scss" scoped>
.album-name {
	position: relative;
	.name {
		color: #517eaf;
		cursor: pointer;
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
