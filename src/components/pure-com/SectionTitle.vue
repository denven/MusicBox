<template>
  <div class="section">
    <div class="title">
      <slot></slot>
      <span>{{ title }}</span>
    </div>

    <div class="button" @click="gotoRoute">
      More
      <i class="iconfont icon-more-v"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
  props: ["title", "routePath"],
  methods: {
    gotoRoute() {
      if (!this.routePath) return;

      if (this.routePath === "/leaderboards") {
        this.$router.push({ name: "Leaderboards" });
      } else {
        this.$router.push(this.routePath);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.scss";

.section {
  width: 100%;
  height: 20px;
  padding: 20px 0;
  border-bottom: 2px solid $theme-primary-color;
  margin-top: 20px;

  @include flex-align(row, space-between);

  .title {
    color: $theme-primary-color;
    font-size: 18px;
    font-weight: 600;

    span {
      margin-left: 10px;
    }
  }
  .button {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  i {
    color: $theme-primary-color !important;
  }
}
</style>
