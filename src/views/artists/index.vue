<template>
	<div class="artists">
		<div class="category-tabs">
			<div class="area-tabs">
				<span class="tab-label">Area:</span>
				<ul>
					<li
						v-for="(area, index) in areaTabs"
						:key="area"
						:class="{ active: index === activeIdx.area }"
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
						:class="{ active: index === activeIdx.type }"
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
						:class="{ active: index === activeIdx.initial }"
						@click="setFilter('initial', char, index)"
					>
						<span class="button">{{ char }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="artists-cards">
			<div class="artist-card" v-for="artist in artists" :key="artist.id">
				<img v-lazy="artist.img1v1Url" alt="" />

				<div class="artist-links">
					<span class="artist-name">{{ artist.name }}</span>
					<i class="iconfont icon-home_page" title="Personal Website"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getArtistsList,
	// getArtistTopTracks,
	// getArtistMvs,
	// getArtistAlbums,
	// getArtistDesc,
	// getSimilarArtists,
} from "@/network/request";

// const getArtistsList = ({ type, area, initial })

// const getArtistTopTracks = (id)
// const getArtistMvs = (id)
// const getArtistAlbums = ({ id, limit, offset })
// const getArtistDesc = (id)
// const getSimilarArtists = (id)

export default {
	data() {
		return {
			artists: [],
			// type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
			// area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
			filter: { type: -1, area: -1, initial: "A" },
			activeIdx: { area: 0, type: 0, initial: 0 },

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
			let { data } = await getArtistsList(this.filter);
			this.artists = data.artists;
			console.log("Test Artists ==========", this.artists);
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
				this.activeIdx.area = index;
			}
			console.log(tabType, keyword, index);
			if (tabType === "type" && this.typeTabs.includes(keyword)) {
				this.activeIdx.type = index;
			}

			if (tabType === "initial" && this.sortTabs.includes(keyword)) {
				this.activeIdx.initial = index;
				this.filter.initial = keyword;
			}

			this.indexToParams(this.activeIdx);
		},

		// DO NOT assign the prop value, the watcher cannot detect changes
		indexToParams(activeIdx) {
			// type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
			if (activeIdx.type === 0) {
				this.filter = { ...this.filter, type: -1 };
			} else {
				this.filter = { ...this.filter, type: activeIdx.type };
			}

			// area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他

			if (activeIdx.area === 0) this.filter = { ...this.filter, area: -1 };
			if (activeIdx.area === 1) this.filter = { ...this.filter, area: 96 };
			if (activeIdx.area === 2) this.filter = { ...this.filter, area: 7 };
			if (activeIdx.area === 3) this.filter = { ...this.filter, area: 8 };
			if (activeIdx.area === 4) this.filter = { ...this.filter, area: 16 };
			if (activeIdx.area === 5) this.filter = { ...this.filter, area: 0 };
		},
	},

	watch: {
		filter() {
			console.log("New filters:", this.filter);
			this.getArtistsByCategory();
		},
	},

	async created() {
		this.initCategoryTabs();
		await this.getArtistsByCategory();
	},

	mounted() {
		console.log("artists page mounted");
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
