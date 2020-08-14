<template>
  <div class="song-list">
    <div class="separator" v-if="showTitle">
      <div>
        <span class="title">Tracks List</span><span class="song-count">{{ countString }} </span>
      </div>
      <span class="play-count" v-if="playCount > 0">
        Played: <span class="font-bold">{{ playCount }}</span>
      </span>
    </div>

    <div class="songs-table">
      <el-table stripe style="width: 100%" :data="tableData">
        <!-- Mask and replace the default hint text -->
        <template slot="empty">
          <p>Requesting Data...</p>
        </template>
        <!-- 1: index -->
        <el-table-column type="index" width="50"></el-table-column>
        <!-- 2: tracks -->
        <el-table-column prop="name" label="Track">
          <template class="name-wrapper" slot-scope="scope">
            <img v-lazy="$helpers.getSmallPicture(scope.row.coverUrl, 50)" alt="" />
            <span class="name" style="margin-left: 10px">{{ scope.row.name }}</span>
            <div class="buttons">
              <!-- <i class="iconfont icon-bofang1" @click="playAudio(scope.row)"></i> -->
              <TrackButton :track="scope.row" />
              <i class="iconfont icon-add1"></i>
            </div>
          </template>
        </el-table-column>
        <!-- 3: album -->
        <el-table-column prop="album" label="Album" width="220px">
          <!-- {{ scope.row.album.name }} -->
          <template slot-scope="scope">
            <AlbumName :album="scope.row.album" />
          </template>
        </el-table-column>
        <!-- 4: artists -->
        <el-table-column prop="artists" label="Artist(s)" width="150px">
          <template slot-scope="scope">
            <ArtistName v-for="(item, index) in scope.row.artists" :artist="item" :key="item.id" :updateAvatar="true">
              <span v-if="index < scope.row.artists.length - 1">,</span>
            </ArtistName>
          </template>
        </el-table-column>
        <!-- 5: duration -->
        <el-table-column prop="duration" label="Duration" width="80px"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import TrackButton from "@/components/pure-com/TrackButton";
import ArtistName from "@/components/pure-com/ArtistName";
import AlbumName from "@/components/pure-com/AlbumName";

export default {
  name: "TracksTable",
  props: ["showTitle", "playCount", "tableData"],
  components: { TrackButton, ArtistName, AlbumName },

  computed: {
    countString() {
      if (this.tableData.length > 1) {
        return this.tableData.length + " tracks";
      } else {
        return this.tableData.length + " track";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.song-list {
  width: 100%;
  margin-bottom: 20px;

  .separator {
    height: 50px;
    padding: 5px;
    margin-top: 20px;
    border-bottom: 2px solid $theme-primary-color;
    @include flex-align(row, space-between);
    div > .title {
      font-size: 20px;
      font-weight: bold;
    }
    div > .song-count {
      font-size: 12px;
      padding-left: 10px;
    }
    .play-count {
      font-size: 12px;
      span {
        color: $theme-primary-color;
        font-weight: bold;
      }
    }
  }

  /deep/tr td:nth-child(2) .cell {
    @include flex-align(row, flex-start, center);
    img {
      width: 50px;
    }

    &:hover {
      cursor: pointer;
      .name {
        text-decoration: underline;
      }
    }

    .name {
      flex: 1;
    }

    .buttons {
      width: 100px;
      padding-left: 10px;
      @include flex-align(row, flex-start, center);
      i {
        padding-right: 0 5px;
        &:nth-child(1) {
          color: $theme-primary-color;
        }
      }
    }
  }
}
</style>
