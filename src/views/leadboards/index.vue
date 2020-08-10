<template>
	<div class="leadboards" ref="wrapper">
		<!-- Page Left Part contains three parts vertically -->
		<div class="leadboard-wrapper">
			<!-- Left Top Part: Playlist information -->
			<div class="leadboard-detail" v-if="leadboards.length > 0">
				<img class="leadboard-image" v-lazy="$helpers.getSmallPicture(curLb.coverImgUrl, 110)" alt="" />
				<div class="leadboard-details">
					<h3 class="name">{{ curLb.name }}</h3>
					<div class="update-time">
						<i class="iconfont icon-clock2"
							>{{ `最后更新: ` + $helpers.formatTime(curLb.updateTime) }}
							{{ $helpers.encloseNumber(curLb.updateFrequency) }}
						</i>
					</div>
					<div class="description">{{ curLb.description }}</div>

					<div class="social">
						<span class="play">
							<el-button size="mini" type="danger"> <i class="iconfont icon-bofang">Play</i> </el-button>
							<el-button size="mini" type="danger"> <i class="iconfont icon-Add"></i> </el-button>
						</span>
						<el-button size="mini">
							<i class="iconfont icon-shoucangjia2"> {{ $helpers.encloseNumber(curLb.subscribedCount) }}</i>
						</el-button>
						<el-button size="mini">
							<i class="iconfont icon-ArtboardCopy"> {{ $helpers.encloseNumber(curLb.shareCount) }}</i>
						</el-button>
						<el-button size="mini">
							<i class="iconfont icon-Clouddownload"> </i>
						</el-button>
						<el-button size="mini">
							<i class="iconfont icon-message">{{ $helpers.encloseNumber(curLb.commentCount) }}</i>
						</el-button>
					</div>
				</div>
			</div>

			<!-- Left Middle Part: Playlist(tracks) -->
			<div class="song-list">
				<div class="separator">
					<div>
						<span class="title">Tracks List</span><span class="song-count">{{ curLb.tracksCount + " tracks" }} </span>
					</div>
					<span class="play-count" v-if="curLb.playCount > 0">
						Played: <span class="font-bold">{{ $helpers.formatNumberWithTS(curLb.playCount) }}</span>
					</span>
				</div>

				<div class="songs-table">
					<el-table stripe style="width: 100%" :data="lbTracks">
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

			<!-- Left Bottom Part: Comments-->
		</div>

		<!-- Page Right Part -->
		<div class="leadboard-list">
			<div
				v-for="(item, index) in leadboards"
				class="leadboard-card"
				@click="setSelected(index)"
				:class="{ 'active-card': index == curSelected }"
				:key="item.updateTime"
			>
				<img class="leadbaord-cover" v-lazy="$helpers.getSmallPicture(item.coverImgUrl, 50)" alt="" />
				<div class="leadboard-desc">
					<div class="name">{{ item.name }}</div>
					<div class="update-freq">{{ item.updateFrequency }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAllLeadboards, getLeadboardDetail, getAudioUrl } from "@/network/request";

export default {
	data() {
		return {
			leadboards: [], // all leadboards
			curSelected: 15, // the 15th is US billboard by default
			curLb: {}, // current selected leadboard
			lbTracks: [], // tracks in selected leadboard
		};
	},

	methods: {
		setSelected(index) {
			this.curSelected = index;
			this.curLb = this.leadboards[index];
			this.$nextTick(() => {
				this.$refs.wrapper.scrollIntoView({ behavior: "smooth" });
			});
		},

		async getLeadboardDetail(id) {
			let { data } = await getLeadboardDetail({ id });
			let { shareCount, commentCount, playCount } = data.playlist;

			this.lbTracks = [];
			data.playlist.tracks.forEach((item) => {
				let { name, id, dt: duration } = item;
				duration = this.$helpers.convertMsToMinutes(duration);
				let album = item.al.name;
				let artist = item.ar[0].name;
				let coverUrl = item.al.picUrl;
				this.lbTracks.push({ id, name, duration, album, artist, coverUrl });
			});

			// Add more information to current leadboard (as the results from getAllLeadboards()
			// request doesn't contain the following attributes)
			this.curLb = { ...this.curLb, shareCount, commentCount, playCount, tracksCount: this.lbTracks.length };
		},

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

	watch: {
		async curSelected() {
			await this.getLeadboardDetail(this.curLb.id);
		},
	},

	async created() {
		let { data } = await getAllLeadboards();

		data.list.forEach((list) => {
			let {
				updateFrequency,
				trackUpdateTime,
				updateTime,
				trackCount,
				commentThreadId,
				coverImgUrl,
				description,
				trackNumberUpdateTime,
				playCount,
				subscribedCount,
				name,
				id,
				ToplistType,
			} = list;

			this.leadboards.push({
				updateFrequency,
				trackUpdateTime,
				updateTime,
				trackCount,
				commentThreadId,
				coverImgUrl,
				description,
				trackNumberUpdateTime,
				playCount,
				subscribedCount,
				name,
				id,
				ToplistType,
			});
		});

		// The featured page route is pushed with `params` not `query` option
		let routeLdId = this.$route.params.id || 0;

		for (const index in this.leadboards) {
			if (this.leadboards[index].id === +routeLdId) {
				this.curSelected = index;
				break;
			}
		}

		this.curLb = this.leadboards[this.curSelected];
		await this.getLeadboardDetail(this.curLb.id);
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.leadboards {
	padding-top: 20px;
	@include flex-align(row, flex-start, flex-start);
}

// Left Part -- Top area styles
.leadboard-wrapper {
	flex: 1;

	.leadboard-detail {
		width: 800px;
		margin: 0 auto;
		@include flex-align(row, flex-start);
	}

	.leadboard-image {
		margin-right: 15px;
	}

	.leadboard-details {
		height: 110px;
		padding: 3px 0;
		text-align: left;
		@include flex-align(column, space-between, flex-start);
		.name {
			font-weight: bold;
		}

		.update-time i::before {
			padding-left: 0 !important;
		}

		.update-time i,
		.description {
			font-size: 12px;
		}

		.social > span > button {
			padding: 7px 5px;
		}
		.social > span > button:nth-child(1) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		.social > span > button:nth-child(2) {
			margin-left: 0.8px;
			margin-right: 10px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
}

// Left Part -- Table area styles
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

// Right Part styles
.leadboard-list {
	width: 280px;
	padding-bottom: 20px;
	margin-left: 20px;

	.active-card {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.leadboard-card {
		@include flex-align(row, flex-start);
		margin-bottom: 10px;
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}

		img {
			padding-right: 10px;
		}

		.leadboard-desc {
			padding: 5px 0;
			height: 50px;
			font-size: 14px;

			@include flex-align(column, space-between, flex-start);
			.name {
				font-weight: 600;
			}
			.upate-freq {
				color: lightgray;
			}
		}
	}
}
</style>
