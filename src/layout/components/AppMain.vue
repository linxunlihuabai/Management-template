<template>
  <div class="main">
    <sidebar class="sidebar-container" :slider="slider" />
    <section class="app-main">
      <router-view />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Sidebar } from '../components'
export default {
  name: 'AppMain',
  components: {
    Sidebar
  },
  data() {
    return {
      slider: {},
      index: 0
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  watch: {
    $route: {
      handler: function(to, from) {
        this.slider = this.permission_routes.filter(item => {
          return item.path == to.meta.origin
        })[0]
        // console.log(this.permission_routes)
        // console.log(this.slider,to.meta.origin)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
  display: flex;
  width: 100%;
}

.app-main {
  position: relative;
  overflow: hidden;
  flex-grow: 1;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
