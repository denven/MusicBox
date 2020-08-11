<template>
	<div class="leadboards" ref="wrapper">
		<!-- Page Left Part contains three parts vertically -->
		<div class="leadboard-wrapper">
			<!-- Left Top Part: Playlist information -->
			<div class="leadboard-detail" v-if="leadboards.length > 0">
				<div class="img-wrapper">
					<img class="leadboard-image" v-lazy="$helpers.getSmallPicture(curLb.coverImgUrl, 110)" alt="" />
				</div>
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
			<TracksTable :showTitle="true" :playCount="$helpers.formatNumberWithTS(curLb.playCount)" :tableData="lbTracks" />

			<!-- Left Bottom Part: Comments-->
			<div class="ld-comments">
				<h1 class="comments-title">{{ comments.length + " Comments" }}</h1>
				<Comment
					v-for="item in comments"
					:key="item.time"
					:content="item.content"
					:name="item.user.nickname"
					:avatar="item.user.avatarUrl"
					:likedCount="item.likedCount"
					:time="item.time"
				></Comment>
			</div>
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
import { getAllLeadboards, getPlaylistDetail, getPlaylistComments, getAudioUrl } from "@/network/request";
import TracksTable from "@/components/pure-com/TracksTable";

import Comment from "@/components/pure-com/Comment";

export default {
	data() {
		return {
			leadboards: [], // all leadboards
			curSelected: 15, // the 15th is US billboard by default
			curLb: {}, // current selected leadboard
			lbTracks: [], // tracks in selected leadboard
			comments: [],
		};
	},

	components: {
		Comment,
		TracksTable,
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
			let { data } = await getPlaylistDetail({ id });
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

		async getLeadboardComments(id) {
			let { data } = await getPlaylistComments({ id });
			this.comments = data.comments;
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
			await this.getLeadboardComments(this.curLb.id);
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
		await this.getLeadboardComments(this.curLb.id);
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

	.img-wrapper {
		width: 110px;
		height: 110px;
		margin-right: 15px;
	}

	// .leadboard-image {
	// 	margin-right: 15px;
	// }

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

// Left Part -- Bottome comments styles
.ld-comments {
	margin: 30px 0;
	text-align: left;
	.comments-title {
		margin: 10px 0;
		font-weight: bold;
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
