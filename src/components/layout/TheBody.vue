<template>
  <div class="body">
    <ul class="nav">
      <!-- Use iconfont icons -->
      <li class="nav-item">
        <!-- 0.Discover Music contains playlists, albums, leadboards -->
        <router-link to="/featured">
          <i class="iconfont icon-rebang">Featured</i>
        </router-link>
      </li>

      <!-- 1. Leadboards by category id -->
      <li class="nav-item">
        <router-link to="/leadboards">
          <i class="iconfont icon-paihangbang1">Leadboard</i>
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
          <i class="iconfont icon-artist">All Artists</i>
        </router-link>
      </li>

      <!-- 4. MVs -->
      <li class="nav-item">
        <router-link to="/music-videos">
          <i class="iconfont icon-mv4">Music Videos</i>
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

export default {
  // components: { Featured },
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

  @include flex-align(row, space-between, flex-start);

  .nav {
    width: 200px;
    height: 100%;
    background-color: #ededed;
    padding-top: 10px;

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
      }
    }
  }

  .content {
    float: 1;
    width: calc(100% - 200px);
    height: 100%;
    overflow: auto;
  }
}
</style>
