<template>
	<div class="videos">
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
			<div class="type-tabs">
				<span class="tab-label">Type:</span>
				<ul>
					<li
						v-for="(type, index) in typeTabs"
						:key="type"
						:class="{ active: index === filterIdx.type }"
						@click="setFilter('type', type, index)"
					>
						<span class="button">{{ type }}</span>
					</li>
				</ul>
			</div>
			<div class="sort-tabs">
				<span class="tab-label">Sort By:</span>
				<ul>
					<li
						v-for="(order, index) in sortTabs"
						:key="order"
						:class="{ active: index === filterIdx.order }"
						@click="setFilter('order', order, index)"
					>
						<span class="button">{{ order }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mv-cards">
			<MvCard
				v-for="item in pageMvs"
				:key="item.id"
				:height="'140px'"
				:caption="item.copywriter"
				:picUrl="item.cover"
				:playCount="item.playCount"
				:mvName="item.name"
				:duration="$helpers.convertMsToMinutes(item.duration)"
				@click.native="playMv(item)"
			>
				<p class="artist">by: {{ item.artistName }}</p>
			</MvCard>
		</div>

		<el-pagination
			v-if="mvsTotal > 0"
			background
			layout="prev, pager, next"
			:total="mvsTotal"
			@current-change="setPageIndex"
		></el-pagination>
	</div>
</template>

<script>
import MvCard from "@/components/pure-com/MvCard";
import { getAllMvs } from "@/network/request";

export default {
	components: {
		MvCard,
	},

	data() {
		return {
			pageMvs: [],
			mvsTotal: 0,
			filter: { type: "全部", area: "欧美", order: "最新", limit: 12, offset: 0 },
			filterIdx: { area: 0, type: 0, order: 2 }, // value is the Tabs array index

			areaTabs: ["All", "China", "Hongkong", "English", "Japanese", "Korean"],
			typeTabs: ["All", "Official", "Acoustic", "Live", "Net Ease"],
			sortTabs: ["Trending", "Hottest", "Latest"],
		};
	},

	methods: {
		playMv(video) {
			this.$router.push(`/videos/detail` + `?id=${video.id}`);
		},

		async getAllMvsByCategory() {
			let { data } = await getAllMvs(this.filter);
			this.mvsTotal = data.count;
			this.pageMvs = data.data;
		},

		setFilter(tabType, keyword, index) {
			const areaTabsChs = ["全部", "内地", "港台", "欧美", "日本", "韩国"];
			const typeTabsChs = ["全部", "官方版", "原生", "现场版", "网易出品"];
			const sortTabsChs = ["上升最快", "最热", "最新"];

			if (tabType === "area" && this.areaTabs.includes(keyword)) {
				this.filterIdx.area = index;
				this.filter.area = areaTabsChs[index];
			}

			if (tabType === "type" && this.typeTabs.includes(keyword)) {
				this.filterIdx.type = index;
				this.filter.type = typeTabsChs[index];
			}

			if (tabType === "order" && this.sortTabs.includes(keyword)) {
				this.filterIdx.order = index;
				this.filter.order = sortTabsChs[index];
			}

			this.filter = { ...this.filter };
		},

		setPageIndex(pageIdx) {
			this.filter = { ...this.filter, offset: this.filter.limit * (pageIdx - 1) };
		},
	},

	watch: {
		filter() {
			console.log("filter changed..............");
			this.getAllMvsByCategory();
		},
	},

	async created() {
		await this.getAllMvsByCategory();
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.videos {
	margin-top: 20px;
}

.category-tabs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	row-gap: 10px;
	justify-content: start;
	margin-bottom: 20px;
	padding-bottom: 10px;
	border-bottom: 3px solid #e4e6ed;

	.area-tabs,
	.type-tabs,
	.sort-tabs {
		@include flex-align(row, flex-start);
		.tab-label {
			font-weight: bold;
			margin-right: 12px;
		}
	}

	.sort-tabs {
		grid-column: 2 / 3;
		grid-row: 1/3;
		ul {
			display: grid;
			grid-template-columns: repeat(3, 100px);
			row-gap: 10px;
			justify-content: stretch;
		}
	}

	.area-tabs ul {
		display: grid;
		grid-template-columns: 50px 80px 100px 90px 100px 70px;
	}

	.type-tabs ul {
		display: grid;
		grid-template-columns: 50px 80px 100px 90px 100px;
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
.mv-cards {
	// image size is 250px*140px
	width: 100%;
	@include grid-align-cards(250px);
	.mv-card {
		margin-bottom: 20px;
	}
}
</style>
