<template>
	<!-- <el-tabs type="border-card"> -->
	<el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
		<!-- First Tab's table list content -->
		<el-tab-pane label="Tracks" name="tracks">
			<el-table
				:default-sort="{ prop: 'publishTime', order: 'descending' }"
				:data="tracks.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
				@row-click="playAudio"
			>
				<template slot="empty">
					<p>Requesting Data...</p>
				</template>
				<!-- <el-table-column prop="no" label="No."> </el-table-column> -->
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="Track">
					<template slot-scope="scope">
						<i class="iconfont icon-bofang"></i>
						<span style="margin-left: 10px">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="artist" label="Artist"></el-table-column>
				<el-table-column prop="album" label="Album"></el-table-column>
				<el-table-column prop="publishTime" label="Year" sortable width="80px"></el-table-column>
				<el-table-column prop="duration" label="Duration" width="100px"></el-table-column>
			</el-table>
		</el-tab-pane>

		<el-tab-pane label="Videos" name="videos">
			<el-table
				:default-sort="{ prop: 'playCount', order: 'descending' }"
				:data="videos.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
				@row-click="playVideo"
			>
				<template slot="empty">
					<p>Requesting Data...</p>
				</template>

				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="Track">
					<template slot-scope="scope">
						<i class="iconfont icon-mv3"></i>
						<span style="margin-left: 10px">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="artistsNames" label="Artists" width="200px"></el-table-column>
				<el-table-column prop="briefDesc" label="Description" width="300px"></el-table-column>
				<el-table-column prop="playCount" label="Played" width="100px" sortable>
					<template slot-scope="scope">{{ $helpers.formatNumberWithTS(scope.row.playCount) }} </template>
				</el-table-column>
				<el-table-column prop="duration" label="Duration" width="80px"></el-table-column>
			</el-table>
		</el-tab-pane>

		<el-tab-pane label="Artists" name="artists">
			<div class="ar-cards">
				<ArtistCard
					v-for="item in artists.data"
					:key="item.id"
					:artistId="item.id"
					:name="item.name"
					:avatar="item.img1v1Url"
				/>
			</div>
		</el-tab-pane>

		<!-- { id, name, artist, picUrl, blurPicUrl, briefDesc, company, publishTime, }; -->
		<el-tab-pane label="Albums" name="albums">
			<div class="al-cards">
				<DiscCard
					v-for="item in albums.data"
					:key="item.id"
					:caption="item.copywriter"
					:picUrl="item.picUrl"
					:albumId="item.id"
					:songName="item.name"
				>
					<p class="artist">by: {{ item.artist }}</p>
				</DiscCard>
			</div>

			<!-- <el-pagination
				v-if="albums.data.length > 0"
				background
				layout="prev, pager, next"
				:total="listsTotal"
				@current-change="setPageIndex"
			></el-pagination> -->
		</el-tab-pane>

		<!-- id, name, cover: coverImgUrl, creator: creator.nickname, track: track.name,
    trackCount, description, bookCount, playCount,-->
		<el-tab-pane label="Playlists" name="playlists">
			<el-table
				:default-sort="{ prop: 'playCount', order: 'descending' }"
				:data="playlists.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
				@row-click="viewPlaylist"
			>
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="Name"></el-table-column>
				<el-table-column prop="creator" label="Creator" width="160px"></el-table-column>
				<el-table-column prop="track" label="Hit Track" width="240px"></el-table-column>
				<el-table-column prop="trackCount" label="Tracks" width="100px"></el-table-column>
				<el-table-column prop="bookCount" label="Suscribed" width="100px"></el-table-column>
				<el-table-column prop="playCount" label="Played" sortable width="150px">
					<template slot-scope="scope">{{ $helpers.formatNumberWithTS(scope.row.playCount) }} </template>
				</el-table-column>
			</el-table>
		</el-tab-pane>

		<!-- { id, name, djname, category, nickname, categoryId, createdTime, desc, picUrl, subCount,
    rcmdText, }-->
		<el-tab-pane label="Podcasts" name="podcasts">
			<el-table :data="podcasts.data" stripe style="width: 100%" :row-class-name="setRowIndex">
				<template slot="empty">
					<p>Requesting Data...</p>
				</template>
				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="Channel"></el-table-column>
				<el-table-column prop="djname" label="Creator"></el-table-column>
				<el-table-column prop="category" label="Category"></el-table-column>
				<el-table-column prop="picUrl" label="picUrl"></el-table-column>
			</el-table>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import { getSearchResults, getAudioUrl, getAudioDetail } from "@/network/request";
import DiscCard from "@/components/pure-com/DiscCard"; // for albums
import ArtistCard from "@/components/pure-com/ArtistCard";

