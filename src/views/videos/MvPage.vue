<template>
  <div class="mv-wrapper content-vertical-align">
    <div class="mv">
      <div class="mv-player">
        <video
          controls
          autoplay
          src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2153666561/ea08604f34fc6a7f558a8c1e716e5895.mp4?wsSecret=6c137c50bffd8a5f2b7d6e2eb5c82bb4&wsTime=1596671756"
        ></video>
      </div>

      <div class="basic-info">
        <h1
          class="video-name"
        >Flexbox layouts for beginners - Web design tutorial (using the Old UI)</h1>
        <div class="video-meta">
          <span class="views">104,276 views</span> •
          <span class="publish-date">Aug 17, 2014</span>
        </div>
      </div>

      <div class="mv-detail">
        <div class="mv-channel">
          <div class="mv-owner">
            <div class="avatar">
              <img
                class="user-avarta"
                src="https://p1.music.126.net/ROGI7vt4jlH6i-Ue9cigZA==/109951164877283403.jpg?param=120y120"
                alt
              />
            </div>
          </div>
          <div class="owner-name">小爷婶儿</div>

          <div class="subscribe">
            <el-button type="danger">Subscribe</el-button>
          </div>
        </div>
        <div
          class="mv-desc"
        >Flexbox (also know as flex or flexible box layout) is a very powerful layout tool that gives you precise alignment and stacking control for all the contents inside an element. It solves many layout problems that designers have been struggling with for a very long time. Here we’ll be covering</div>
      </div>

      <Comment></Comment>
    </div>
    <div class="related-mvs">
      <!-- <MvCard
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
      </MvCard>-->

      <div class="one-mv">
        <MvCard :width="'200px'" :height="'112px'"></MvCard>
        <div class="mv-meta">
          <span class="name">1111111111111111111111111111111111111111111111111111111</span>
          <span class="channel">Ted Ex</span>
          <div class="views-date">
            <span class="views">1.1M</span>
            <span class="date">2 years ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/pure-com/Comment";
import MvCard from "@/components/pure-com/MvCard";

export default {
  name: "mv",
  components: {
    Comment,
    MvCard
  },
  created() {
    console.log("new router", this.$route.query);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/universal.scss";
@import "@/assets/styles/mixin.scss";

.mv-wrapper {
  @include flex-align(row, space-between, flex-start);

  .mv,
  .related-mvs {
    border: 1px solid red;
    height: 1000px;
  }
  .mv {
    width: 65%;
    min-width: 300px;
    margin: 20px 20px 20px 0;
    text-align: left;

    .mv-player {
      width: 100%;
      border-radius: 4px;

      video {
        @extend .mv-player;
        overflow: hidden;
        object-fit: cover;
        outline: none;
        border: none;
      }
    }

    .basic-info {
      padding: 20px 0;
      border-bottom: 1px solid lightgrey;
      .video-name {
        padding-bottom: 10px;
        font-weight: bold;
      }
      .video-meta {
        font-size: 14px;
      }
    }

    .mv-detail {
      display: grid;
      margin-top: 20px;
      grid-template-rows: 50px 100px;
      grid-template-columns: 50px 1fr;
      grid-gap: 10px;

      .mv-channel {
        grid-row: 1/2;
        grid-column: 1/4;

        display: grid;
        grid-template-columns: 50px 1fr 120px;

        grid-gap: 10px;
        align-items: center;

        .mv-owner {
          grid-column: 1/2;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .owner-name {
          grid-column: 2/3;
        }

        .subscribe {
          text-align: right;
          grid-column: 3/4;
        }
      }

      .mv-desc {
        grid-column: 2/4;
        grid-row: 2/3;
      }
    }

    .mv-comments {
    }
  }

  .related-mvs {
    flex: 1;
    min-width: 400px;
    .one-mv {
      @include flex-align(row, space-between);
      width: 100%;
      height: 200px;
      .mv-meta {
        flex: 1;
        @include flex-align(column, space-between, flex-start);
      }
    }
  }
}
</style>