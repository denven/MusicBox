<template>
	<div class="container">
		<div class="text" :class="{ 'expand-text': btnData.bExpanded }">
			{{ text }}
		</div>
		<div class="toggle-btn">
			<el-button size="mini" type="text" @click="toggleTextExpand" v-if="text.length > maxLength"
				>{{ btnData.caption }}
			</el-button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["text", "maxLength"],
	data() {
		return {
			btnData: { bExpanded: false, caption: "Expand" },
		};
	},
	methods: {
		toggleTextExpand() {
			this.btnData.bExpanded = !this.btnData.bExpanded;
			if (this.btnData.caption === "Expand") {
				this.btnData.caption = "Fold";
			} else {
				this.btnData.caption = "Expand";
			}
		},
	},

	async created() {
		if (this.text.length > this.maxLength) {
			this.btnData.bExpanded = false;
		} else {
			this.btnData.bExpanded = false;
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.expand-text {
	display: block !important; // !important is needed, as this class has the same specificity with .text
	// -webkit-line-clamp: 10 !important;  // ttis canot be zero(invalid value), it must be greater than 0
}

.text {
	@include text-ellipsis-ml(2);
	.title {
		font-weight: bold;
		margin-bottom: 5px;
	}
}

.toggle-btn {
	text-align: right;
	button {
		width: 60px;
	}
}
</style>
