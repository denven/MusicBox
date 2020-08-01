<template>
	<div class="layout">
		<Header />
		<Body />
		<Footer />
	</div>
</template>

<script>
import Header from "./TheHeader";
import Body from "./TheBody";
import Footer from "./TheFooter";

export default {
	components: {
		Header,
		Body,
		Footer,
	},
};
</script>

<style lang="scss">
.layout {
}
</style>
