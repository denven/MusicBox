<template>
	<!-- <el-tabs type="border-card"> -->
	<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
		<el-tab-pane label="Tracks" name="tracks">
			<el-table :data="tableData" stripe style="width: 100%">
				<!-- <el-table-column prop="no" label="No."> </el-table-column> -->
				<el-table-column type="index" :index="indexMethod" widh="100px">
				</el-table-column>
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
import { getSearchResults } from "@/network/request";
import { convertMsToMinutes } from "@/common/helpers";

export default {
	data() {
		return {
			activeName: "tracks",
			tableData: [],
		};
	},

	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
	},

	async created() {
		let { data } = await getSearchResults(this.$route.query);
		// console.log(this.$route.query);
		// console.log(`new results`, data.result.songs);
		this.tableData = data.result.songs.map((song) => {
			let { name, artists, album, duration } = song;
			return {
				name,
				artist: artists[0].name,
				album: album.name,
				duration: convertMsToMinutes(duration),
			};
		});
		console.log(this.tableData);
	},
};
</script>

<style></style>
