<template>
	<!-- <el-tabs type="border-card"> -->
	<el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
		<el-tab-pane label="Tracks" name="tracks">
			<el-table
				:data="tracks.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
				@row-click="playAudio"
			>
				<!-- <el-table-column prop="no" label="No."> </el-table-column> -->
				<el-table-column type="index" widh="100px"> </el-table-column>
				<el-table-column prop="name" label="Track"> </el-table-column>
				<el-table-column prop="artist" label="Artist"> </el-table-column>
				<el-table-column prop="album" label="Album"> </el-table-column>
				<el-table-column prop="duration" label="Duration" width="100px">
				</el-table-column>
			</el-table>
		</el-tab-pane>

		<el-tab-pane label="Videos" name="videos">
			<el-table
				:data="videos.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
			>
				<el-table-column type="index" widh="100px"> </el-table-column>
				<el-table-column prop="name" label="Track"> </el-table-column>
				<el-table-column prop="artistsNames" label="Artists"> </el-table-column>
				<el-table-column prop="briefDesc" label="Description">
				</el-table-column>
				<el-table-column prop="playCount" label="Played" width="150px">
				</el-table-column>
				<el-table-column prop="duration" label="Duration" width="100px">
				</el-table-column>
			</el-table>
		</el-tab-pane>

		<el-tab-pane label="Artists" name="artists">Artists</el-tab-pane>
		<el-tab-pane label="Albums" name="albums">Albums</el-tab-pane>

		<!-- id, name, cover: coverImgUrl, creator: creator.nickname, track: track.name,
		trackCount, description, bookCount, playCount, -->
		<el-tab-pane label="Playlists" name="playlists">
			<el-table
				:data="playlists.data"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
			>
				<el-table-column type="index" widh="100px"> </el-table-column>
				<el-table-column prop="name" label="Name"> </el-table-column>
				<el-table-column prop="creator" label="Creator"> </el-table-column>
				<el-table-column prop="track" label="Track"> </el-table-column>
				<el-table-column prop="trackCount" label="Tracks" width="100px">
				</el-table-column>
				<el-table-column prop="bookCount" label="Suscribed" width="100px">
				</el-table-column>
				<el-table-column prop="playCount" label="Played" width="150px">
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-tab-pane label="Podcasts" name="podcasts">Podcasts</el-tab-pane>
	</el-tabs>
</template>

<script>
import { getSearchResults, getAudioUrl } from "@/network/request";
import { convertMsToMinutes } from "@/common/helpers";

export default {
	data() {
		return {
			activeTab: "tracks", // default tab
			keywords: "",
			tracks: { count: 0, data: [] },
			videos: { count: 0, data: [] },
			playlists: { count: 0, data: [] },
		};
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
			const { data: audio } = await getAudioUrl(this.trackData[index].id);
			if (!audio.data[0].url) {
				return this.$message.error(
					"This track is only available to VIP user！"
				);
			} else {
				this.$store.state.audioUrl = audio.data[0].url;
			}
		},

		// keywords is this.$router.query
		async searchByType(typeName) {
			// 可选参数 :
			// limit : 返回数量 , 默认为 30
			// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
			// type: 搜索类型；默认为 1 即单曲 , 取值意义 :
			// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			console.log("search by type:----------", typeName);
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
					return {
						id,
						name,
						artist: artists[0].name,
						album: album.name,
						duration: convertMsToMinutes(duration),
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
					duration = convertMsToMinutes(duration);
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
					let {
						id,
						name,
						coverImgUrl,
						track,
						trackCount,
						creator,
						description,
						bookCount,
						playCount,
					} = playlist;
					return {
						id,
						name,
						cover: coverImgUrl,
						creator: creator.nickname,
						track: track.name,
						trackCount,
						description,
						bookCount,
						playCount,
					};
				});
			}
			// } else if (typeName === "artists") {
			// } else if (typeName === "albums") {
			// } else if (typeName === "podcasts") {
			// } else if (typeName === "all") {
			// }

			console.log(typeName, data);
		},
	},

	watch: {
		// Update data when user inputs new keywords
		keywords() {
			console.log(this.keywords);
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

<style>
el-tabs {
	background-color: beige !important;
}
</style>
