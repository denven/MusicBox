<template>
	<div class="artist">
		<div class="left-part">
			<div class="artist-name" v-if="Object.keys(artist).length > 0">
				<span class="name">{{ artist.name }}</span>
				<span class="alias">{{ artist.alias.join(",") }}</span>

				<div class="photo">
					<img v-lazy="$helpers.getSmallPicture(artist.picUrl, 640, 300)" alt="" />
				</div>
			</div>

			<el-tabs type="border-card">
				<el-tab-pane label="Tracks(Top 50)">
					<TracksTable :showTitle="false" :tableData="topTracks" />
				</el-tab-pane>

				<el-tab-pane :label="labelNames[1]">
					<div class="al-cards">
						<DiscCard
							v-for="item in curPageAlbs"
							:key="item.id"
							:caption="item.copywriter"
							:picUrl="item.blurPicUrl"
							:songName="item.name"
						>
						</DiscCard>
					</div>

					<div class="pagination">
						<el-pagination
							v-if="allAlbums.length > ALS_PAGE_SIZE"
							background
							layout="prev, pager, next"
							:page-size="ALS_PAGE_SIZE"
							:total="allAlbums.length"
							@current-change="setAlbumsPage"
						></el-pagination>
					</div>
				</el-tab-pane>

				<el-tab-pane :label="labelNames[2]">
					<div class="mv-cards">
						<MvCard
							v-for="item in curPageMvs"
							:key="item.id"
							:height="'120px'"
							:picUrl="item.imgurl16v9"
							:playCount="item.playCount"
							:mvName="item.name"
							:mvId="item.id"
							:duration="$helpers.convertMsToMinutes(item.duration)"
						>
						</MvCard>
					</div>

					<div class="pagination">
						<el-pagination
							v-if="relatedMvs.length > MVS_PAGE_SIZE"
							background
							layout="prev, pager, next"
							:page-size="MVS_PAGE_SIZE"
							:total="relatedMvs.length"
							@current-change="setMvsPage"
						></el-pagination>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Introduction">
					<div class="introduction" v-for="item in introduction" :key="item.ti">
						<h4 class="intro-title">{{ item.ti }}</h4>
						<p class="intro-text" v-html="item.txt.replace(/\n/g, '<br />')"></p>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>

		<!-- Right Part: similar singers -->
		<div class="right-part">
			<div class="top-singers">
				<div class="title">Top 50 Artists</div>
				<div class="avatars">
					<img
						v-for="artist in topArtists"
						v-lazy="$helpers.getSmallPicture(artist.img1v1Url, 40)"
						:title="artist.name"
						alt=""
						:key="artist.id"
						@click="gotoRoute(artist.id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getArtistDesc, getArtistTopTracks, getArtistAlbums, getArtistMvs, getTopArtists } from "@/network/request";
import TracksTable from "@/components/pure-com/TracksTable";
import DiscCard from "@/components/pure-com/DiscCard";
import MvCard from "@/components/pure-com/MvCard";

export default {
	data() {
		return {
			artist: {},
			introduction: [],
			topTracks: [],
			allAlbums: [],
			curPageAlbs: [],
			ALS_PAGE_SIZE: 15, // default albums page size

			relatedMvs: [],
			curPageMvs: [],
			MVS_PAGE_SIZE: 16, // default mvs page size

			detailedDesc: "",
			topArtists: [], // related artists

			labelNames: ["Tracks(Top 50)", "Albums", "Music Videos", "Introduction"],
		};
	},

	components: {
		TracksTable,
		DiscCard,
		MvCard,
	},

	methods: {
		gotoRoute(id) {
			this.$router.push({ path: "/artists/detail", query: { id } });
		},

		setAlbumsPage(page) {
			if (page < 1) return;
			this.curPageAlbs = this.allAlbums.slice((page - 1) * this.ALS_PAGE_SIZE, page * this.ALS_PAGE_SIZE);
		},

		setMvsPage(page) {
			if (page < 1) return;
			this.curPageMvs = this.relatedMvs.slice((page - 1) * this.MVS_PAGE_SIZE, page * this.MVS_PAGE_SIZE);
		},
	},

	async created() {
		this.artist = this.$route.query.artist;

		let {
			data: { briefDesc, introduction },
		} = await getArtistDesc(this.artist.id);
		this.introduction = introduction;
		if (briefDesc) this.introduction.unshift({ ti: "简介", txt: briefDesc });

		let { data } = await getArtistTopTracks(this.artist.id);
		data.songs.forEach((item) => {
			let { name, id, dt: duration } = item;
			duration = this.$helpers.convertMsToMinutes(duration);
			let album = item.al.name;
			let artist = item.ar[0].name;
			let coverUrl = item.al.picUrl;
			this.topTracks.push({ id, name, duration, album, artist, coverUrl });
		});

		let {
			data: { hotAlbums },
		} = await getArtistAlbums({ id: this.artist.id, limit: 200 });
		this.allAlbums = hotAlbums;
		this.curPageAlbs = hotAlbums.slice(0, this.ALS_PAGE_SIZE);

		if (hotAlbums.length > 0) {
			this.labelNames[1] = "Albums" + `(${hotAlbums.length})`;
		}

		let {
			data: { mvs },
		} = await getArtistMvs({ id: this.artist.id, limit: 100 });
		this.relatedMvs = mvs;
		this.curPageMvs = mvs.slice(0, this.MVS_PAGE_SIZE);
		if (mvs.length > 0) {
			this.labelNames[2] = "Music Videos" + `(${mvs.length})`;
		}

		// The API to request similar artists doesn't response
		// let { data: ars } = await getSimilarArtists(this.artist.id);
		let {
			data: { artists },
		} = await getTopArtists();
		this.topArtists = artists;
		console.log(artists);
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.artist {
	padding-top: 20px;
	@include flex-align(row, flex-start, flex-start);
}

.left-part {
	flex: 1;
	text-align: left;

	.artist-name {
		.name {
			font-size: 24px;
			font-weight: bold;
		}
		.alias {
			font-size: 16px;
			padding-left: 5px;
		}

		.photo {
			margin-top: 10px;
			width: 100%;
			height: 300px;
			background-color: rgba(0, 0, 0, 0.2);
			text-align: center;
			img {
				width: 640px;
				height: 300px;
			}
		}
	}

	.al-cards {
		@include grid-align-cards(226px, 10px);
		text-align: center;
	}

	.mv-cards {
		@include grid-align-cards(200px, 10px);
		row-gap: 15px;
		text-align: center;
	}

	.pagination {
		text-align: center;
	}

	.introduction {
		.intro-title {
			font-size: 14px;
			font-weight: bold;
			border-left: 3px solid $theme-primary-color;
			padding-left: 10px;
		}
		.intro-text {
			margin: 10px 0;
			font-size: 12px;
			line-height: 2;
		}
	}
}

// Right Part styles
.right-part {
	width: 280px;
	padding-bottom: 20px;
	margin-left: 20px;

	.title {
		font-size: 13px;
		font-weight: bold;
		text-align: left;
		padding-bottom: 10px;
		border-bottom: 1.5px solid gray;
		margin-bottom: 10px;
	}

	.avatars {
		width: 100%;
		@include grid-align-cards(40px, 5px);
		row-gap: 5px;
		img {
			cursor: pointer;
		}
	}
}
</style>
