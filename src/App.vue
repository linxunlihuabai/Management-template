<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.zhou-box-card {
  width: 40%;
  text-align: center;
  margin:auto;
  font-size: 18px;
}

/* 去除左下角没有百度地图的logo和版本信息 */
.BMap_cpyCtrl,
    .anchorBL {
      display: none;
    }
</style>
