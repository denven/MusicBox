<template>
  <div class="audio-player">
    <!-- The original audio element: donot use attribute `controls` -->
    <audio
      :src="musicUrl"
      @pause="paused"
      @play="played"
      @timeupdate="updateProgress"
      @canplay="prepared"
      autoplay
      loop
      ref="audio"
    ></audio>

    <!-- Add new contents to override the H5 auido tag's controls -->
    <!-- Part 1: Left, for audio information, text description 30% width -->
    <div class="audio-info">Current Music</div>

    <!-- Part 2: Middle, controls and play progress bar, 50% width, minimum width: 300px? -->
    <!-- This part is divided into 3 parts: buttons(fixed width), progress bar, time(fixed width) -->
    <div class="play-controls">
      <div class="play-button" @click="controlPlay">
        <img v-if="!isplaying" class="control-button" src="../../assets/images/play.png" />
        <img v-else class="control-button" src="../../assets/images/pause.png" />
      </div>

      <ProgressBar
        :dotSize="10"
        :barHeight="6"
        :barColor="'green'"
        :barBgColor="'black'"
        :percent="percentage"
        :disabled="adjustDisabled"
        @change="seekAudio"
      />

      <!-- A wrapper added as el-progress uses relative position -->
      <!-- <div class="progress-bar"> -->
      <!-- the percentage is only updated by change the property value -->
      <!-- we need an internal event or timer to trigger the calculation of percentage -->

      <!-- <el-slider v-model="percentage" :step="0.1" @change="seekAudio">
      </el-slider>-->

      <!-- <el-progress
					:percentage="percentage"
					:color="progressColor"
					:stroke-width="4"
					:show-text="false"
      ></el-progress>-->
      <!-- </div> -->

      <div class="played-time" v-if="duration > 0">
        <span>{{ timeString }}</span>
      </div>
    </div>

    <!-- Part 3: Right part, Volume adjustment...etc, fixed width: 200px? -->
    <div class="right-part">Volume</div>
  </div>
</template>

