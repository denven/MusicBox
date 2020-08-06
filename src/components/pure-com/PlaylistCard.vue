<template>
	<div class="card">
		<div class="card-image">
			<span class="card-caption">{{ caption }}</span>
			<img v-lazy="picUrl" />
			<div class="played-info">
				<div class="played-count">
					<i class="iconfont icon-listen"></i>
					<span>{{ calcPlayedCount(playCount) }}</span>
				</div>
				<i class="iconfont icon-bofang1 play-music"></i>
			</div>
		</div>

		<p class="card-desc">{{ songName }}</p>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "PlaylistCard",
	props: ["caption", "picUrl", "playCount", "songName"],
	methods: {
		calcPlayedCount(count) {
			if (count >= 1000 * 1000) {
				return (
					(count / 1000000)
						.toFixed(3)
						.slice(0, 3)
						.replace(/\.$/, "") + `M`
				);
			} else if (count >= 1000) {
				return (
					parseInt(count / 1000)
						.toFixed(3)
						.slice(0, 3)
						.replace(/\.$/, "") + `K`
				);
			}
		},
	},
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.card {
	width: 200px;
	margin: 20px 0;
	position: relative;
	// overflow: hidden;
	font-size: 14px;

	.card-image {
		position: relative;

		&:hover .card-caption,
		&:hover .played-info {
			visibility: visible;
		}

		.card-caption {
			position: absolute;
			top: 0;
			left: 0;
			padding: 5px;
			color: white;
			text-align: left;
			line-height: 20px;
			max-height: 50px;
			text-overflow: ellipsis;
			overflow: hidden;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 5px 5px 0 0;
			visibility: hidden;
		}

		.played-info {
			color: white;
			position: absolute;
			bottom: 3px;
			left: 0px;
			width: 100%;
			padding: 0 20px;
			height: 50px;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 0 0 5px 5px;
			visibility: hidden;

			@include flex-align(row, space-between);

			.played-count {
				@include flex-align(row, flex-start);
				width: 70%;
			}

			i {
				// font-size: 25px;
				font-weight: bold;
			}

			.play-music {
				font-size: 20px;
				cursor: pointer;
				color: $theme-primary-color;
			}
		}

		img {
			width: 200px;
			height: 200px;
			border-radius: 5px;
		}
	}

	.card-desc {
		padding: 7px;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
