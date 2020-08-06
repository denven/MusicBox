<template>
  <div class="mv-wrapper content-vertical-align">
    <div class="mv">
      <div class="mv-player">
        <video controls autoplay :src="mv.mvUrl"></video>
      </div>

      <div class="basic-info">
        <h1 class="video-name">{{mv.name}}</h1>
        <div class="video-meta">
          <span class="views">{{mv.playCount}}</span> •
          <span class="publish-date">{{mv.publishTime}}</span>
        </div>
      </div>

      <div class="mv-detail">
        <div class="mv-channel">
          <div class="mv-owner">
            <div class="avatar">
              <img class="user-avarta" :src="mv.artistAvatar" alt />
            </div>
          </div>
          <div class="owner-name">{{mv.artistName}}</div>

          <div class="subscribe">
            <el-button type="danger">Subscribe</el-button>
          </div>
        </div>
        <div class="mv-desc">{{mv.desc}}</div>
      </div>

      <div class="mv-comments">
        <h1 class="comments-title">{{comments.length + ' Comments'}}</h1>
        <Comment
          v-for="item in comments"
          :key="item.time"
          :content="item.content"
          :name="item.user.nickname"
          :avatar="item.user.avatarUrl"
          :likedCount="item.likedCount"
          :time="item.time"
        ></Comment>
      </div>
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

      <!-- <div class="one-mv">
        <MvCard :width="'200px'" :height="'112px'"></MvCard>
        <div class="mv-meta">
          <span class="name">1111111111111111111111111111111111111111111111111111111</span>
          <span class="channel">Ted Ex</span>
          <div class="views-date">
            <span class="views">1.1M</span>
            <span class="date">2 years ago</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Comment from "@/components/pure-com/Comment";
// import MvCard from "@/components/pure-com/MvCard";
import {
  getMvUrl,
  getMvDetail,
  getSimilarMvs,
  getMvComments,
  getMvArtistV2
} from "@/network/request";

export default {
  name: "mv",
  data() {
    return {
      mv: {}, // current Mv
      similarMvs: [],
      comments: []
    };
  },
  components: {
    Comment
    // MvCard
  },

  async created() {
    const mvid = this.$route.query.id;

    try {
      let allMvData = await Promise.all([
        Promise.resolve(getMvUrl(mvid)),
        Promise.resolve(getMvDetail(mvid)),
        Promise.resolve(getSimilarMvs(mvid)),
        Promise.resolve(getMvComments(mvid))
      ]);

      const mvUrl = allMvData[0].data.data.url;
      console.log(allMvData[0].data.data.url);
      const {
        name,
        artistName,
        publishTime,
        playCount,
        desc
      } = allMvData[1].data.data;

      let { data: artistData } = await getMvArtistV2(
        allMvData[1].data.data.artists[0].id
      );

      let mvObj = {
        mvUrl,
        name,
        artistName,
        artistAvatar: artistData.artist.img1v1Url,
        publishTime,
        playCount,
        desc
      };

      this.mv = {
        ...mvObj,
        playCount:
          playCount
            .toString()
            .replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + ` views`
      };

      this.similarMvs = allMvData[2].data.mvs;
      this.comments = allMvData[3].data.comments;

      console.log(this.comments[0]);
    } catch {
      err => console.log("Request error when getting Mv Details", err);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/universal.scss";
@import "@/assets/styles/mixin.scss";

.mv-wrapper {
  @include flex-align(row, space-between, flex-start);

  // .mv,
  // .related-mvs {
  //   border: 1px solid red;
  //   height: 1000px;
  // }
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
      padding: 20px 0 10px 0;
      border-bottom: 1px solid lightgrey;
      .video-name {
        padding-bottom: 15px;
        font-weight: bold;
      }
      .video-meta {
        font-size: 14px;
        color: #bebebe;
      }
    }

    .mv-detail {
      display: grid;
      margin: 20px 0;
      padding-bottom: 20px;
      grid-template-rows: 50px minmax(30px, 100px);
      grid-template-columns: 50px 1fr;
      grid-gap: 10px;

      border-bottom: 1px solid lightgrey;

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
        font-size: 14px;
        line-height: 1.5;
        @include text-ellipsis-ml(5);
      }
    }

    .mv-comments {
      margin: 20px 0;
      .comments-title {
        margin: 10px 0;
        font-weight: bold;
      }
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