<template>
	<div class="audio-wrapper">
		<!-- The original audio element: donot use attribute `controls` -->
		<!--
			size="#4.50MB"
			duration="#01:57"
			filename="#Launch_Kan R. Gao.mp3"
			-->
		<!-- <audio ref="audio" @play="play" @pause="pause" controls> -->
		<audio :src="musicUrl" ref="audio"></audio>

		<!-- Add new contents to override the H5 auido tag's controls -->
		<div class="audio-left" @click="play">
			<img id="audioPlayer" src="../../assets/images/play.png" />
		</div>
		<div class="audio-right">
			<p style="max-width: 536px;">Launch_Kan R. Gao.mp3</p>
			<div class="progress-bar-bg" id="progressBarBg">
				<span id="progressDot"></span>
				<div class="progress-bar" id="progressBar"></div>
			</div>
			<div class="audio-time">
				<span class="audio-length-current" id="audioCurTime">00:00</span>
				<span class="audio-length-total">01:57</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		play() {
			if (!this.audio.src) {
				return;
			}
			this.audio.play();
		},

		pause() {
			this.$refs.audio.pause();
		},
	},

	watch: {},

	computed: {
		// Return $refs.audio to make it as local property, then we can use this.audio
		audio() {
			return this.$refs.audio;
		},
		musicUrl() {
			console.log(this.$store.state.audioUrl);
			// To call this.$refs.audio.play(); is not allowed, because play() is a async call.
			// async call is not allowed in computed properties.
			// this.$refs.audio.play();
			// this.audio.play();
			return this.$store.state.audioUrl;
		},
	},
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
/* #fcfcfc is the default audio element tag color */
.audio-wrapper {
	background-color: black;
	margin: 10px auto;
	max-width: 670px;
	height: 50px;
	border: 1px solid #e0e0e0;
	color: #3e3e3e;
}

.audio-left {
	float: left;
	text-align: center;
	width: 18%;
	height: 100%;
}

.audio-left img {
	width: 40px;
	position: relative;
	top: 15px;
	margin: 0;
	display: initial; /* 解除与app的样式冲突 */
	cursor: pointer;
}

.audio-right {
	margin-right: 2%;
	float: right;
	width: 80%;
	height: 100%;
}

.audio-right p {
	font-size: 15px;
	height: 35%;
	margin: 12px 0 2px 0;

	/* 歌曲名称只显示在一行，超出部分显示为省略号 */
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 243px; /* 要适配小屏幕手机，所以最大宽度先设小一点，后面js根据屏幕大小重新设置 */
}

.progress-bar-bg {
	background-color: #d9d9d9;
	position: relative;
	height: 2px;
	cursor: pointer;
}

.progress-bar {
	background-color: #649fec;
	width: 0;
	height: 2px;
}

.progress-bar-bg span {
	content: " ";
	width: 10px;
	height: 10px;
	border-radius: 50%;
	-moz-border-radius: 50%;
	-webkit-border-radius: 50%;
	background-color: #3e87e8;
	position: absolute;
	left: 0;
	top: 50%;
	margin-top: -5px;
	margin-left: -5px;
	cursor: pointer;
}

.audio-time {
	overflow: hidden;
	margin-top: 1px;
}

.audio-length-total {
	float: right;
	font-size: 12px;
}

.audio-length-current {
	float: left;
	font-size: 12px;
}
</style>
