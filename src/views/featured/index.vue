// This is the home page
<template>
  <div>
    <Banner />
    <TopPlaylists class="section-content" />
    <NewReleases class="section-content" />
    <NewLeaderboards class="section-content" />
  </div>
</template>

<script>
import Banner from "./Banner";
import TopPlaylists from "./TopPlaylists";
import NewReleases from "./NewReleases";
import NewLeaderboards from "./NewLeaderboards";

export default {
  components: {
    Banner,
    TopPlaylists,
    NewReleases,
    NewLeaderboards
  }
};
</script>

<style></style>
