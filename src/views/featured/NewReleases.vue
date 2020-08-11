<template>
	<div v-if="newAlbums.length > 0">
		<SectionTitle :title="'New Realeases'" :routePath="'/albums'">
			<i class="iconfont icon-album"></i>
		</SectionTitle>

		<div class="cards">
			<DiscCard
				v-for="item in newAlbums"
				:key="item.id"
				:caption="item.copywriter"
				:picUrl="item.blurPicUrl"
				:songName="item.name"
			>
				<p class="artist">by: {{ item.artist.name }}</p>
			</DiscCard>
		</div>
	</div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import DiscCard from "@/components/pure-com/DiscCard";
import { getNewAlbums } from "@/network/request";

export default {
	data() {
		return {
			newAlbums: [],
		};
	},

	components: {
		SectionTitle,
		DiscCard,
	},

	async created() {
		let { data } = await getNewAlbums();
		// console.log(`new albums`, data.albums);
		this.newAlbums = data.albums;
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.cards {
	width: 100%;
	@include grid-align-cards(226px);
	.artist {
		font-size: 14px;
		color: #bebebe;
	}
}
</style>
