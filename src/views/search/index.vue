<template>
	<!-- <el-tabs type="border-card"> -->
	<el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
		<el-tab-pane label="Tracks" name="tracks">
			<el-table
				:data="trackData"
				stripe
				style="width: 100%"
				:row-class-name="setRowIndex"
				@row-click="playAudio"
			>
				<!-- <el-table-column prop="no" label="No."> </el-table-column> -->
				<el-table-column type="index" widh="100px"> </el-table-column>
				<el-table-column prop="name" label="Tracks"> </el-table-column>
				<el-table-column prop="artist" label="Artist"> </el-table-column>
				<el-table-column prop="album" label="Album"> </el-table-column>
				<el-table-column prop="duration" label="Duration" width="100px">
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-tab-pane label="Videos" name="videos">Videos</el-tab-pane>
		<el-tab-pane label="Albums" name="albums">Albums</el-tab-pane>
		<el-tab-pane label="Artists" name="artists">Artists</el-tab-pane>
	</el-tabs>
</template>

<script>
import { getSearchResults, getAudioUrl } from "@/network/request";
import { convertMsToMinutes } from "@/common/helpers";

export default {
	data() {
		return {
			activeName: "tracks",
			trackData: [],
		};
	},

	methods: {
		handleTabClick(tab, event) {
			console.log(tab.name, event);
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
	},

	async created() {
		let { data } = await getSearchResults(this.$route.query);
		// console.log(this.$route.query);
		console.log(`new results`, data.result.songs);
		this.trackData = data.result.songs.map((song) => {
			let { id, name, artists, album, duration } = song;
			return {
				id,
				name,
				artist: artists[0].name,
				album: album.name,
				duration: convertMsToMinutes(duration),
			};
		});
	},
};
</script>

<style>
el-tabs {
	background-color: beige !important;
}
</style>
