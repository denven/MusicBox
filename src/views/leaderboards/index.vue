<template>
  <div class="leaderboards" ref="wrapper">
    <!-- Page Left Part contains three parts vertically -->
    <div class="leaderboard-wrapper">
      <!-- Left Top Part: Playlist information -->
      <div class="leaderboard-detail" v-if="leaderboards.length > 0">
        <div class="img-wrapper">
          <img class="leaderboard-image" v-lazy="$helpers.getSmallPicture(curLb.coverImgUrl, 110)" alt="" />
        </div>
        <div class="leaderboard-details">
          <h3 class="name">{{ curLb.name }}</h3>
          <div class="update-time">
            <i class="iconfont icon-clock2">{{ `最后更新: ` + $helpers.formatTime(curLb.updateTime) }}
              {{ $helpers.encloseNumber(curLb.updateFrequency) }}
            </i>
          </div>
          <div class="description">{{ curLb.description }}</div>

          <div class="social">
            <span class="play">
              <el-button size="mini" type="danger"> <i class="iconfont icon-bofang">Play</i> </el-button>
              <el-button size="mini" type="danger"> <i class="iconfont icon-Add"></i> </el-button>
            </span>
            <el-button size="mini">
              <i class="iconfont icon-shoucangjia2"> {{ $helpers.encloseNumber(curLb.subscribedCount) }}</i>
            </el-button>
            <el-button size="mini">
              <i class="iconfont icon-ArtboardCopy"> {{ $helpers.encloseNumber(curLb.shareCount) }}</i>
            </el-button>
            <el-button size="mini">
              <i class="iconfont icon-Clouddownload"> </i>
            </el-button>
            <el-button size="mini">
              <i class="iconfont icon-message">{{ $helpers.encloseNumber(curLb.commentCount) }}</i>
            </el-button>
          </div>
        </div>
      </div>

      <!-- Left Middle Part: Playlist(tracks) -->
      <TracksTable :showTitle="true" :playCount="$helpers.formatNumberWithTS(curLb.playCount)" :tableData="lbTracks" />

      <!-- Left Bottom Part: Comments-->
      <div class="ld-comments">
        <h1 class="comments-title">{{ comments.length + " Comments" }}</h1>
        <Comment v-for="item in comments" :key="item.time" :content="item.content" :name="item.user.nickname"
          :avatar="item.user.avatarUrl" :likedCount="item.likedCount" :time="item.time"></Comment>
      </div>
    </div>

    <!-- Page Right Part -->
    <div class="leaderboard-list">
      <div v-for="(item, index) in leaderboards" class="leaderboard-card" @click="setSelected(index)"
        :class="{ 'active-card': index == curSelected }" :key="item.updateTime">
        <img class="leadbaord-cover" v-lazy="$helpers.getSmallPicture(item.coverImgUrl, 50)" alt="" />
        <div class="leaderboard-desc">
          <div class="name">{{ item.name }}</div>
          <div class="update-freq">{{ item.updateFrequency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllLeaderboards,
  getPlaylistDetail,
  getPlaylistComments
} from "@/network/request";
import TracksTable from "@/components/pure-com/TracksTable";
import Comment from "@/components/pure-com/Comment";

export default {
  data() {
    return {
      leaderboards: [], // all leaderboards
      curSelected: 15, // the 15th is US billboard by default
      curLb: {}, // current selected leaderboard
      lbTracks: [], // tracks in selected leaderboard
      comments: []
    };
  },

  components: {
    Comment,
    TracksTable
  },

  methods: {
    setSelected(index) {
      this.curSelected = index;
      this.curLb = this.leaderboards[index];
      this.$nextTick(() => {
        this.$refs.wrapper.scrollIntoView({ behavior: "smooth" });
      });
    },

    async getLeaderboardDetail(id) {
      let { data } = await getPlaylistDetail({ id });
      let { shareCount, commentCount, playCount } = data.playlist;

      this.lbTracks = [];
      data.playlist.tracks.forEach(item => {
        let { name, id, dt: duration } = item;
        duration = this.$helpers.convertMsToMinutes(duration);
        let album = item.al; // item.al.name;
        let artists = item.ar; //item.ar[0].name;
        let coverUrl = item.al.picUrl;
        this.lbTracks.push({ id, name, duration, album, artists, coverUrl });
      });

      // Add more information to current leaderboard (as the results from getAllLeaderboards()
      // request doesn't contain the following attributes)
      this.curLb = {
        ...this.curLb,
        shareCount,
        commentCount,
        playCount,
        tracksCount: this.lbTracks.length
      };
    },

    async getLeaderboardComments(id) {
      let { data } = await getPlaylistComments({ id });
      this.comments = data.comments;
    }
  },

  watch: {
    async curSelected() {
      await this.getLeaderboardDetail(this.curLb.id);
      await this.getLeaderboardComments(this.curLb.id);
    }
  },

  async created() {
    let { data } = await getAllLeaderboards();

    data.list.forEach(list => {
      let {
        updateFrequency,
        trackUpdateTime,
        updateTime,
        trackCount,
        commentThreadId,
        coverImgUrl,
        description,
        trackNumberUpdateTime,
        playCount,
        subscribedCount,
        name,
        id,
        ToplistType
      } = list;

      this.leaderboards.push({
        updateFrequency,
        trackUpdateTime,
        updateTime,
        trackCount,
        commentThreadId,
        coverImgUrl,
        description,
        trackNumberUpdateTime,
        playCount,
        subscribedCount,
        name,
        id,
        ToplistType
      });
    });

    // The featured page route is pushed with `params` not `query` option
    let routeLdId = this.$route.params.id || 0;

    for (const index in this.leaderboards) {
      if (this.leaderboards[index].id === +routeLdId) {
        this.curSelected = index;
        break;
      }
    }

    this.curLb = this.leaderboards[this.curSelected];
    await this.getLeaderboardDetail(this.curLb.id);
    await this.getLeaderboardComments(this.curLb.id);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.leaderboards {
  padding-top: 20px;
  @include flex-align(row, flex-start, flex-start);
}

// Left Part -- Top area styles
.leaderboard-wrapper {
  flex: 1;
  min-width: 800px;

  .leaderboard-detail {
    width: 800px;
    margin: 0 auto;
    @include flex-align(row, flex-start);
  }

  .img-wrapper {
    width: 110px;
    height: 110px;
    margin-right: 15px;
  }

  .leaderboard-details {
    height: 110px;
    padding: 3px 0;
    text-align: left;
    @include flex-align(column, space-between, flex-start);
    .name {
      font-weight: bold;
    }

    .update-time i::before {
      padding-left: 0 !important;
    }

    .update-time i,
    .description {
      font-size: 12px;
    }

    .social > span > button {
      padding: 7px 5px;
    }
    .social > span > button:nth-child(1) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .social > span > button:nth-child(2) {
      margin-left: 0.8px;
      margin-right: 10px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}

// Left Part -- Bottome comments styles
.ld-comments {
  margin: 30px 0;
  text-align: left;
  .comments-title {
    margin: 10px 0;
    font-weight: bold;
  }
}

// Right Part styles
.leaderboard-list {
  width: 280px;

  padding-bottom: 20px;
  margin-left: 20px;

  .active-card {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .leaderboard-card {
    @include flex-align(row, flex-start);
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    img {
      padding-right: 10px;
    }

    .leaderboard-desc {
      padding: 5px 0;
      height: 50px;
      font-size: 14px;

      @include flex-align(column, space-between, flex-start);
      .name {
        font-weight: 600;
        flex-shrink: 0;
      }
      .upate-freq {
        color: lightgray;
      }
    }
  }
}
</style>
