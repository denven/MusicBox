<template>
	<div class="artists">
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
						v-for="(char, index) in sortTabs"
						:key="char"
						:class="{ active: index === filterIdx.initial }"
						@click="setFilter('initial', char, index)"
					>
						<span class="button">{{ char }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="artists-cards">
			<div class="artist-card" v-for="artist in artists" :key="artist.id" @click="gotoRoute(artist)">
				<img v-lazy="$helpers.getSmallPicture(artist.img1v1Url, 200)" alt="" />

				<div class="artist-links">
					<span class="artist-name">{{ artist.name }}</span>
					<i class="iconfont icon-home_page" title="Personal Website"></i>
				</div>
			</div>
		</div>

		<el-pagination
			v-if="artists.length > 0"
			background
			layout="prev, pager, next"
			:total="1000"
			@current-change="setPageIndex"
		>
		</el-pagination>
	</div>
</template>

<script>
import { getArtistsList } from "@/network/request";

export default {
	data() {
		return {
			artists: [],
			// type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
			// area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
			filter: { type: -1, area: -1, initial: "A", limit: 10, offset: 0 },
			filterIdx: { area: 0, type: 0, initial: 0 }, // value is the Tabs array index

			areaTabs: [],
			typeTabs: [],
			sortTabs: [],

			artistMvs: [],
			artistDetail: "",
			artistAlbums: [],
			artistTopTracks: [],
			similarArtists: [],
		};
	},

	methods: {
		async getArtistsByCategory() {
			let res = await getArtistsList(this.filter);
			this.artists = res.data.artists;
		},

		initCategoryTabs() {
			this.areaTabs = ["All", "English", "Chinese", "Japanese", "Korean", "Other"];
			this.typeTabs = ["All", "Male", "Female", "Group/Band"];

			let start = "A".charCodeAt(0);
			let end = "Z".charCodeAt(0);
			for (; start <= end; start++) {
				this.sortTabs.push(String.fromCharCode(start));
			}
		},

		setFilter(tabType, keyword, index) {
			if (tabType === "area" && this.areaTabs.includes(keyword)) {
				this.filterIdx.area = index;
			}

			if (tabType === "type" && this.typeTabs.includes(keyword)) {
				this.filterIdx.type = index;
			}

			if (tabType === "initial" && this.sortTabs.includes(keyword)) {
				this.filterIdx.initial = index;
				this.filter.initial = keyword;
			}

			this.indexToParams(this.filterIdx);
		},

		// DO NOT assign the prop value, the watcher cannot detect changes
		indexToParams(filterIdx) {
			// type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
			if (filterIdx.type === 0) {
				this.filter = { ...this.filter, type: -1 };
			} else {
				this.filter = { ...this.filter, type: filterIdx.type };
			}

			// area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他

			if (filterIdx.area === 0) this.filter = { ...this.filter, area: -1 };
			if (filterIdx.area === 1) this.filter = { ...this.filter, area: 96 };
			if (filterIdx.area === 2) this.filter = { ...this.filter, area: 7 };
			if (filterIdx.area === 3) this.filter = { ...this.filter, area: 8 };
			if (filterIdx.area === 4) this.filter = { ...this.filter, area: 16 };
			if (filterIdx.area === 5) this.filter = { ...this.filter, area: 0 };
		},

		setPageIndex(pageIdx) {
			this.filter = { ...this.filter, offset: this.filter.limit * (pageIdx - 1) };
		},

		gotoRoute(artist) {
			this.$router.push({ name: "ar-detail", params: { artist } });
		},
	},

	watch: {
		filter() {
			this.getArtistsByCategory();
		},
	},

	async created() {
		this.initCategoryTabs();
		await this.getArtistsByCategory();
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.artists {
	margin-top: 20px;

	.category-tabs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 10px;
		justify-content: start;
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
				grid-template-columns: repeat(13, 30px);
				row-gap: 10px;
				justify-content: stretch;
			}
		}

		.area-tabs ul {
			display: grid;
			grid-template-columns: 50px 80px 80px 100px 80px 70px;
		}

		.type-tabs ul {
			display: grid;
			grid-template-columns: 50px 80px 80px 100px;
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

	.artists-cards {
		@include grid-align-cards(200px);
		margin-top: 20px;
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
	}
}
</style>
