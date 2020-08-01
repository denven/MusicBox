<template>
	<div>
		<SectionTitle :title="'Featured Playlists'">
			<i class="iconfont icon-rebang"> </i>
		</SectionTitle>

		<div class="cards">
			<SectionCard
				v-for="item in toplist"
				:key="item.id"
				:caption="item.copywriter"
				:picUrl="item.picUrl"
				:playCount="item.playCount"
				:songName="item.name"
			>
			</SectionCard>
		</div>
	</div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import SectionCard from "@/components/pure-com/SectionCard";

import { getFeaturedList } from "@/network/request";

export default {
	data() {
		return {
			toplist: [],
		};
	},

	components: {
		SectionTitle,
		SectionCard,
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
