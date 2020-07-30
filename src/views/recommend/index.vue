<template>
	<div class="recommend">
		<Banner />
		<TopPlayedList class="section-content" />
		<NewReleases class="section-content" />
	</div>
</template>

<script>
import Banner from "./Banner";
import TopPlayedList from "./TopPlayedList";
import NewReleases from "./NewReleases";

export default {
	components: {
		Banner,
		TopPlayedList,
		NewReleases,
	},
};
</script>

<style></style>
