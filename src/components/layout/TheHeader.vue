<template>
  <div class="header">
    <div class="left">
      <div class="icon nav-buttons">
        <div class="logo" @keyup.enter="gotoHomePage" title="Return to Home"></div>
        <!-- <i
					class="icon el-icon-s-home"
					@click="gotoHomePage"
					title="Return to Home"
        ></i>-->
        <i class="icon el-icon-full-screen" @click="toggleFullScreen" title="Toogle Fullscrenn"></i>
        <i class="icon el-icon-arrow-down"></i>
        <i class="icon el-icon-arrow-left"></i>
        <i class="icon el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="right">
      <div class="search-wrapper">
        <input
          class="search"
          @keyup.enter="search"
          type="text"
          v-model="keywords"
          placeholder="Song Artist Album"
        />
        <i class="icon el-icon-search" title="Return to Home"></i>
      </div>
      <div class="theme">
        <i class="icon el-icon-s-custom"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ""
    };
  },

  methods: {
    gotoHomePage() {
      this.$router.push(`/`);
    },
    toggleFullScreen() {
      const ele = document.documentElement;

      /* Enter Fullscrenn */
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        /* Firefox */
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        /* IE/Edge */
        ele.msRequestFullscreen();
      }

      /* Exit fullscreen */
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        // console.log("Chrome, Safari and Opera");
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    search() {
      if (this.keywords) {
        this.$router.push(`/search?keywords=${this.keywords}`);
      } else {
        this.$message({
          type: "warning",
          message: "Please type some keywords to search!",
          duration: 3000
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixin.scss";

.header {
  @include flex-align();
  position: fixed;
  z-index: 10000;
  width: 100vw;
  height: $header-height;
  padding: 0 20px;
  background-color: $header-bg-color;

  .left {
    @include flex-align();
    width: $header-left-width;
    .nav-buttons {
      width: 180px;
      @include flex-align(row, space-between, center);
      cursor: pointer;
    }

    .logo {
      width: 25px;
      height: 25px;
      background: url("../../assets/images/logo.png") no-repeat top center;
      background-size: 25px;
      border-radius: 50%;
    }
  }

  .right {
    @include flex-align();
    width: $header-right-width;
  }

  .icon {
    color: white;
  }

  .search-wrapper {
    position: relative;

    input {
      height: 1.5rem;
      padding-left: 30px;
      border-radius: 20px;
      border: none;
      outline: none;
    }

    i {
      position: absolute;
      color: grey;
      top: 5px;
      left: 10px;
    }
  }
}
</style>
