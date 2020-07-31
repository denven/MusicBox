<template>
	<div>
		<Banner />
		<TopPlaylists class="section-content" />
		<NewReleases class="section-content" />
		<NewLeadboards class="section-content" />
	</div>
</template>

<script>
import Banner from "./Banner";
import TopPlaylists from "./TopPlaylists";
import NewReleases from "./NewReleases";
import NewLeadboards from "./NewLeadboards";

export default {
	components: {
		Banner,
		TopPlaylists,
		NewReleases,
		NewLeadboards,
	},
};
</script>

<style></style>
