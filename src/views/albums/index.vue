<template>
  <div>
    <SectionTitle :title="'Latest Releases'">
      <i class="iconfont icon-ziyuan"></i>
    </SectionTitle>

    <div class="cards">
      <DiscCard
        v-for="item in newAlbums"
        :key="item.id"
        :caption="item.copywriter"
        :picUrl="item.blurPicUrl"
        :songName="item.name"
      >
        <p class="artist">by: {{ item.artist.name }}</p>
      </DiscCard>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import DiscCard from "@/components/pure-com/DiscCard";
import { getNewReleases } from "@/network/request";

export default {
  data() {
    return {
      newAlbums: []
    };
  },

  components: {
    SectionTitle,
    DiscCard
  },

  async created() {
    let { data } = await getNewReleases();
    // console.log(`new albums`, data.albums);
    this.newAlbums = data.albums;
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";

.cards {
  width: 100%;
  @include grid-align-cards(226px);
}
</style>
