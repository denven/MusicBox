<template>
  <div class="artist">
    <div class="left-part">
      <div class="artist-name" v-if="Object.keys(artist).length > 0">
        <span class="name">{{ artist.name }}</span>
        <span class="alias">{{ artist.alias ? artist.alias.join(",") : '' }}</span>

        <div class="photo">
          <img v-lazy="$helpers.getSmallPicture(artist.picUrl, 640, 300)" alt="" />
        </div>
      </div>

      <el-tabs type="border-card">
        <el-tab-pane label="Tracks(Top 50)">
          <TracksTable :showTitle="false" :tableData="topTracks" />
        </el-tab-pane>

        <el-tab-pane :label="labelNames[1]">
          <div class="al-cards">
            <DiscCard v-for="item in curPageAlbs" :key="item.id" :caption="item.copywriter" :picUrl="item.blurPicUrl"
              :songName="item.name" :albumId="item.id">
            </DiscCard>
          </div>

          <div class="pagination">
            <el-pagination v-if="allAlbums.length > ALS_PAGE_SIZE" background layout="prev, pager, next"
              :page-size="ALS_PAGE_SIZE" :total="allAlbums.length" @current-change="setAlbumsPage"></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="labelNames[2]">
          <div class="mv-cards">
            <MvCard v-for="item in curPageMvs" :key="item.id" :height="'120px'" :picUrl="item.imgurl16v9"
              :playCount="item.playCount" :mvName="item.name" :mvId="item.id"
              :duration="$helpers.convertMsToMinutes(item.duration)">
            </MvCard>
          </div>

          <div class="pagination">
            <el-pagination v-if="relatedMvs.length > MVS_PAGE_SIZE" background layout="prev, pager, next"
              :page-size="MVS_PAGE_SIZE" :total="relatedMvs.length" @current-change="setMvsPage"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Introduction">
          <div class="introduction" v-for="item in introduction" :key="item.ti">
            <h4 class="intro-title">{{ item.ti }}</h4>
            <p class="intro-text" v-html="item.txt.replace(/\n/g, '<br />')"></p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Right Part: similar singers -->
    <div class="right-part">
      <div class="top-singers">
        <div class="title">Top 50 Artists</div>
        <div class="avatars">
          <img v-for="(artist, index) in topArtists" v-lazy="$helpers.getSmallPicture(artist.img1v1Url, 40)"
            :title="artist.name" alt="" :key="artist.id" @click="viewArtistDetail(index)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArtistDesc,
  getArtistTopTracks,
  getArtistAlbums,
  getArtistMvs,
  getTopArtists,
  getArtistsList
} from "@/network/request";
import TracksTable from "@/components/pure-com/TracksTable";
import DiscCard from "@/components/pure-com/DiscCard";
import MvCard from "@/components/pure-com/MvCard";

