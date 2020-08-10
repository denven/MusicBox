<template>
	<div class="playlists">
		<div class="special-recommend" v-if="bestLists.length > 0">
			<img class="backdrop" v-lazy="$helpers.getSmallPicture(bestLists[0].coverImgUrl, 200)" alt="" />
			<div class="backdrop-mask"></div>
			<div class="playlist-cover">
				<img v-lazy="$helpers.getSmallPicture(bestLists[0].coverImgUrl, 200)" alt="" />
			</div>
			<div class="playlist-detail" @click="gotoRoute(bestLists[0].id)">
				<span class="tag">Recommeded</span>
				<span class="caption">{{ bestLists[0].name }}</span>
				<div class="content">{{ bestLists[0].description }}</div>
			</div>
		</div>

		<div class="categories">
			<el-tabs v-model="activeTab">
				<el-tab-pane label="Language" name="language">
					<div class="sub-cats">
						<span
							@click="setCategory('language', item.name, index)"
							:class="{ active: catSelected === 'language' + index }"
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
							@click="setCategory('genre', item.name, index)"
							:class="{ active: catSelected === 'genre' + index }"
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
							@click="setCategory('occasion', item.name, index)"
							:class="{ active: catSelected === 'occasion' + index }"
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
							@click="setCategory('emotion', item.name, index)"
							:class="{ active: catSelected === 'emotion' + index }"
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
							@click="setCategory('subject', item.name, index)"
							class="sub-cat"
							:class="{ active: catSelected === 'subject' + index }"
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
				v-for="item in topLists"
				:key="item.id"
				:caption="item.copywriter"
				:picUrl="item.coverImgUrl"
				:playCount="item.playCount"
				:songName="item.name"
				@click.native="gotoRoute(item.id)"
			></PlaylistCard>
		</div>

		<el-pagination
			v-if="listsTotal > 0"
			background
			layout="prev, pager, next"
			:total="listsTotal"
			@current-change="setPageIndex"
		></el-pagination>
	</div>
</template>

<script>
import PlaylistCard from "@/components/pure-com/PlaylistCard";

import { getAllCategories, getBestPlaylists, getTopPlaylists } from "@/network/request";

export default {
	data() {
		return {
			bestLists: [],
			topLists: [],
			listsTotal: 0,

			// filter options
			filter: { cat: "全部", limit: 10, offset: 0 },
			categories: [],
			subCats: { language: [], genre: [], occasion: [], emotion: [], subject: [] },
			catSelected: "", // selected sub category
			activeTab: "language",
		};
	},

	components: {
		PlaylistCard,
	},

	methods: {
		setCategory(category, name, index) {
			if (this.catSelected == category + index) {
				this.catSelected = "";
				this.filter.cat = "全部";
			} else {
				this.catSelected = category + index;
				this.filter.cat = name;
			}

			this.filter = { ...this.filter };
			this.activeTab = category;
		},

		setPageIndex(pageIdx) {
			this.filter.offset = this.filter.limit * (pageIdx - 1);
			this.filter = { ...this.filter };
		},

		gotoRoute(id) {
			this.$router.push({ path: "/playlists/detail", query: { id } });
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

		async getBestLists(filter) {
			let { data } = await getBestPlaylists({ ...filter, limit: 1 });
			this.bestLists = data.playlists;
		},

		async getTopLists(filter) {
			let { data } = await getTopPlaylists(filter);
			this.topLists = data.playlists;
			this.listsTotal = data.total;
			console.log(this.topLists);
		},
	},

	watch: {
		async filter() {
			await this.getBestLists(this.filter);
			await this.getTopLists(this.filter);
		},
	},

	async created() {
		await this.getBestLists(this.filter);
		await this.getCategories();
		await this.getTopLists(this.filter);
	},
};
</script>

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
			cursor: pointer;
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
