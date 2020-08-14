<template>
  <div class="artist-card" @click="viewArtist(artist)">
    <img v-lazy="$helpers.getSmallPicture(artist.picUrl, 200)" alt="" />
    <div class="artist-links">
      <span class="artist-name">{{ artist.name }}</span>
      <i class="iconfont icon-home_page" title="Personal Website"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistCard",
  props: { artist: { type: Object } },
  methods: {
    viewArtist(artist) {
      // this.$router.push(`/artists/detail` + `?id=${artistId}`);
      // this.$router.push({ name: "ar-detail", params: { artist } });
      this.$router.push({
        name: "ar-detail",
        path: "/artists/detail",
        query: { id: artist.id },
        params: { artist }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.artist-card {
  width: 200px;
  margin-bottom: 20px;

  img {
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
  }

  .artist-links {
    padding: 5px;
    font-size: 12px;
    @include flex-align(row, space-between);
    i {
      color: $theme-primary-color;
    }
  }
}
</style>
