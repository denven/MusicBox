<template>
	<div class="progress-bar" ref="progressbar">
		<div class="progress-line" :style="updateBarPosition" ref="progressline">
			<div
				class="progress-dot"
				:style="updateDotPosition"
				ref="progressdot"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProgressBar",
	props: {
		dotSize: {
			type: Number,
			default: 6,
			required: false,
			validator: (val) => {
				return val >= 6;
			},
		},
		barHeight: {
			type: Number,
			default: 4,
			required: false,
			validator: (val) => {
				return val >= 4;
			},
		},
		barColor: {
			type: String,
			default: "red",
			required: false,
		},
		barBgColor: {
			type: String,
			default: "black",
			required: false,
		},
		percent: {
			type: Number,
			default: 0,
			required: false,
		},
	},

	data() {
		return {
			curBarWidth: 0,
			curDotPosition: 0,
			barTotalWidth: 10,
		};
	},

	methods: {
		loadCustomizedStyles() {
			if (this.barHeight > this.dotSize) {
				this.dotSize = this.barHeight; //not suggested to override default prop
			}

			this.percentage = this.percent; // default percentage

			this.$refs.progressline.style.height = this.barHeight + "px";

			this.$refs.progressdot.style.width = this.dotSize + "px";
			this.$refs.progressdot.style.height = this.dotSize + "px";

			this.$refs.progressdot.style.top =
				"-" + (this.dotSize - this.barHeight) / 2 + "px";
			this.$refs.progressbar.style.borderRadius = this.barHeight / 2 + "px";
			this.$refs.progressline.style.borderRadiusLeft =
				this.barHeight / 2 + "px";
			this.$refs.progressline.style.borderBottomLeftRadius =
				this.barHeight / 2 + "px";

			this.$refs.progressline.style.borderTopLeftRadius =
				this.barHeight / 2 + "px";

			this.$refs.progressbar.style.backgroundColor = this.barBgColor;
			this.$refs.progressline.style.backgroundColor = this.barColor;
			this.$refs.progressdot.style.backgroundColor = this.barColor;

			this.curBarWidth = this.dotSize / 2;
			this.curDotPosition = 0;

			console.log(this.$refs.progressbar.getBoundingClientRect());
			this.barTotalWidth = this.$refs.progressbar.getBoundingClientRect().width;
		},

		screenResize() {
			let barTotalWidth = this.barTotalWidth;
			try {
				barTotalWidth = this.$refs.progressbar.getBoundingClientRect().width;
			} catch (error) {
				barTotalWidth = this.barTotalWidth;
				console.log("Cannot get elements reference");
			}
			this.barTotalWidth = barTotalWidth;
		},
	},

	computed: {
		percentage() {
			console.log("new percentage", this.percent);
			return this.percent;
		},

		// change progress-line styles by progress percentage
		updateBarPosition() {
			let dotRadius = this.dotSize / 2;
			// console.log("computed bar postion:", dotRadius, this.barTotalWidth);

			// Cannot assign this.dotCurPosition =, it will generate side-effects
			// let barTotalWidth = this.getBarTotalWidth();
			let dotCurPosition =
				((this.barTotalWidth - this.dotSize) * this.percentage) / 100;
			let barCurrentWidth = dotCurPosition + dotRadius;

			return {
				width: barCurrentWidth + "px",
			};
		},

		// change progress-dot styles
		updateDotPosition() {
			let dotCurPosition =
				((this.barTotalWidth - this.dotSize) * this.percentage) / 100;

			return {
				left: dotCurPosition + "px",
			};
		},
	},

	mounted() {
		this.loadCustomizedStyles();
		document.addEventListener("resize", this.screenResize, false);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.progress-bar {
	// margin: 0 auto;
	// width: 50%;

	.progress-line {
		position: relative;

		.progress-dot {
			position: absolute;
			top: -3px;
			left: -3px;
			border-radius: 50%;
		}
	}
}
</style>
