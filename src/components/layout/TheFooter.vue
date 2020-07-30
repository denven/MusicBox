<template>
	<div class="player">
		<audio :src="musicUrl" autoplay controls loop id="music"></audio>
	</div>
</template>

<script>
export default {
	computed: {
		musicUrl() {
			return this.$store.state.audioUrl;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.player {
	width: 100%;
	height: $header-height;
	// background-color: #171717;

	audio {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
	}
}
</style>
