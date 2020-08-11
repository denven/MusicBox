<template>
	<div class="song-list">
		<div class="separator">
			<div>
				<span class="title">Tracks List</span><span class="song-count">{{ tableData.length + " tracks" }} </span>
			</div>
			<span class="play-count" v-if="playCount > 0">
				Played: <span class="font-bold">{{ playCount }}</span>
			</span>
		</div>

		<div class="songs-table">
			<el-table stripe style="width: 100%" :data="tableData">
				<!-- Mask and replace the default hint text -->
				<template slot="empty">
					<p>Requesting Data...</p>
				</template>

				<el-table-column type="index" width="50"></el-table-column>
				<el-table-column prop="name" label="Track">
					<template class="name-wrapper" slot-scope="scope">
						<img v-lazy="$helpers.getSmallPicture(scope.row.coverUrl, 50)" alt="" />
						<span class="name" style="margin-left: 10px">{{ scope.row.name }}</span>
						<div class="buttons">
							<i class="iconfont icon-bofang1" @click="playAudio(scope.row)"></i>
							<i class="iconfont icon-add1"></i>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="album" label="Album" width="220px"></el-table-column>
				<el-table-column prop="artist" label="Artist" width="150px"></el-table-column>
				<el-table-column prop="duration" label="Duration" width="80px"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { getAudioUrl } from "@/network/request";

export default {
	name: "TracksTable",
	props: ["playCount", "tableData"],
	methods: {
		async playAudio(track) {
			try {
				let { data } = await getAudioUrl(track.id);
				const audioUrl = data.data[0].url;

				if (!audioUrl) {
					return this.$message({
						showClose: true,
						message: "Sorry, this track is only available to VIP user！",
						type: "error",
						offset: 50,
					});
				} else {
					this.$store.state.song = {
						name: track.name,
						artist: track.artist,
						audioUrl,
						picUrl: track.coverUrl,
					};
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.song-list {
	width: 100%;
	margin-bottom: 20px;

	.separator {
		height: 50px;
		padding: 5px;
		margin-top: 20px;
		border-bottom: 2px solid $theme-primary-color;
		@include flex-align(row, space-between);
		div > .title {
			font-size: 20px;
			font-weight: bold;
		}
		div > .song-count {
			font-size: 12px;
			padding-left: 10px;
		}
		.play-count {
			font-size: 12px;
			span {
				color: $theme-primary-color;
				font-weight: bold;
			}
		}
	}

	/deep/tr td:nth-child(2) .cell {
		@include flex-align(row, flex-start, center);
		img {
			width: 50px;
		}

		&:hover {
			cursor: pointer;
			.name {
				text-decoration: underline;
			}
		}

		.name {
			flex: 1;
		}
		.buttons {
			width: 100px;
			padding: 0 10px;
			i {
				padding: 0 5px;
				&:nth-child(1) {
					color: $theme-primary-color;
				}
			}
		}
	}
}
</style>
