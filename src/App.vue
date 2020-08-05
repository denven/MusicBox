<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "@/components/layout/index.vue";

export default {
  components: { Layout }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// change loader default style, temporally not work here
.el-loading-spinner .path {
  stroke: $theme-primary-color !important;
}

.el-loading-spinner,
.el-loading-text,
.el-icon-loading {
  color: $theme-primary-color !important;
}
</style>
