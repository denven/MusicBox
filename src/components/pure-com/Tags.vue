<template>
	<div class="tags">
		<span>Tags: </span>
		<span class="tag">
			<el-tag size="size" effect="dark" v-for="(tag, index) in data" :type="colors[index % 4]" :key="tag"
				>{{ tag }}
			</el-tag>
		</span>
	</div>
</template>

<script>
export default {
	name: "Tags",
	props: {
		data: Array,
		size: String,
	},

	data() {
		return {
			colors: ["success", "info", "warning", "danger"],
		};
	},
};
</script>

<style lang="scss" scoped>
.tags {
	font-size: 14px;
	/deep/.el-tag {
		margin: 0 5px !important;
	}
}
</style>
