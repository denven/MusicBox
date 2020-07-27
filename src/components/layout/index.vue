<template>
	<div class="layout">
		<Header />
		<Body />
	</div>
</template>

<script>
import Header from "./TheHeader";
import Body from "./TheBody";

export default {
	components: {
		Header,
		Body,
	},
};
</script>

<style lang="scss" scoped>
.layout {
}
</style>
