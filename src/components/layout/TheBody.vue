<template>
  <div class="body">
    <MenuToggle @toggle="setMenuStatus" />
    <ul class="nav" v-if="bShowMenu">
      <!-- Use iconfont icons -->
      <li class="nav-item">
        <!-- 0.Discover Music contains playlists, albums, leaderboards -->
        <router-link to="/featured">
          <i class="iconfont icon-rebang">Featured</i>
        </router-link>
      </li>

      <!-- 1. Leaderboards by category id -->
      <li class="nav-item">
        <router-link to="/leaderboards">
          <i class="iconfont icon-paihangbang1">Leaderboards</i>
        </router-link>
      </li>

      <!-- 2. Playlists by category -->
      <li class="nav-item">
        <router-link to="/playlists">
          <i class="iconfont icon-gedan">Playlists</i>
        </router-link>
      </li>

      <!-- 3. Singers -->
      <li class="nav-item">
        <router-link to="/artists">
          <i class="iconfont icon-artist">Artists</i>
        </router-link>
      </li>

      <!-- 4. MVs -->
      <li class="nav-item">
        <router-link to="/videos">
          <i class="iconfont icon-mv4">Videos</i>
        </router-link>
      </li>

      <!-- 5. Albums -->
      <li class="nav-item">
        <router-link to="/albums">
          <i class="iconfont icon-album">Albums</i>
        </router-link>
      </li>

      <!-- 6. Podcasts Channels -->
      <li class="nav-item">
        <router-link to="/podcasts">
          <i class="iconfont icon-podcast">Podcasts</i>
        </router-link>
      </li>
    </ul>

    <div class="content">
      <!-- :key is added for forcing updating view when search submisions are more than once -->
      <!-- but the keywords should be different to activate a new search -->
      <router-view class="content-vertical-align" :key="$route.path + $route.query.keywords" />
    </div>
  </div>
</template>

<script>
// import Featured from "@/views/featured/";
import MenuToggle from "@/components/pure-com/MenuToggle";

export default {
  components: {
    MenuToggle
  },

  data() {
    return {
      bShowMenu: true
    };
  },

  methods: {
    setMenuStatus(menuStatus) {
      this.bShowMenu = menuStatus;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/universal.scss";
@import "@/assets/styles/mixin.scss";

.body {
  width: 100vw;
  height: calc(100vh - #{$header-height});
  background-color: beige;
  padding-top: $header-height;
  position: relative;

  display: flex;

  @include flex-align(row, space-between, flex-start);

  .nav {
    width: 200px;
    height: 100%;
    background-color: #ededed;
    padding-top: 10px;
    transition: all 3s linear 0s;

    li {
      width: 100%;
      // padding: 10px 0px;
      text-align: left;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      a {
        display: block;
        padding: 10px 20px;
        height: 100%;
        width: 100%;
      }

      a.router-link-active {
        background-color: rgba(0, 0, 0, 0.1);
        i {
          color: $theme-primary-color !important;
        }
      }
    }
  }

  .content {
    // float: 1;
    flex: 1;
    // width: calc(100% - 200px);
    height: 100%;
    overflow: auto;
  }
}
</style>
