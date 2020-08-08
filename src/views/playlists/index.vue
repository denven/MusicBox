<template>
	<div class="playlists">
		<!-- <div class="backdrop" :style="{ background: `url(${bestLists[0].coverImgUrl}) no-repeat top center` }"></div> -->
		<div class="special-recommend">
			<img class="backdrop" v-lazy="bestLists[0].coverImgUrl" alt="" />
			<div class="backdrop-mask"></div>
			<div class="playlist-cover">
				<img v-lazy="$helpers.getSmallPicture(bestLists[0].coverImgUrl, 200)" alt="" />
			</div>
			<div class="playlist-detail">
				<span class="tag">Recommeded Playlist</span>
				<span class="caption">{{ bestLists[0].name }}</span>
				<div class="content">{{ bestLists[0].description }}</div>
			</div>
		</div>

		<div class="categories">
			<el-tabs>
				<el-tab-pane label="Language" name="language">
					<div class="sub-cats">
						<span
							@click="setCategory('language', index)"
							:class="{ active: curSelected === 'language' + index }"
							class="sub-cat"
							v-for="(item, index) in subCats.language"
							:key="item.name"
							>{{ item.name }}</span
						>
					</div>
				</el-tab-pane>

				<el-tab-pane label="Genre" name="genre">
					<div class="sub-cats">
						<span
							@click="setCategory('genre', index)"
							:class="{ active: curSelected === 'genre' + index }"
							class="sub-cat"
							v-for="(item, index) in subCats.genre"
							:key="item.name"
							>{{ item.name }}</span
						>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Occasion" name="occasion">
					<div class="sub-cats">
						<span
							@click="setCategory('occasion', index)"
							:class="{ active: curSelected === 'occasion' + index }"
							class="sub-cat"
							v-for="(item, index) in subCats.occasion"
							:key="item.name"
							>{{ item.name }}</span
						>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Emotion" name="emotion">
					<div class="sub-cats">
						<span
							@click="setCategory('emotion', index)"
							:class="{ active: curSelected === 'emotion' + index }"
							class="sub-cat"
							v-for="(item, index) in subCats.emotion"
							:key="item.name"
							>{{ item.name }}</span
						>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Subject" name="subject">
					<div class="sub-cats">
						<span
							@click="setCategory('subject', index)"
							class="sub-cat"
							:class="{ active: curSelected === 'subject' + index }"
							v-for="(item, index) in subCats.subject"
							:key="item.name"
							>{{ item.name }}</span
						>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="cards">
			<PlaylistCard
				v-for="item in toplist"
				:key="item.id"
				:caption="item.copywriter"
				:picUrl="item.coverImgUrl"
				:playCount="item.playCount"
				:songName="item.name"
			></PlaylistCard>
		</div>

		<el-pagination
			background
			layout="prev, pager, next"
			:total="listsTotal"
			@current-change="setPageIndex"
		></el-pagination>
	</div>
</template>

<script>
import PlaylistCard from "@/components/pure-com/PlaylistCard";

import { getFeaturedList, getAllCategories, getBestPlaylists, getTopPlaylists } from "@/network/request";

export default {
	data() {
		return {
			bestLists: [],
			toplist: [],
			listsTotal: 0,
			pageIdx: 1,

			// filter options
			categories: [],
			subCats: { language: [], genre: [], occasion: [], emotion: [], subject: [] },
			curSelected: "",
		};
	},

	components: {
		PlaylistCard,
	},

	methods: {
		setCategory(category, index) {
			this.curSelected = category + index;
		},

		async getCategories() {
			let res = await getAllCategories();
			let { categories, sub } = res.data;
			this.categories = categories;

			sub.forEach((item) => {
				if (item.category === 0) {
					this.subCats["language"].push(item);
				}
				if (item.category === 1) {
					this.subCats["genre"].push(item);
				}

				if (item.category === 2) {
					this.subCats["occasion"].push(item);
				}

				if (item.category === 3) {
					this.subCats["emotion"].push(item);
				}

				if (item.category === 4) {
					this.subCats["subject"].push(item);
				}
			});
		},

		async getBestLists() {
			let { data } = await getBestPlaylists();
			this.bestLists = data.playlists;
			console.log("best", data);
		},

		async getTopLists() {
			let { data } = await getTopPlaylists();
			this.toplist = data.playlists;
			this.listsTotal = data.total;
			console.log("list", this.listsTotal, data);
		},

		setPageIndex(pageIdx) {
			this.pageIdx = pageIdx;
			// this.filter = { ...this.filter, offset: this.filter.limit * (pageIdx - 1) };
		},
	},

	async created() {
		let { data } = await getFeaturedList();
		await this.getCategories();
		await this.getTopLists();
		await this.getBestLists();
		console.log(`toplist`, data.result);
		// this.toplist = data.result;
	},
};
</script>

// scoped is needed here
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.special-recommend {
	width: 100%;
	height: 200px;
	padding: 20px;

	position: relative;
	overflow: hidden;

	.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 0;

		filter: blur(20px);
	}

	.backdrop-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	@include flex-align(row, flex-start);
	.playlist-cover {
		img {
			width: 160px;
		}
		z-index: 1;
	}

	.playlist-detail {
		flex: 1;
		height: 100%;
		margin-left: 20px;
		z-index: 1;
		color: rgb(190, 184, 184);

		@include flex-align(column, space-between, flex-start);

		.tag {
			width: 200px;
			height: 35px;
			line-height: 35px;
			border-radius: 5px;
			border: 1px solid grey;
			font-weight: bold;
			color: goldenrod;
		}

		.caption {
			height: 35px;
			padding: 5px 0;
			line-height: 35px;
			font-weight: bold;
			color: white;
		}

		.content {
			width: 100%;
			height: 110px;
			padding-top: 5px;
			line-height: 1.5;
			font-size: 14px;
			text-align: left;
			@include text-ellipsis-ml(4);
		}
	}
}

.sub-cats {
	@include flex-align(row, flex-start);
	.sub-cat {
		padding-right: 15px;
		font-size: 14px;
		color: grey;
		cursor: pointer;
	}

	.active {
		color: $theme-primary-color;
	}
}

.cards {
	// @include flex-align(row, space-between, center, wrap);
	@include grid-align-cards();
}
</style>
