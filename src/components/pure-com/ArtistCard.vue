<template>
	<div class="artist-card" @click="viewArtist(artistId)">
		<img v-lazy="$helpers.getSmallPicture(avatar, 200)" alt="" />

		<div class="artist-links">
			<span class="artist-name">{{ name }}</span>
			<i class="iconfont icon-home_page" title="Personal Website"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: "ArtistCard",
	props: ["artistId", "name", "avatar"],
	methods: {
		viewArtist(artistId) {
			this.$router.push(`/artists/detail` + `?id=${artistId}`);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.artist-card {
	width: 200px;
	margin-bottom: 20px;

	img {
		width: 100%;
		border-radius: 5px;
		cursor: pointer;
	}

	.artist-links {
		padding: 5px;
		font-size: 12px;
		@include flex-align(row, space-between);
		i {
			color: $theme-primary-color;
		}
	}
}
</style>
