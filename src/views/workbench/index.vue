<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <div class="panel-main">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="panel-main-container">
              <div class="panel-main-title">工作提醒</div>
              <div class="panel-main-content">
                <div style="height:200px"></div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="panel-main-container">
              <div class="panel-main-title">信息公告</div>
              <div class="panel-main-content">
                <div style="height:200px"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="panel-main-container">
              <div class="panel-main-title">隐患排查情况统计表</div>
              <div class="panel-main-content">
                <div style="height:200px"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    Breadcrumb
  }
};
</script>

<style lang="scss" scoped>
// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
// .el-col {
//   border-radius: 4px;
// }
// .bg-purple-dark {
//   background: #99a9bf;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
// .grid-content {
//   border-radius: 4px;
//   min-height: 36px;
// }
// .row-bg {
//   padding: 10px 0;
//   background-color: #f9fafc;
// }
</style>