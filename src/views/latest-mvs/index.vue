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

  components: {
    MvCard
  },

  async created() {
    let { data } = await getLatestMvs();
    console.log(`Latest Mvs`, data.data);
    this.latestMvs = data.data;
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";

.cards {
  // image size is 250px*140px
  @include grid-align-cards(250px);
}
</style>
