<template>
  <div>
    <el-menu
      :default-openeds="['1','2']"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location" />
          <span>个人常用菜单</span>
        </template>
        <el-menu-item index="1-1">职业病危害报告处理</el-menu-item>
        <el-menu-item index="1-2">职业病危害报告处理</el-menu-item>
      </el-submenu>
      <template v-if="slider">
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location" />
            <span>{{ slider.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="item in slider.children"
            :key="item.path"
            :index="item.meta.url"
          >
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    slider: {
      type: Object
    }
  },
  data() {
    return {
      tabPosition: 'left',
      defaultActive: this.$route.path
    }
  },
  watch: {
    $route(to, form) {
      this.defaultActive = to.path
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
