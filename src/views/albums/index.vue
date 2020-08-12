<template>
	<div class="albums">
		<div class="category-tabs">
			<div class="area-tabs">
				<span class="tab-label">Area:</span>
				<ul>
					<li
						v-for="(area, index) in areaTabs"
						:key="area"
						:class="{ active: index === filterIdx.area }"
						@click="setFilter('area', area, index)"
					>
						<span class="button">{{ area }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="disc-cards">
			<DiscCard
				v-for="item in newAlbums"
				:key="item.id"
				:caption="item.copywriter"
				:picUrl="item.blurPicUrl"
				:albumId="item.id"
				:songName="item.name"
			>
				<p class="artist">by: {{ item.artist.name }}</p>
			</DiscCard>
		</div>

		<el-pagination
			v-if="albTotal > 0"
			background
			layout="prev, pager, next"
			:total="albTotal"
			@current-change="setPageIndex"
		>
		</el-pagination>
	</div>
</template>

<script>
import DiscCard from "@/components/pure-com/DiscCard";
import { getAllAlbums } from "@/network/request";

export default {
	data() {
		return {
			newAlbums: [],
			albTotal: 0,
			filter: { area: "ALL", limit: 8, offset: 0 },
			filterIdx: { area: 0 },
			areaTabs: ["ALL", "Chinese", "English", "Korean", "Japanese"],
		};
	},

	components: {
		DiscCard,
	},

	methods: {
		async getAllAlbumsByCategory() {
			// the param `timestamp` is needed here to get latest albums, otherwise,
			// the server will buffer the data from requests in the past 2 minutes
			let timestamp = Date.now();
			let res = await getAllAlbums({ ...this.filter, timestamp });
			this.albTotal = res.data.total;
			this.newAlbums = res.data.albums;
		},

		setFilter(tabType, keyword, index) {
			const areaTabsAbbr = ["ALL", "ZH", "EA", "KR", "JP"];

			if (tabType === "area" && this.areaTabs.includes(keyword)) {
				this.filterIdx.area = index;
				this.filter = { ...this.filter, area: areaTabsAbbr[index] };
			}
		},

		setPageIndex(pageIdx) {
			this.pageIdx = pageIdx;
			this.filter = { ...this.filter, offset: this.filter.limit * (pageIdx - 1) };
		},
	},

	watch: {
		async filter() {
			await this.getAllAlbumsByCategory();
		},
	},

	async created() {
		await this.getAllAlbumsByCategory();
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";
.category-tabs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: start;
	margin-top: 20px;
	padding-bottom: 10px;
	border-bottom: 3px solid #e4e6ed;

	.area-tabs {
		@include flex-align(row, flex-start);
		.tab-label {
			font-weight: bold;
			margin-right: 12px;
		}
	}

	.area-tabs ul {
		display: grid;
		grid-template-columns: 60px 90px 90px 90px 100px;
	}

	.button {
		display: block;
		padding: 5px 0;
		margin-right: 5px;
		border-radius: 4px;
		cursor: pointer;
		color: #333333;
	}

	.active .button {
		display: block;
		padding: 5px 0;
		margin-right: 5px;
		border-radius: 4px;
		cursor: pointer;
		background-color: $theme-primary-color;
		color: white;
	}

	ul {
		@include flex-align(row, flex-start);
	}
}

.disc-cards {
	width: 100%;
	@include grid-align-cards(226px);
	// [class^=]
	.artist {
		font-size: 14px;
		color: #bebebe;
	}
}
</style>
