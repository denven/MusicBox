<template>
	<div class="disc-card">
		<div class="card-image">
			<span class="card-caption">{{ caption }}</span>
			<div class="disc">
				<img v-lazy="picUrl" />
			</div>
		</div>

		<p class="card-desc">{{ songName }}</p>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "DiscCard",
	props: ["caption", "picUrl", "songName"],
};
</script>

// scoped is needed here
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.disc-card {
	width: 226px;
	margin: 20px 0;
	position: relative;
	overflow: hidden;
	font-size: 14px;

	.card-image {
		position: relative;

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
		}

		.played-info {
			position: absolute;
			bottom: 3px;
			left: 0px;
			width: 100%;
			padding: 0 20px;
			height: 50px;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 0 0 5px 5px;

			@include flex-align(row, space-between);

			.played-count {
				@include flex-align(row, flex-start);
				width: 70%;
			}

			i {
				font-size: 25px;
			}

			.play-music {
				cursor: pointer;
			}
		}

		.disc {
			width: 226px;
			height: 200px;
			position: relative;

			&::after {
				content: "";
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				background: url(../../assets/images/disc-clear.png) no-repeat top center;
				background-size: 226px 200px;
				// opacity: 0.7;
			}

			img {
				position: absolute;
				z-index: 2;
				width: 194px;
				height: 194px;
				top: 3px;
				left: 23px;
				border-radius: 50%;
			}

			// img {
			// 	width: 83%;
			// 	// height: 200px;
			// 	position: absolute;
			// 	top: 50%;
			// 	left: 50%;
			// 	transform: translate(-46%, -50%);
			// 	border-radius: 50%;
			// }
		}
	}

	&:nth-child(even) .disc::after {
		background: url(../../assets/images/disc.png) no-repeat top center;
		background-size: 226px 200px;
	}

	&:nth-child(odd) .disc::after {
		background: url(../../assets/images/disc-clear.png) no-repeat top center;
		background-size: 226px 200px;
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
