<template>
  <!-- To avoid vue warning of name undefined -->
  <span class="artist-name" v-if="artist">
    <span class="name" :class="{disabled: diableRoute}" @click="viewDetail"> {{ artist.name }}</span>
    <slot class="slot"> </slot>
    <img v-lazy="$helpers.getSmallPicture(artist.picUrl, 200)" alt="" />
  </span>
</template>

<script>
import { getSearchResults } from "@/network/request";

export default {
  name: "ArtistName",
  props: {
    artist: { type: Object, default: () => ({ name: "", picUrl: "" }) },
    updateAvatar: { type: Boolean, default: false }
  },
  data() {
    return {
      arRequest: {}
      // diableRoute: false
    };
  },
  methods: {
    async getArtistDetail() {
      let { data } = await getSearchResults({
        type: 100, // search singers only
        limit: 100,
        keywords: this.artist.name
      });

      let artists = data.result.artists.filter(
        item => item.name === this.artist.name && item.id === this.artist.id
      );

      if (artists.length > 0) {
        this.arRequest = artists[0];
        console.log("Patching artist information:", this.artist);
      }
    },

    async viewDetail() {
      console.log("view detail================", this.artist);
      if (this.updateAvatar) {
        console.log("view detail and update picUrl", this.artist);
        await this.getArtistDetail();
      } else {
        this.arRequest = this.artist;
      }

      // Note: name, path, params, query the 4 proerties in the push object must all be defined here
      // if we push to the same route, and want parameters be persistant(can be passed) in params proerty
      try {
        await this.$router.push({
          name: "ar-detail",
          path: "/artists/detail",
          query: { id: this.arRequest.id },
          params: { artist: this.arRequest }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    diableRoute() {
      // Let artistname be clickable in all the pages except ArtistDetail Page, as it navigates
      // to the same route in this page, and cannot be watched when using params to pass artist data
      // return this.$route.name === "ar-detail";
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.artist-name {
  position: relative;
  .name {
    color: #517eaf;
  }

  // .slot {
  // 	padding-right: 5px;
  // }

  img {
    width: 200px;
    height: 200px;
    display: none;
  }

  &:hover {
    .name {
      text-decoration: underline;
      cursor: pointer;
    }
    .disabled {
      text-decoration: none !important;
      cursor: default;
    }
    img {
      display: block;
      position: absolute;
      bottom: -202px;
      left: 0;
      z-index: 100;
      border-radius: 4px;
    }
  }
}
</style>
