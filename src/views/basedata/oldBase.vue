<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <!-- 地图 -->
      <el-row>
        <el-col :span="24">
          <div id="bmap" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var map = new BMap.Map('bmap')
    // 中心位置在甘肃，然后5倍速
    map.centerAndZoom(new BMap.Point(104.769128, 34.972443), 5)
    var data_info = [
      [106.653298, 29.732213, '重庆江北国际机场'],
      [115.807698, 28.662684, '地址：南昌市红谷滩新区学府大道999号'],
      [116.412222, 39.912345, '地址：北京市东城区正义路甲5号']
    ]
    var opts = {
      width: 250, // 信息窗口宽度
      height: 60, // 信息窗口高度
      title: '信息窗口', // 信息窗口标题
      enableMessage: true // 设置允许信息窗发送短息
    }
    for (var i = 0; i < data_info.length; i++) {
      // eslint-disable-next-line no-undef
      var marker = new BMap.Marker(
        new BMap.Point(data_info[i][0], data_info[i][1])
      )
      // 创建标注
      var content = data_info[i][2]
      map.addOverlay(marker)
      // 将标注添加到地图中
      addClickHandler(content, marker)
    }
    function addClickHandler(content, marker) {
      marker.addEventListener('click', function(e) {
        openInfo(content, e)
      })
    }
    function openInfo(content, e) {
      var p = e.target
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
      var infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, point) // 开启信息窗口
    }
    // 右键放大
    var txtMenuItem = [
      {
        text: '放大',
        callback: function() {
          map.zoomIn()
        }
      },
      {
        text: '缩小',
        callback: function() {
          map.zoomOut()
        }
      }
    ]
    var menu = new BMap.ContextMenu()
    // eslint-disable-next-line no-redeclare
    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100))
    }
    // 右键放大
    map.addContextMenu(menu)
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
  }
}
</script>

<style scoped>
#bmap {
  height: 520px;
}
</style>
