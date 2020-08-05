<template>
  <div class="card">
    <div class="card-image">
      <img :src="picUrl" :style="{'height': height}" />
      <div class="played-count">
        <i class="iconfont icon-yiguankan"></i>
        <span>{{ calcPlayedCount(playCount) }}</span>
      </div>
      <i class="play-video iconfont icon-mv4" @click="playMv"></i>
    </div>

    <p class="card-desc">{{ mvName }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MvCard",
  props: ["width", "height", "caption", "picUrl", "playCount", "mvName"],
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

      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.card {
  width: 250px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
  font-size: 14px;

  .card-image {
    position: relative;

    &:hover .play-video {
      visibility: visible;
    }

    .played-count {
      @include flex-align(row, flex-end);
      color: white;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    img {
      width: 100%;
      border-radius: 5px;
    }

    .play-video {
      @include position-abs-center();
      padding: 0 !important;
      color: $theme-primary-color;
      font-size: 35px;
      z-index: 105;
      vertical-align: middle;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      cursor: pointer;
      visibility: hidden;
    }
  }

  .card-desc {
    padding: 7px;
    width: 100%;
    @include text-ellipsis();
  }
}
</style>
