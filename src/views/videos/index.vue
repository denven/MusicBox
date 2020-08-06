<template>
  <div class="cards">
    <MvCard
      v-for="item in latestMvs"
      :key="item.id"
      :height="'140px'"
      :caption="item.copywriter"
      :picUrl="item.cover"
      :playCount="item.playCount"
      :mvName="item.name"
      @click.native="playMv(item)"
    >
      <p class="artist">by: {{ item.artistName }}</p>
    </MvCard>
  </div>
</template>

<script>
import MvCard from "@/components/pure-com/MvCard";
import { getLatestMvs } from "@/network/request";

export default {
  data() {
    return {
      latestMvs: []
    };
  },

  methods: {
    playMv(video) {
      this.$router.push(`/videos/detail` + `?id=${video.id}`);
    }
  },

  components: {
    MvCard
  },

  async created() {
    let { data } = await getLatestMvs();
    // console.log(`Latest Mvs`, data.data);
    this.latestMvs = data.data;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.cards {
  // image size is 250px*140px
  width: 100%;
  @include grid-align-cards(250px);
}
</style>
