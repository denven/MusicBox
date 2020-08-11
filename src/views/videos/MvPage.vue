<template>
	<div class="mv-wrapper content-vertical-align">
		<div class="mv">
			<div class="mv-player">
				<video controls autoplay :src="mv.mvUrl" ref="video"></video>
			</div>

			<div class="basic-info">
				<h1 class="video-name">{{ mv.name }}</h1>
				<div class="video-meta">
					<span class="views">{{ mv.playCount }}</span> •
					<span class="publish-date">{{ mv.publishTime }}</span>
				</div>
			</div>

			<div class="mv-detail">
				<div class="mv-channel">
					<div class="mv-owner">
						<div class="avatar">
							<img class="user-avarta" :src="mv.artistAvatar" alt />
						</div>
					</div>
					<div class="owner-name">{{ mv.artistName }}</div>

					<div class="subscribe">
						<el-button type="danger">Subscribe</el-button>
					</div>
				</div>
				<div class="mv-desc">{{ mv.desc }}</div>
			</div>

			<div class="mv-comments">
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

		<div class="related-mvs">
			<div class="one-mv" v-for="item in similarMvs" :key="item.id">
				<MvCard
					:height="'120px'"
					:caption="item.copywriter"
					:picUrl="item.cover"
					:playCount="item.playCount"
					:mvId="item.id"
					:duration="$helpers.convertMsToMinutes(item.duration)"
				></MvCard>

				<div class="mv-source">
					<span class="name">{{ item.name }}</span>
					<span class="channel">{{ "by " + item.artistName }}</span>
					<div class="views-date">
						<span class="views">{{ $helpers.formatNumberWithTS(item.playCount) + ` views` }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Comment from "@/components/pure-com/Comment";
import MvCard from "@/components/pure-com/MvCard";

import {
	getMvUrl,
	getMvDetail,
	getSimilarMvs,
	getMvComments,
	getMvArtistV2,
	getVideoUrl,
	getVideoDetail,
	getSimilarVideos,
} from "@/network/request";

export default {
	name: "mv",
	data() {
		return {
			mv: {}, // current Mv
			similarMvs: [],
			comments: [],
		};
	},

	components: {
		Comment,
		MvCard,
	},

	methods: {
		async getMvInfo(mvid) {
			try {
				let allMvData = await Promise.all([
					Promise.resolve(getMvUrl(mvid)),
					Promise.resolve(getMvDetail(mvid)),
					Promise.resolve(getSimilarMvs(mvid)),
					Promise.resolve(getMvComments(mvid)),
				]);

				const mvUrl = allMvData[0].data.data.url;
				console.log(allMvData[0].data.data.url);
				const { name, artistName, publishTime, playCount, desc } = allMvData[1].data.data;

				let { data: artistData } = await getMvArtistV2(allMvData[1].data.data.artists[0].id);

				let mvObj = {
					mvUrl,
					name,
					artistName,
					artistAvatar: artistData.artist.img1v1Url,
					publishTime,
					playCount,
					desc,
				};

				this.mv = {
					...mvObj,
					playCount: this.$helpers.formatNumberWithTS(playCount) + ` views`,
				};

				this.similarMvs = allMvData[2].data.mvs;
				this.comments = allMvData[3].data.comments;
			} catch {
				(err) => console.log("Request error when getting Mv Details", err);
			}
		},

		//TODO
		async getVideoInfo(vid) {
			try {
				let allMvData = await Promise.all([
					Promise.resolve(getVideoUrl(vid)),
					Promise.resolve(getVideoDetail(vid)),
					Promise.resolve(getSimilarVideos(vid)),
					// Promise.resolve(getVideoSocialInfo(vid)),
				]);

				console.log("=======================", allMvData);
			} catch {
				(err) => console.log("Request error when getting Mv Details", err);
			}
		},
	},

	async created() {
		const mvid = this.$route.query.id;
		await this.getMvInfo(mvid);
	},

	watch: {
		$route: async function(cur) {
			const mvid = cur.query.id;
			await this.getMvInfo(mvid);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/universal.scss";
@import "@/assets/styles/mixin.scss";

.mv-wrapper {
	@include flex-align(row, space-between, flex-start);

	.mv {
		width: 65%;
		min-width: 300px;
		margin: 20px 20px 20px 0;
		text-align: left;

		.mv-player {
			width: 100%;
			border-radius: 4px;

			video {
				@extend .mv-player;
				overflow: hidden;
				object-fit: cover;
				outline: none;
				border: none;
			}
		}

		.basic-info {
			padding: 20px 0 10px 0;
			border-bottom: 1px solid lightgrey;
			.video-name {
				padding-bottom: 15px;
				font-weight: bold;
			}
			.video-meta {
				font-size: 14px;
				color: #bebebe;
			}
		}

		.mv-detail {
			display: grid;
			margin: 20px 0;
			padding-bottom: 20px;
			grid-template-rows: 50px minmax(30px, 100px);
			grid-template-columns: 50px 1fr;
			grid-gap: 10px;

			border-bottom: 1px solid lightgrey;

			.mv-channel {
				grid-row: 1/2;
				grid-column: 1/4;

				display: grid;
				grid-template-columns: 50px 1fr 120px;

				grid-gap: 10px;
				align-items: center;

				.mv-owner {
					grid-column: 1/2;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;

					img {
						width: 100%;
					}
				}

				.owner-name {
					grid-column: 2/3;
				}

				.subscribe {
					text-align: right;
					grid-column: 3/4;
				}
			}

			.mv-desc {
				grid-column: 2/4;
				grid-row: 2/3;
				font-size: 14px;
				line-height: 1.5;
				@include text-ellipsis-ml(5);
			}
		}

		.mv-comments {
			margin: 20px 0;
			.comments-title {
				margin: 10px 0;
				font-weight: bold;
			}
		}
	}

	.related-mvs {
		flex: 1;
		min-width: 400px;
		.one-mv {
			@include flex-align(row, space-between);
			width: 100%;

			&:first-child {
				margin-top: 20px;
			}

			.mv-card {
				min-width: 160px;
				max-width: 200px;
			}
			.mv-source {
				flex: 1;
				height: 136px;
				padding: 3px 0 20px 8px;
				text-align: left;
				font-size: 14px;

				@include flex-align(column, space-between, flex-start);
				.name {
					font-weight: bold;
				}
			}
		}
	}
}
</style>
