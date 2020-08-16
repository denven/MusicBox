<template>
  <div id="newleaderboards" v-if="tableData.length > 0">
    <SectionTitle :title="'Latest Leaderboards'" :routePath="'/leaderboards'">
      <i class="iconfont icon-paihangbang1"></i>
    </SectionTitle>
    <table class="el-table">
      <thead>
        <th v-for="item in leaderboards" :key="item.id">{{ item.name }}</th>
      </thead>
      <tbody>
        <tr v-for="(rowData, rowIdx) in tableData" :key="rowIdx">
          <td v-for="(track, colIdx) in rowData" :key="colIdx">
            <div class="playlist">
              <span class="no">{{ rowIdx + 1 }}</span>
              <div class="item-wrapper">
                <span class="name">{{ track.name }}</span>
                <div class="buttons">
                  <!-- <i class="iconfont icon-bofang1" @click="playAudio(track)"></i> -->
                  <TrackButton :track="track" />
                  <i class="iconfont icon-add1"></i>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="tableData.length > 0">
          <td class="viewAll" v-for="item in leaderboards" :key="item.name">
            <el-button size="small" type="danger" @click="gotoRoute(item.id)">View Full List</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SectionTitle from "@/components/pure-com/SectionTitle";
import TrackButton from "@/components/pure-com/TrackButton";

import { getPlaylistDetail } from "@/network/request";

export default {
  data() {
    return {
      leaderboards: [],
      tableData: []
    };
  },

  components: {
    SectionTitle,
    TrackButton
  },

  methods: {
    gotoRoute(id) {
      this.$router.push({ name: "Leaderboards", params: { id } });
    }
  },

  // leaderboards ids: 60198, 180106, 11641012, 120001
  async created() {
    let timestamp = Date.now();
    let data = await Promise.all([
      Promise.resolve(getPlaylistDetail({ id: 60198, limit: 20, timestamp })),
      Promise.resolve(getPlaylistDetail({ id: 180106, limit: 20, timestamp })),
      Promise.resolve(
        getPlaylistDetail({ id: 11641012, limit: 20, timestamp })
      ),
      Promise.resolve(getPlaylistDetail({ id: 120001, limit: 20, timestamp }))
    ]);

    data = data.map(data => {
      let {
        id,
        name,
        desc,
        coverImgUrl,
        trackIds,
        tracks,
        playCount
      } = data.data.playlist;
      return { id, name, desc, coverImgUrl, trackIds, tracks, playCount };
    });

    this.leaderboards = data;

    for (let i = 0; i < 20; i++) {
      this.tableData.push([
        {
          name: data[0].tracks[i].name,
          artist: data[0].tracks[i].al.name,
          id: data[0].trackIds[i].id
        },
        {
          name: data[1].tracks[i].name,
          artist: data[1].tracks[i].al.name,
          id: data[1].trackIds[i].id
        },
        {
          name: data[2].tracks[i].name,
          artist: data[2].tracks[i].al.name,
          id: data[2].trackIds[i].id
        },
        {
          name: data[3].tracks[i].name,
          artist: data[3].tracks[i].al.name,
          id: data[3].trackIds[i].id
        }
      ]);
    }

    this.leaderboards[0].name = "Billboard(Weekly)";
    this.leaderboards[1].name = "UK Charts(Weekly)";
    this.leaderboards[2].name = "iTunes(Weekly)";
    this.leaderboards[3].name = "Hit FM Top(Weekly)";
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

#newleaderboards {
  .playlist {
    display: flex;
    span.no {
      align-self: center;
      justify-self: end;
      width: 20px;
      margin-right: 10px;
      text-align: right;
      vertical-align: middle;
    }

    .item-wrapper {
      flex: 1;
      @include flex-align(row, space-between, center);

      &:hover {
        cursor: pointer;
        .name {
          text-decoration: underline;
        }
      }

      .buttons {
        @include flex-align(row, space-between, center);
        i {
          padding: 0 5px;
          &:nth-child(1) {
            color: $theme-primary-color;
          }
        }
      }
    }
  }

  .el-table th {
    text-align: center;
    background-color: #f4f4f4;
    color: black;
  }

  .el-table td {
    padding-left: 10px;
    padding-right: 10px;
    width: 25%;
  }

  // the first 3 songs are in dark red
  tbody tr:nth-child(-n + 3) .no {
    color: rgb(196, 16, 16);
  }

  table {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #0094ff;
  }

  table th,
  table td {
    border-left: 1px solid #0094ff;
    border-right: 1px solid #0094ff;
  }

  table tr:last-child td {
    border-bottom: 1px solid #0094ff;
    text-align: center;
  }

  table th {
    font-weight: bold;
    background-color: #f4f4f4;
  }

  table tr:nth-child(even) {
    background-color: #f4f4f4;
  }

  table tr:nth-child(odd) {
    background-color: #e8e8e8;
  }
}
</style>
