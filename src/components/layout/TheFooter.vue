<template>
  <div class="audio-player">
    <!-- The original audio element: donot use attribute `controls` -->
    <audio
      :src="song.audioUrl"
      @pause="paused"
      @play="played"
      @timeupdate="updatePlayedTime"
      @canplay="prepared"
      @seeking="seeking"
      @seeked="seeked"
      autoplay
      loop
      ref="audio"
    ></audio>

    <!-- Add new contents to override the H5 auido tag's controls -->
    <!-- Part 1: Left, for audio information, text description 30% width -->
    <div class="audio-info">
      <img :src="song.picUrl" alt />
      <div class="song-info">
        <div>{{song.name ? 'Playing: ' + song.name : ""}}</div>
        <div>{{song.artist ? 'Artist: ' + song.artist : ""}}</div>
      </div>
    </div>

    <!-- Part 2: Middle, controls and play progress bar, 50% width, minimum width: 300px? -->
    <!-- This part is divided into 3 parts: buttons(fixed width), progress bar, time(fixed width) -->
    <div class="play-controls">
      <div class="play-button" @click="controlPlay">
        <i v-if="!isplaying" class="iconfont icon-bofang control-button" />
        <i v-else class="iconfont icon-stop control-button" />
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

      <div class="played-time">
        <span>{{ timeString }}</span>
      </div>
    </div>

    <!-- Part 3: Right part, Volume adjustment...etc, fixed width: 200px? -->
    <div class="right-part">
      <div class="volume" @click="toggleMuted">
        <i v-if="volumeRatio > 0" class="iconfont icon-yinliang"></i>
        <i v-else class="iconfont icon-jingyin"></i>
      </div>
      <!-- For volume adjustment -->
      <ProgressBar
        :dotSize="12"
        :barHeight="4"
        :barColor="'#c33f18'"
        :barBgColor="'grey'"
        :percent="volumeRatio * 100"
        @change="adjustVolume"
      />
    </div>
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
      // properties for music play
      isplaying: false,
      percentage: 0,
      progressColor: "#409eff",
      // this property needs to be initialized at mounted() instead of defining it as a computed property
      audio: "",
      duration: 0,
      timeString: "",
      adjustDisabled: true,
      // properties for audio volume adjustment
      volumeRatio: 1,
      volumeMuted: 0,
      currentTime: 0
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
    // response to play bar adjustment
    seekAudio(newVal) {
      this.percentage = newVal;
      this.currentTime = (this.percentage * this.duration) / 100;
      this.audio.currentTime = this.currentTime;
    },

    seeking() {
      this.audio.muted = true; // disable sound when adjusting from progress bar
    },

    seeked() {
      this.audio.muted = false; // unmute when seek compleleted
    },

    // reponse to audio play process changes
    updatePlayedTime() {
      this.currentTime = this.audio.currentTime;
      this.duration = this.audio.duration;
      this.percentage = (100 * this.currentTime) / this.duration;
      if (this.duration > 0) {
        this.timeString =
          convertSecToMinutes(this.currentTime) +
          " / " +
          convertSecToMinutes(this.duration);
      } else {
        this.timeString = `00:00 / 00:00`;
      }
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
    },

    // when getting a percent from progress bar
    adjustVolume(percent) {
      console.log(percent);
      this.$refs.audio.volume = (percent / 100).toFixed(2); // volume： 0-1
      this.volumeRatio = this.$refs.audio.volume;
    },

    toggleMuted() {
      if (this.$refs.audio.volume > 0) {
        this.volumeMuted = this.$refs.audio.volume; // backup position value
        this.volumeRatio = 0; // let bar go to start point
        this.$refs.audio.volume = 0; //make sound muted
      } else {
        if (this.volumeMuted === 0) {
          this.volumeMuted = 0.3; // set a default volume
        }
        this.$refs.audio.volume = this.volumeMuted;
        this.volumeRatio = this.$refs.audio.volume;
      }
    }
  },

  mounted() {
    this.audio = this.$refs.audio;
  },

  computed: {
    song() {
      // console.log("Song Observer in computed: ", this.$store.state.song);
      // To call this.$refs.audio.play(); is not allowed, because play() is a async call.
      // async call is not allowed in computed properties.
      // this.$refs.audio.play();
      // this.audio.play();
      return this.$store.state.song;
    }
  },

  watch: {
    duration() {
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
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0px auto;
  padding: 5px 20px;

  width: 100%;
  height: $header-height;
  @include flex-align(row, space-bewteen, center);

  .audio-info {
    width: 400px;
    height: 100%;
    color: white;

    @include flex-align(row, flex-start, center);
    img {
      width: 40px;
      border-radius: 2px;
    }

    .song-info {
      width: calc(100% - 40px);
      height: 100%;
      @include flex-align(column, space-around, flex-start);
      padding-left: 10px;
      font-size: 14px;
      text-align: left;
      div {
        @include text-ellipsis;

        width: 100%;
      }
    }
  }

  .play-controls {
    flex: 1;
    // border: 1px solid blue;
    min-width: 350px;
    padding: 0 5px;
    // background-color: black;
    // color: white;
    @include flex-align(row, space-between, center);

    .play-button {
      width: 40px;
      height: 30px;
      padding: 0 5px;
      cursor: pointer;
    }

    .progress-bar {
      flex: 1;
      margin: 0 5px;

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
      color: white;
    }

    img {
      width: 100%;
      display: block；;
    }
  }

  i {
    font-size: 30px;
  }

  .right-part {
    width: 400px;
    text-align-last: right;
    @include flex-align(row, flex-end, center);
    .volume {
      cursor: pointer;
    }
  }
}
</style>
