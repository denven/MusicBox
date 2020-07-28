<template>
	<div
		class="banners"
		v-bind:style="'background: url(' + bgImageUrl + ') no-repeat left center;'"
	>
		<div class="carousel">
			<el-carousel
				:interval="5000"
				arrow="always"
				height="281px"
				@change="changeBanner"
			>
				<el-carousel-item v-for="slide in banners" :key="slide.url">
					<img :src="slide.imageUrl" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="download">
			<span>PC Mac Android IOS WP</span>
		</div>
	</div>
</template>

<script>
import { getBannerCarousel } from "@/network/request";

export default {
	data() {
		return {
			banners: [],
			bgImageUrl: "",
		};
	},

	async created() {
		let { data } = await getBannerCarousel();
		console.log(data);
		this.banners = data.banners;
	},

	methods: {
		changeBanner(index) {
			this.bgImageUrl = this.banners[index].imageUrl + `?imageView&blur=40x20`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

.banners {
	width: 90%;
	height: $banner-height;
	margin: 0 auto;

	@include flex-align(row, center, center);
}

.banners .carousel {
	// flex: 1;
	width: 100%;
	background-size: 6000px;
	img {
		width: $banner-img-width;
		height: $banner-height;
	}
}

.banners .download {
	width: $banner-height;
	height: $banner-height;
	background: url("https://s2.music.126.net/style/web2/img/index/download.png?cd16c2604966d52e53a40d1aae974c9a")
		no-repeat top center;
	color: white;
	padding-top: 252px;
}

// .el-carousel__item:nth-child(2n) {
// 	background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
// 	background-color: #d3dce6;
// }
</style>