export default {
  data() {
    return {
      artist: {},
      introduction: [],
      topTracks: [],
      allAlbums: [],
      curPageAlbs: [],
      ALS_PAGE_SIZE: 15, // default albums page size

      relatedMvs: [],
      curPageMvs: [],
      MVS_PAGE_SIZE: 16, // default mvs page size

      detailedDesc: "",
      topArtists: [], // related artists
      topArsDetail: [],

      labelNames: ["Tracks(Top 50)", "Albums", "Music Videos", "Introduction"]
    };
  },

  components: {
    TracksTable,
    DiscCard,
    MvCard
  },

  methods: {
    async updateArtistData(artistId) {
      // Get data for "Top Tracks" Tab
      try {
        let { data } = await getArtistTopTracks(artistId);
        this.topTracks = [];
        data.songs.forEach(item => {
          // Note: The mvid is not `mvid` in song object here, it's mvid in other song or track object.
          let { name, id, dt: duration, mv } = item;
          duration = this.$helpers.convertMsToMinutes(duration);
          let album = item.al; //item.al.name;
          let artists = item.ar; // this array contains artists with name and id only
          let coverUrl = item.al.picUrl;
          this.topTracks.push({
            id,
            name,
            duration,
            mv,
            album,
            artists,
            coverUrl
          });
        });
      } catch (error) {
        return this.$message({
          showClose: true,
          message: "Sorry, failed to get data！",
          type: "error",
          offset: 50
        });
      }

      // Get data for the right column of page: "Top Artists"
      // The API to request similar artists doesn't response
      // let { data: ars } = await getSimilarArtists(this.artist.id);
      let {
        data: { artists }
      } = await getTopArtists();
      this.topArtists = artists;

      // Get data for "Albums" Tab
      let {
        data: { hotAlbums }
      } = await getArtistAlbums({ id: artistId, limit: 200 });
      this.allAlbums = hotAlbums;
      this.curPageAlbs = hotAlbums.slice(0, this.ALS_PAGE_SIZE);

      if (hotAlbums.length > 0) {
        this.labelNames[1] = "Albums" + `(${hotAlbums.length})`;
      }

      // Get data for "Music Videos" Tab
      let {
        data: { mvs }
      } = await getArtistMvs({ id: artistId, limit: 100 });
      this.relatedMvs = mvs;
      this.curPageMvs = mvs.slice(0, this.MVS_PAGE_SIZE);
      if (mvs.length > 0) {
        this.labelNames[2] = "Music Videos" + `(${mvs.length})`;
      }

      // Get data for "Introduction" Tab
      // As this will not be displayed once the page loads, so put it at the end to request
      let {
        data: { briefDesc, introduction }
      } = await getArtistDesc(artistId);
      this.introduction = introduction;
      if (briefDesc) this.introduction.unshift({ ti: "简介", txt: briefDesc });
    },

    // Use internal page render instead of route pushing to update (for right part artists)
    async viewArtistDetail(index) {
      // Get the top 50 artists data once to reduce requests
      if (this.topArsDetail.length === 0) {
        let { data } = await getArtistsList({ type: -1, area: -1, limit: 50 });
        this.topArsDetail = data.artists;
      }

      this.artist = this.topArsDetail[index];
      this.$session.setPageData("artist", this.artist);
      // await this.updateArtistData(this.artist.id);  // commented here, let route watcher to update data
      this.$router.push({
        path: "/artists/detail",
        name: "ar-detail",
        query: { id: this.artist.id },
        params: { artist: this.artist }
      });
    },

    setAlbumsPage(page) {
      if (page < 1) return;
      this.curPageAlbs = this.allAlbums.slice(
        (page - 1) * this.ALS_PAGE_SIZE,
        page * this.ALS_PAGE_SIZE
      );
    },

    setMvsPage(page) {
      if (page < 1) return;
      this.curPageMvs = this.relatedMvs.slice(
        (page - 1) * this.MVS_PAGE_SIZE,
        page * this.MVS_PAGE_SIZE
      );
    }
  },

  // as the click of artistname in the Table will push to the same route( to this current page again)
  // we need the route watch here to achieve same route navigation, otherwise it won't work
  // however, if the route is pushed by name, not path, this doesn't work
  // beforeRouteUpdate(to, from, next) {
  //   console.log("******************Before route update*******************");
  //   console.log(to, from, next);
  // },

  // beforeRouteEnter(to, from, next) {
  //   console.log("*****************Before route enter********************");
  //   console.log("to", to);
  //   console.log("from", from);
  //   console.log("next", next);
  //   next(vm => console.log(vm));
  // },

  // beforeRouteLeave(to, from, next) {
  //   console.log("****************Before route Leaves*********");
  //   console.log(this, "beforeRouteLeave");
  //   console.log("to", to);
  //   console.log("from", from);
  //   console.log("next", next);
  //   next();
  // },

  watch: {
    // watch the same route internal changes:
    // however, if the route is pushed by name and params this won't work;
    // this only works when the route params is pushed with name, path and query property,
    // if path or query are omitted from the options, it doesn't work
    $route: async function(cur) {
      this.artist = cur.params.artist;
      await this.updateArtistData(this.artist.id);
    }
  },

  async created() {
    // Use sessionStorage to recover page data when user presses F5
    if (!this.$route.params.artist) {
      this.artist = this.$session.getPageData("artist");
    } else {
      this.artist = this.$route.params.artist;
      this.$session.setPageData("artist", this.artist);
    }
    await this.updateArtistData(this.artist.id);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.artist {
  padding-top: 20px;
  @include flex-align(row, flex-start, flex-start);
}

.left-part {
  flex: 1;
  min-width: 640px; //needed to avoid right part auto shrink
  text-align: left;

  .artist-name {
    .name {
      font-size: 24px;
      font-weight: bold;
    }
    .alias {
      font-size: 16px;
      padding-left: 5px;
    }

    .photo {
      margin-top: 10px;
      width: 100%;
      height: 300px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      img {
        width: 640px;
        height: 300px;
      }
    }
  }

  .al-cards {
    @include grid-align-cards(226px, 10px);
    text-align: center;
  }

  .mv-cards {
    @include grid-align-cards(200px, 10px);
    row-gap: 15px;
    text-align: center;
  }

  .pagination {
    text-align: center;
  }

  .introduction {
    .intro-title {
      font-size: 14px;
      font-weight: bold;
      border-left: 3px solid $theme-primary-color;
      padding-left: 10px;
    }
    .intro-text {
      margin: 10px 0;
      font-size: 12px;
      line-height: 2;
    }
  }
}

// Right Part styles
.right-part {
  // flex-shrink: 0;  //if left part grows, this property setting will not work
  width: 280px;
  padding-bottom: 20px;
  margin-left: 20px;

  .title {
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1.5px solid gray;
    margin-bottom: 10px;
  }

  .avatars {
    width: 100%;
    @include grid-align-cards(40px, 5px);
    row-gap: 5px;
    img {
      cursor: pointer;
    }
  }
}
</style>