export default {
	data() {
		return {
			activeTab: "tracks", // default tab
			keywords: "",
			tracks: { count: 0, data: [] },
			videos: { count: 0, data: [] },
			artists: { count: 0, data: [] },
			albums: { count: 0, data: [] },
			playlists: { count: 0, data: [] },
			podcasts: { count: 0, data: [] },
		};
	},

	components: {
		DiscCard,
		ArtistCard,
	},

	methods: {
		handleTabClick(tab, event) {
			console.log("switched to tab:", tab.name, event);
			// watch activeTab function can be put here
			return;
		},

		// record the row index here, as row click event don't pass row index by default
		setRowIndex({ row, rowIndex }) {
			row.index = rowIndex;
		},

		async playAudio({ index }) {
			try {
				let res = await Promise.all([
					Promise.resolve(getAudioUrl(this.tracks.data[index].id)),
					Promise.resolve(getAudioDetail(this.tracks.data[index].id)),
				]);

				const audioUrl = res[0].data.data[0].url;
				const { picUrl } = res[1].data.songs[0].al; //album pic
				const { name, artist } = this.tracks.data[index];
				console.log(name, artist, picUrl, audioUrl);
				if (!audioUrl) {
					return this.$message({
						showClose: true,
						message: "Sorry, this track is only available to VIP user！",
						type: "error",
						offset: 50,
					});
				} else {
					this.$store.state.song = {
						name,
						artist,
						audioUrl,
						picUrl,
					};
				}
			} catch (error) {
				console.log(error);
			}
		},

		playVideo({ index }) {
			let vid = this.videos.data[index].id;
			this.$router.push(`/videos/detail` + `?id=${vid}`);
		},

		viewPlaylist({ index }) {
			let id = this.playlists.data[index].id;
			this.$router.push(`/playlists/detail` + `?id=${id}`);
		},

		// keywords is this.$router.query
		async searchByType(typeName) {
			// 可选参数 :
			// limit : 返回数量 , 默认为 30
			// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
			// type: 搜索类型；默认为 1 即单曲 , 取值意义 :
			// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			let type = 1,
				limit = 30,
				offset = 0;
			switch (typeName) {
				case "tracks":
					type = 1;
					break;
				case "videos":
					type = 1004;
					break;
				case "playlists":
					type = 1000;
					break;
				case "artists":
					type = 100;
					break;
				case "albums":
					type = 10;
					break;
				case "podcasts":
					type = 1009;
					break;
				case "all":
					type = 1018;
					break;
				default:
					type = 1;
			}

			let params = { ...this.$route.query, offset, type, limit };
			let { data } = await getSearchResults(params);

			if (typeName === "tracks") {
				this.tracks.count = data.result.songs.length;
				this.tracks.data = data.result.songs.map((song) => {
					let { id, name, artists, album, duration } = song;
					console.log(song);
					return {
						id,
						name,
						artist: artists[0].name,
						album: album.name,
						publishTime: this.$helpers.formatTime(album.publishTime).slice(6, 10),
						duration: this.$helpers.convertMsToMinutes(duration),
					};
				});
			} else if (typeName === "videos") {
				this.videos.count = data.result.mvs.length;
				this.videos.data = data.result.mvs.map((mv) => {
					let { id, name, artists, cover, briefDesc, duration, playCount } = mv;
					let artistsNames = artists.reduce((allNames, item) => {
						allNames = allNames === "" ? item.name : allNames + "," + item.name;
						return allNames;
					}, "");
					duration = this.$helpers.convertMsToMinutes(duration);
					return {
						id,
						name,
						cover,
						artistsNames,
						briefDesc,
						duration,
						playCount,
					};
				});
			} else if (typeName === "playlists") {
				this.playlists.count = data.result.playlists.length;
				this.playlists.data = data.result.playlists.map((playlist) => {
					let { id, name, coverImgUrl, track, trackCount, creator, description, bookCount, playCount } = playlist;
					return {
						id,
						name,
						cover: coverImgUrl,
						creator: creator.nickname,
						track: track.name,
						trackCount,
						description,
						bookCount: this.$helpers.formatNumberWithTS(bookCount),
						playCount: playCount,
					};
				});
			} else if (typeName === "artists") {
				this.artists.count = data.result.artistCount;
				this.artists.data = data.result.artists.map((artist) => {
					let { id, name, picUrl, img1v1Url, mvSize, albumSize } = artist;
					console.log({ id, name, picUrl, img1v1Url, mvSize, albumSize });
					return { id, name, picUrl, img1v1Url, mvSize, albumSize };
				});
			} else if (typeName === "albums") {
				this.albums.count = data.result.albumCount;
				this.albums.data = data.result.albums.map((album) => {
					let { id, name, artist, picUrl, blurPicUrl, briefDesc, company, publishTime } = album;
					return {
						id,
						name,
						artist: artist.name,
						picUrl,
						blurPicUrl,
						briefDesc,
						company,
						publishTime,
					};
				});
			} else if (typeName === "podcasts") {
				this.podcasts.count = data.result.djRadiosCount;
				this.podcasts.data = data.result.djRadios.map((channel) => {
					let { id, dj, name, category, categoryId, createdTime, desc, picUrl, subCount, rcmdText } = channel;
					return {
						id,
						djname: dj.nickname,
						name,
						category,
						categoryId,
						createdTime,
						desc,
						picUrl,
						subCount,
						rcmdText,
					};
				});
			}
			// } else if (typeName === "all") {
			// }

			// console.log(typeName, data);
		},
	},

	watch: {
		// Update data when user inputs new keywords
		keywords() {
			// console.log(this.keywords);
			this.searchByType(this.activeTab);
		},

		// Update data when tab index changes
		activeTab() {
			this.searchByType(this.activeTab);
			this.$store.state.curSearchTab = this.activeTab;
		},
	},

	created() {
		// Receive pushed route params from user input (TheHeader.vue)
		this.keywords = this.$route.query;

		// use the store to remember current tab index for
		if (this.$store.state.curSearchTab != "tracks") {
			this.activeTab = this.$store.state.curSearchTab;
		}
	},

	destroyed() {
		// Let the initial search tab keep "tracks" search by default
		this.$store.state.curSearchTab = "tracks";
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

el-tabs {
	background-color: beige !important;
}

/deep/.el-table .cell {
	@include text-ellipsis;
}

.ar-cards {
	@include grid-align-cards(200px);
}

.al-cards {
	@include grid-align-cards(226px);
}

// td div {
//   @include text-ellipsis;
// }

// use this method to make style in effect
td i {
	color: $header-bg-color;
	cursor: pointer;
}
</style>