<script>
import { convertSecToMinutes } from "@/common/helpers";
import ProgressBar from "@/components/pure-com/ProgressBar";

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      isplaying: false,
      percentage: 0,
      progressColor: "#409eff",
      // this property needs to be initialized at mounted() instead of defining it as a computed property
      audio: this.$refs.audio,
      duration: 0,
      timeString: "",
      adjustDisabled: true
      // timer: null,
    };
  },

  methods: {
    async play() {
      if (!this.audio) {
        console.log("Music is not ready yet...");
        return;
      }

      // calling audio.play() or audio.pause() won't trigger event
      // wo we need assign this.isplaying value after the call
      try {
        await this.audio.play();
        this.isplaying = true;
      } catch (error) {
        console.log("Target resource is not playable!");
      }
    },

    async pause() {
      try {
        await this.audio.pause();
        this.isplaying = false;
      } catch (error) {
        console.log("Failed to pause the music playing!");
      }
    },

    prepared() {
      this.adjustDisabled = false;
    },

    played() {
      this.isplaying = true;
    },

    paused() {
      this.isplaying = false;
    },

    // Do not assign this.percentage
    seekAudio(newVal) {
      this.percentage = newVal;
      console.log("New Percentage", this.percentage);

      this.currentTime = Math.min((this.percentage * this.duration) / 100);
      this.audio.currentTime = this.currentTime;
    },

    updateProgress() {
      this.currentTime = this.audio.currentTime;
      this.duration = this.audio.duration;
      this.percentage = (100 * this.currentTime) / this.duration;
      this.timeString =
        convertSecToMinutes(this.currentTime) +
        "/" +
        convertSecToMinutes(this.duration);
    },

    // Click button to play or pause
    controlPlay() {
      if (!this.audio) return;
      console.log(this.$refs.audio.duration, this.$refs.audio.currentTime);

      if (this.audio.src) {
        if (this.isplaying) {
          this.pause();
        } else {
          this.play();
        }
      }
    }

    // percentage() {
    // 	let value = 0;

    // 	try {
    // 		if (this.audio.duration > 0) value = parseInt(this.audio.duration);

    // 		console.log(value);
    // 	} catch (error) {
    // 		console.log("Audio is not ready!");
    // 	}

    // 	return Math.min(value, 100);
    // },
  },

  mounted() {
    // console.log("mounted:", this.$refs, this.$refs.audio);
    this.audio = this.$refs.audio;

    // this.timer = setInterval(() => {
    // 	if (!isNaN(this.audio.duration)) {
    // 		this.currentTime = this.audio.currentTime;
    // 		this.duration = this.audio.duration;
    // 		this.percentage = Math.ceil((100 * this.currentTime) / this.duration);

    // 		this.timeString =
    // 			convertSecToMinutes(this.currentTime) +
    // 			"/" +
    // 			convertSecToMinutes(this.duration);
    // 		// console.log(this.percentage);
    // 	}
    // }, 1000);
  },

  // beforeDestroy() {
  // 	this.timer = null;
  // },

  computed: {
    // Return $refs.audio to make it as a local property, then we can use this.audio
    // audio() {
    // 	// the audio element is not mounted here when there is no music attached, it's undefined
    // 	// and it will not be updated even when this.$refs.audio has a valid source, why?
    // 	console.log("computed auido:", this.$refs.audio);
    // 	if (!this.$store.state.audioUrl) {
    // 		return this.$refs.audio;
    // 	} else {
    // 		return "undefined";
    // 	}
    // },

    // duration() {
    // 	console.log("duration:", this.$refs.audio);
    // 	if (!this.$refs.audio) return 0;
    // 	return this.$refs.audio.duration;
    // },

    // currentTime() {
    // 	return convertMsToMinutes(this.$refs.audio.currentTime);
    // },

    musicUrl() {
      console.log(this.$store.state.audioUrl);
      // To call this.$refs.audio.play(); is not allowed, because play() is a async call.
      // async call is not allowed in computed properties.
      // this.$refs.audio.play();
      // this.audio.play();
      return this.$store.state.audioUrl;
    }

    // played progress percentage
    // percentage() {

    // 	console.log("calculate");
    // 	if (this.audio && this.audio.duration > 0) {
    // 		console.log(this.audio.currentTime);

    // 		let value = parseInt(
    // 			(100 * this.audio.currentTime) / this.audio.duration
    // 		);
    // 		console.log(value);

    // 		return value;
    // 	}

    // 	return 20;
    // },
  },

  watch: {
    currentTime() {
      return this.audio.currentTime;
    },

    duration() {
      console.log("duration:", this.$refs.audio);
      if (!this.$refs.audio) return 0;
      return this.$refs.audio.duration;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

/* #fcfcfc is the default audio element tag color */
.audio-player {
  // background-color: black;
  margin: 100px auto;
  padding: 0 20px;

  width: 100%;
  // height: 200px;
  height: $header-height;
  // color: white;
  border: 5px solid red;
  @include flex-align(row, space-bewteen, center);

  .audio-info {
    width: 400px;
  }

  .play-controls {
    flex: 1;
    border: 1px solid blue;
    min-width: 350px;
    padding: 0 5px;
    // background-color: black;
    // color: white;
    @include flex-align(row, space-between, center);

    .play-button {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .progress-bar {
      flex: 1;
      margin: 0 5px;
      background-color: #2c2c2c;

      .progress-line {
        width: 80%;

        // progress-bar height setting
        height: 20px;
        background-color: red;
        position: relative;

        .progress-dot {
          position: absolute;
          background-color: blue;
          width: 26px;
          height: 26px;
          top: -3px;
          left: 50px;
          border-radius: 50%;
        }
      }
    }

    .played-time {
      min-width: 80px;
      font-size: 14px;
    }

    img {
      width: 100%;
      display: block；;
    }
  }

  .right-part {
    width: 400px;
    text-align-last: right;
  }
}
</style>
