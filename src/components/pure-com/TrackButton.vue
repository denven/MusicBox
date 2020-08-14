<template>
  <div class="audio-button">
    <i class="iconfont icon-bofang1" title="Play Audio" @click="playAudio(track)"></i>
    <span class="name" :title="track.name" v-if="showName">{{ track.name }}</span>
    <i class="iconfont icon-mv3" title="Play Video" @click="playVideo(track)" v-if="track.mvid > 0 || track.mv > 0"></i>
  </div>
</template>

<script>
import { getAudioUrl } from "@/network/request";

export default {
  name: "TrackButton",
  props: {
    track: { type: Object },
    showName: { type: Boolean, default: false }
  },
  methods: {
    async playAudio(track) {
      try {
        let { data } = await getAudioUrl(track.id);
        const audioUrl = data.data[0].url;

        if (!audioUrl) {
          return this.$message({
            showClose: true,
            message: "Sorry, this track is only available to VIP user！",
            type: "error",
            offset: 50
          });
        } else {
          this.$store.state.song = {
            name: track.name,
            artist: track.artists.map(item => item.name).join(","),
            audioUrl,
            picUrl: track.album.picUrl
          };
        }
      } catch (error) {
        console.log(error);
      }
    },

    playVideo(track) {
      let mvid = track.mvid || track.mv;
      if (mvid > 0) {
        this.$router.push(`/videos/detail` + `?id=${track.mvid}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.audio-button {
  @include flex-align(row, flex-start, center);

  i {
    cursor: pointer;
    color: $theme-primary-color;
  }

  span {
    @include text-ellipsis();
  }
}
</style>
