<template>
	<div v-if="toplist.length > 0">
		<SectionTitle :title="'Featured Playlists'" :routePath="'/playlists'">
			<i class="iconfont icon-rebang"></i>
		</SectionTitle>

		<div class="cards">
			<PlaylistCard
				v-for="item in toplist"
				:key="item.id"
				:playlistId="item.id"
				:caption="item.copywriter"
				:picUrl="item.picUrl"
				:playCount="item.playCount"
				:songName="item.name"
			></PlaylistCard>
		</div>
	</div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import PlaylistCard from "@/components/pure-com/PlaylistCard";

import { getFeaturedList } from "@/network/request";

export default {
	data() {
		return {
			toplist: [],
		};
	},

	components: {
		SectionTitle,
		PlaylistCard,
	},

	async created() {
		let { data } = await getFeaturedList();
		// console.log(`toplist`, data.result);
		this.toplist = data.result;
	},
};
</script>

// scoped is needed here
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.cards {
	// @include flex-align(row, space-between, center, wrap);
	@include grid-align-cards();
}
</style>
