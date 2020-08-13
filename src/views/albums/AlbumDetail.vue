<template>
	<div class="album">
		<!-- Left Part -->
		<div class="al-wrapper">
			<!-- Page Left Part contains three parts vertically -->
			<div class="top-info">
				<div class="al-detail">
					<DiscCard :picUrl="info.blurPicUrl" :albumId="info.id" />
					<div class="al-info">
						<h3 class="name">{{ info.name }}</h3>
						<div class="artist">
							<img class="avatar" v-lazy="$helpers.getSmallPicture(info.avatarUrl, 30)" alt="" />
							<span class="ar-name"> {{ info.arName }}</span>
						</div>
						<div class="date" v-if="info.publishTime">Published at: {{ $helpers.formatTime(info.publishTime) }}</div>
						<div class="company" v-if="info.company">Company: {{ info.company }}</div>
						<GroupButtons
							:subCount="$helpers.encloseNumber(info.likedCount)"
							:shareCount="$helpers.encloseNumber(info.shareCount)"
							:commentCount="$helpers.encloseNumber(info.commentCount)"
						/>
					</div>
				</div>
				<div class="al-desc" v-if="info.description">
					<div :class="{ 'text show-more': btnData.bshow, text: !btnData.bshow }">
						<span class="title">Description:</span>
						{{ info.description }}
					</div>
					<el-button size="mini" type="success" v-if="btnData.bShow" @click="showMore">{{ btnData.text }} </el-button>
				</div>
			</div>

			<!-- Left Middle Part: album(tracks) -->
			<TracksTable :showTitle="true" :tableData="tracks" />

			<!-- Left Bottom Part: Comments-->
			<div class="al-comments">
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
		<div class="al-related">
			<!-- <div class="people">
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
			</div> -->
			<div class="related" v-if="otherAlbums.length > 0">
				<div class="title">
					Other Albums from <span> {{ info.arName }}</span>
				</div>
				<div class="other-als">
					<div class="one-al" v-for="al in otherAlbums" :key="al.id" @click="gotoRoute(al.id)">
						<img v-lazy="$helpers.getSmallPicture(al.picUrl, 80)" alt="" />
						<div class="source">
							<span class="name">{{ al.name }}</span>
							<span class="date">Date: {{ $helpers.formatTime(al.publishTime).slice(0, 10) }}</span>
							<span class="company" v-if="al.company">Company: {{ al.company }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAlbumComments, getAlbumTracks, getArtistAlbums } from "@/network/request";
import DiscCard from "@/components/pure-com/DiscCard";
import GroupButtons from "@/components/pure-com/GroupButtons";
import TracksTable from "@/components/pure-com/TracksTable";
import Comment from "@/components/pure-com/Comment";

export default {
	data() {
		return {
			info: [],
			tracks: [],
			comments: [],
			subscribers: [],
			otherAlbums: [],
			albumId: 0,
			btnData: { bShow: false, text: "Unflod" },
		};
	},

	components: {
		DiscCard,
		GroupButtons,
		TracksTable,
		Comment,
	},

	methods: {
		showMore() {
			if (this.btnData.bShow) {
				if (this.btnData.text === "Unfold") {
					this.btnData.text = "Fold";
				} else {
					this.btnData.text = "Unfold";
				}
			}
			console.log("clcked", this.btnData);
		},

		async getAlbumInfo(albumId) {
			const { data } = await getAlbumTracks(albumId);
			const { description, /* artists, */ artist, publishTime, company, blurPicUrl, name, id, info } = data.album;

			const { commentCount, likedCount, shareCount } = info;
			const { name: arName, picUrl: avatarUrl } = artist;

			this.info = {
				id,
				name,
				blurPicUrl,
				arName,
				avatarUrl,
				company,
				publishTime,
				commentCount,
				likedCount,
				shareCount,
				description,
			};

			this.tracks = [];
			data.songs.forEach((item) => {
				let { name, id, dt: duration } = item;
				duration = this.$helpers.convertMsToMinutes(duration);
				let album = item.al.name;
				let artist = item.ar[0].name;
				let coverUrl = item.al.picUrl;
				this.tracks.push({ id, name, duration, album, artist, coverUrl });
			});

			let {
				data: { hotAlbums },
			} = await getArtistAlbums({ id: artist.id, limit: 200 });
			// remove the current album in the array(its not necessary to dispaly it at the right part again)
			for (let i = 0; i < hotAlbums.length; i++) {
				if (hotAlbums[i].name === this.info.name) {
					hotAlbums.splice(i, 1);
				}
			}
			this.otherAlbums = hotAlbums;

			const {
				data: { comments },
			} = await getAlbumComments(albumId);
			this.comments = comments;
		},

		gotoRoute(id) {
			this.albumId = id;
			this.$router.push({ path: "/albums/detail", query: { id } });
		},
	},

	watch: {
		async albumId(newId) {
			await this.getAlbumInfo(newId);
		},
	},

	async created() {
		this.albumId = this.$route.query.id;
		await this.getAlbumInfo(this.albumId);
		if (this.info.description.length > 130) {
			this.btnData.bShow = true;
		} else {
			this.btnData.bShow = false;
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.album {
	padding-top: 20px;
	@include flex-align(row, flex-start, flex-start);
}

// Left Part -- Top area styles
.al-wrapper {
	flex: 1;

	.al-detail {
		width: 800px;
		margin: 0 auto;
		@include flex-align(row, flex-start);

		// remove the margin set in component
		div.disc-card {
			margin: 0 !important;
		}
		/deep/div.disc-card p {
			padding: 0 !important;
		}

		.al-info {
			height: 200px;
			padding: 3px 10px;
			text-align: left;

			@include flex-align(column, space-between, flex-start);

			.name {
				font-weight: bold;
				padding-top: 3px;
			}

			.artist {
				@include flex-align(row, flex-start, center);
				.avatar {
					width: 30px;
					border-radius: 50%;
				}
				.ar-name {
					padding-left: 10px;
					color: #517eaf;
					cursor: pointer;
				}
			}

			.ar-name,
			.date,
			.company {
				font-size: 13px;
			}
		}
	}
	.al-desc {
		font-size: 13px;
		line-height: 1.5;
		max-lines: 2;
		width: 800px;
		margin: 15px auto;
		text-align: left;
		@include flex-align(column, space-between, flex-start);

		.show-more {
			-webkit-line-clamp: 0 !important;
		}

		.text {
			.title {
				font-weight: bold;
				margin-bottom: 5px;
			}
			@include text-ellipsis-ml(2);
		}

		button {
			width: 60px;
			align-self: flex-end;
		}
	}
}

// Left Part -- Bottome comments styles
.al-comments {
	margin: 30px 0;
	text-align: left;
	.comments-title {
		margin: 10px 0;
		font-weight: bold;
	}
}

// Right Part styles
.al-related {
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
		.one-al {
			@include flex-align(row, flex-start);
			margin-bottom: 10px;
			cursor: pointer;

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
				.date,
				.company {
					font-size: 13px;
					width: 180px;
					@include text-ellipsis();
				}
			}
		}
	}
}
</style>
