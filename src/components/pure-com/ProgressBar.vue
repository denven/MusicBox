<template>
  <div class="progress-bar" @click="mouseClick" ref="progressbar">
    <div class="progress-line" :style="updateBarPosition" ref="progressline">
      <div class="progress-dot" :style="updateDotPosition" @mousedown="mouseDown" ref="progressdot"></div>
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
      validator: val => {
        return val >= 6;
      }
    },
    barHeight: {
      type: Number,
      default: 4,
      required: false,
      validator: val => {
        return val >= 4;
      }
    },
    barColor: {
      type: String,
      default: "red",
      required: false
    },
    barBgColor: {
      type: String,
      default: "black",
      required: false
    },
    percent: {
      type: Number,
      default: 0,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  model: {
    prop: "percent",
    event: "change"
  },
  data() {
    return {
      curBarWidth: 0,
      barTotalWidth: 0,
      // changes during dragging(when dot is selected and moved)
      curDotPosition: {
        isDrag: false,
        left: 0,
        xOffest: 0
      }
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

      // console.log(this.$refs.progressbar.getBoundingClientRect());
      this.barTotalWidth = this.$refs.progressbar.getBoundingClientRect().width;
      console.log(
        "总宽",
        this.$refs.progressbar.getBoundingClientRect(),
        this.barTotalWidth
      );
    },

    removePxInString(str) {
      if (!str) {
        return 0;
      }

      return parseInt(str.slice(0, str.length - 2));
    },

    // prepare initial position values for latter calculation of dot and bar move
    mouseDown(event) {
      if (this.disabled) return;

      this.curDotPosition.isDrag = true;

      const dotEle = this.$refs.progressdot;

      this.curDotPosition.left = this.removePxInString(dotEle.style.left);
      console.log("Initial left: ", this.curDotPosition.left);
      this.curDotPosition.xOffest = event.touches
        ? event.touches[0].clientX
        : event.clientX;

      event.preventDefault();
      event.stopPropagation();
    },

    // the purpose is to calculate the new percent value, then the position will be updated
    // simultaneously by the computed properties(attached to the dot/line style properties)
    // it also emits a change event with new a value to notify the component user
    mouseMove(event) {
      if (this.disabled) return;

      // only response when dot is clicked
      if (this.curDotPosition.isDrag) {
        console.log("in dragging...");

        const clientX = event.touches
          ? event.touches[0].clientX
          : event.clientX;

        let xDistance = clientX - this.curDotPosition.xOffest;
        let maxValidDistance = this.barTotalWidth - this.dotSize;
        let xMaxValidRight = maxValidDistance - this.curDotPosition.left;
        let xMaxValidLeft = this.curDotPosition.left;

        console.log(
          "clientX",
          clientX,
          "XOffset:",
          this.curDotPosition.xOffest,
          "moved XDistance:",
          xDistance,
          "ValidMaxDistance:",
          maxValidDistance,
          "xMaxValidRight:",
          xMaxValidRight,
          "xMaxValidLeft",
          xMaxValidLeft,
          "OriginLeft:",
          this.curDotPosition.left
        );

        if (xDistance > 0) {
          if (xDistance > xMaxValidRight) {
            console.log("超出右边界");
            this.curDotPosition.xOffest += xMaxValidRight;
            this.curDotPosition.left = maxValidDistance;
          } else {
            console.log("合理右移动");
            this.curDotPosition.xOffest = clientX;
            console.log("合理右移动", this.curDotPosition.left);
            this.curDotPosition.left += xDistance;
            console.log("合理右移动", this.curDotPosition.left, xDistance);
          }
        } else {
          if (xDistance + xMaxValidLeft <= 0) {
            this.curDotPosition.xOffest -= this.curDotPosition.left;
            this.curDotPosition.left = 0;
          } else {
            this.curDotPosition.xOffest = clientX;
            this.curDotPosition.left += xDistance;
          }
        }
        console.log("New Left is:", this.curDotPosition.left);
        let oldPercent = this.percent;

        // this behavior changes the prop value which is not favarable
        let newPercent = (
          (100 * this.curDotPosition.left) /
          maxValidDistance
        ).toFixed(2);

        // Do not emit too frequently
        if (Math.abs(newPercent - oldPercent) > 0.1) {
          // this.$emit("change", newPercent === "0.00" ? 0 : newPercent);
          this.$emit("change", +newPercent);
        }
        console.log(
          this.percent,
          this.curDotPosition.left,
          this.curDotPosition.xOffest,
          newPercent,
          maxValidDistance
        );
      }
    },

    mouseUp() {
      console.log("drag done!");
      this.curDotPosition.isDrag = false;
    },

    // Update percent prop here as mouseMove
    mouseClick(event) {
      if (this.disabled) return;

      console.log(
        "Clicked...",
        event.clientX,
        this.$refs.progressbar.getBoundingClientRect()
      );
      let mouseClientX = event.clientX;

      // this left value is not the dot style.left value.
      const {
        x: dotClientX,
        left: dotLeft
      } = this.$refs.progressdot.getBoundingClientRect();
      console.log(
        "dotX dotLeft, clickX, totalWidth",
        dotClientX,
        dotLeft,
        mouseClientX,
        this.barTotalWidth
      );

      this.barTotalWidth = this.$refs.progressbar.getBoundingClientRect().width;
      let maxValidDistance = this.barTotalWidth - this.dotSize;
      let oldPercent = this.percent;
      let dotOldStyleLeft = (oldPercent * maxValidDistance) / 100;
      let dotNewStyleLeft = dotOldStyleLeft + mouseClientX - dotClientX;

      let newPercent = Math.min(
        ((100 * dotNewStyleLeft) / maxValidDistance).toFixed(2),
        100
      );

      console.log("old and new left", dotOldStyleLeft, dotNewStyleLeft);
      console.log("old and new percent", oldPercent, newPercent);

      // this.percent = newPercent;  //no need to change the prop
      if (Math.abs(newPercent - oldPercent) > 0.1) {
        // this.$emit("change", newPercent === "0.00" ? 0 : newPercent);
        this.$emit("change", +newPercent);
      }
    },

    screenResize() {
      try {
        let barTotalWidth = this.$refs.progressbar.getBoundingClientRect()
          .width;
        this.barTotalWidth = barTotalWidth;
        console.log("resizing get elements reference");
      } catch (error) {
        console.log("Cannot get elements reference");
      }
    }
  },

  computed: {
    percentage() {
      // console.log("new percentage", this.percent);
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
        width: barCurrentWidth + "px"
      };
    },

    // change progress-dot styles
    updateDotPosition() {
      let dotCurPosition =
        ((this.barTotalWidth - this.dotSize) * this.percentage) / 100;

      return {
        left: dotCurPosition + "px"
      };
    }
  },

  mounted() {
    this.loadCustomizedStyles(); // this.barTotalWidth is loaded here
    window.addEventListener("resize", this.screenResize, false);
    document.addEventListener("mousemove", this.mouseMove, false);
    document.addEventListener("mouseup", this.mouseUp, false);
    // window.addEventListener("beforeunload", this.pageFresh, false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.progress-bar {
  // margin: 0 auto;
  width: 50%;
  cursor: pointer;

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
