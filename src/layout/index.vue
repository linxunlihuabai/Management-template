<template>
  <div  class="app-wrapper">
    <div class="banner">
      <img src="@/assets/images/logo.png" alt="">
      <h1 class="title-font">江西核工业地质局安全生产管理系统</h1>
    </div>
    <navbar />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
  },
  methods: {
  },
    watch:{
    $router(to,from){

        console.log(to,'ss');

        console.log(from);

    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.banner {
  display: flex;
  align-items: center;
  background-color: #e2ecf4;
  img {
    display: block;
    width: 130px;
    height: 110px;;
  }
  h1{
    font-size: 4rem;
    color: #409EFF;
  }
}
</style>
