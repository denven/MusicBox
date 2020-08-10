<template>
	<div class="playlist">
		<!-- Left Part -->
		<div class="pl-wrapper">
			<!-- Page Left Part contains three parts vertically -->
			<div class="top-info">
				<div class="pl-detail">
					<img class="pl-image" v-lazy="$helpers.getSmallPicture(info.coverImgUrl, 208)" alt="" />
					<div class="pl-details">
						<h3 class="name">{{ info.name }}</h3>
						<div class="creator">
							<img v-lazy="$helpers.getSmallPicture(creator.avatarUrl, 30)" alt="" class="avatar" />
							<span class="username">{{ creator.nickname }}</span>
							<span class="date"> created at {{ $helpers.formatTime(info.createTime) }}</span>
						</div>
						<GroupButtons
							:subCount="$helpers.encloseNumber(info.subscribedCount)"
							:shareCount="$helpers.encloseNumber(info.shareCount)"
							:commentCount="$helpers.encloseNumber(info.commentCount)"
						/>
						<Tags :size="'mini'" :data="info.tags" />

						<div class="description">Description: {{ info.description }}</div>
					</div>
				</div>
			</div>
			<!-- Left Middle Part: Playlist(tracks) -->
			<TracksTable :playCount="$helpers.formatNumberWithTS(info.playCount)" :tableData="tracks" />
			<!-- Left Bottom Part: Comments-->

			<div class="pl-comments">
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
		<!-- Right Part -->
		<div class="pl-related">
			<div class="people">
				<div class="title">Followers</div>
				<div class="avatars">
					<img
						v-for="person in subscribers"
						v-lazy="$helpers.getSmallPicture(person.avatarUrl, 40)"
						:title="person.nickname"
						alt=""
						:key="person.id"
					/>
				</div>
			</div>
			<div class="related" v-if="similarPls.length > 0">
				<div class="title">Similar Playlists</div>
				<div class="simi-pls">
					<div class="one-pl" v-for="pl in similarPls" :key="pl.id">
						<img v-lazy="$helpers.getSmallPicture(pl.coverImgUrl, 80)" alt="" />
						<div class="source">
							<span class="name">{{ pl.name }}</span>
							<span class="username">by {{ pl.creator.nickname }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getPlaylistDetail, getPlaylistComments, getSimilarPlaylists } from "@/network/request";
import GroupButtons from "@/components/pure-com/GroupButtons";
import Tags from "@/components/pure-com/Tags";
import TracksTable from "@/components/pure-com/TracksTable";
import Comment from "@/components/pure-com/Comment";

export default {
	data() {
		return {
			info: [],
			tracks: [],
			comments: [],
			creator: {},
			subscribers: [],
			similarPls: [], //similar playlists
		};
	},

	components: {
		Tags,
		GroupButtons,
		TracksTable,
		Comment,
	},

	methods: {
		async getPlaylistInfo(playlistId) {
			let { data } = await getPlaylistDetail({ id: playlistId });

			let {
				subscribedCount,
				createTime,
				updateTime,
				coverImgUrl,
				commentThreadId,
				trackUpdateTime,
				trackCount,
				playCount,
				description,
				name,
				id,
				shareCount,
				commentCount,
			} = data.playlist;

			this.info = {
				subscribedCount,
				createTime,
				updateTime,
				coverImgUrl,
				commentThreadId,
				trackUpdateTime,
				trackCount,
				playCount,
				description,
				name,
				id,
				shareCount,
				commentCount,
			};

			this.info.tags = data.playlist.tags; //array
			console.log(data.playlist.tags);
			this.tracks = [];

			data.playlist.tracks.forEach((item) => {
				let { name, id, dt: duration } = item;
				duration = this.$helpers.convertMsToMinutes(duration);
				let album = item.al.name;
				let artist = item.ar[0].name;
				let coverUrl = item.al.picUrl;
				this.tracks.push({ id, name, duration, album, artist, coverUrl });
			});

			let { avatarUrl, nickname, signature } = data.playlist.creator;
			this.creator = { avatarUrl, nickname, signature };

			data.playlist.subscribers.forEach((item) => {
				let { userId, avatarUrl, nickname, signature } = item;
				this.subscribers.push({ userId, avatarUrl, nickname, signature });
			});

			let res = await getSimilarPlaylists({ id: playlistId });
			this.similarPls = res.data.playlists;

			res = await getPlaylistComments({ id: playlistId });
			this.comments = res.data.comments;
		},
	},

	async created() {
		const playlistId = this.$route.query.id;
		await this.getPlaylistInfo(playlistId);
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.playlist {
	padding-top: 20px;
	@include flex-align(row, flex-start, flex-start);
}

// Left Part -- Top area styles
.pl-wrapper {
	flex: 1;

	.pl-detail {
		width: 800px;
		margin: 0 auto;
		@include flex-align(row, flex-start);

		.pl-image {
			margin-right: 15px;
			// border-radius: 3px;
		}

		.pl-details {
			height: 208px;
			padding: 3px 0;
			text-align: left;
			@include flex-align(column, space-between, flex-start);
			.name {
				font-weight: bold;
				padding-top: 3px;
			}

			.creator {
				@include flex-align(row, flex-start);
				font-size: 13px;
				img {
					border-radius: 50%;
				}
				span {
					padding-left: 10px;
				}
			}

			.description {
				font-size: 13px;
				line-height: 1.5;
				max-lines: 2;
				@include text-ellipsis-ml(2);
			}
		}
	}
}

// Left Part -- Bottome comments styles
.pl-comments {
	margin: 30px 0;
	text-align: left;
	.comments-title {
		margin: 10px 0;
		font-weight: bold;
	}
}

// Right Part styles
.pl-related {
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
		img {
			border-radius: 50%;
		}
		row-gap: 5px;
	}

	.related {
		margin-top: 20px;
		.one-pl {
			@include flex-align(row, flex-start);
			margin-bottom: 10px;

			img {
				width: 80px;
			}

			.source {
				height: 80px;
				padding: 5px 0 5px 10px;
				text-align: left;

				@include flex-align(column, space-between, flex-start);
				.name {
					font-size: 14px;
					font-weight: bold;
				}
				.username {
					font-size: 13px;
				}
			}
		}
	}

	// <div class="related" v-if="similarPls.length === 0">
	// 	<div class="title">Similar Playlists</div>
	// 	<div class="simi-pls">
	// 		<div class="one-pl" v-for="pl in simmilarPls" :key="pl.id">
	// 			<img v-lazy="$helpers.getSmallPicture(pl.coverImgUrl, 80)" alt="" />
	// 			<div class="source">
	// 				<span class="name">{{ pl.name }}</span>
	// 				<span class="username">{{ pl.creator.nickname }}</span>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
}
</style>
