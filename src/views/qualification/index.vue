<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <div class="panel-btns">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="show=true">新建</el-button>
      </div>
      <div class="panel-main">
        <el-row :gutter="20">
          <el-col :xl="6" :lg="8" :md="12" class="qualification-main" v-for="p in 9" :key="p">
            <div class="qualification-content">
              <div class="content">
                <p>企业资质说明</p>
                <div class="qualification-img">
                  <el-image
                    style="width: 300px; height: 300px"
                    :src="url"
                    :preview-src-list="srcList"
                  ></el-image>
                </div>

                <div class="detailed">
                  <span class>企业资质详细介绍</span>
                  <span class="time">时间: 2019-12-12</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 弹出框表单 -->
      <el-dialog 
      append-to-body
      title="添加企业资质" :visible.sync="show" width="800px" :close-on-click-modal="false">
        <el-form ref="form" :model="form" label-width="120px" class="qualification">
          <el-form-item label="企业资质类别">
            <el-select v-model="form.region" placeholder="请选择资质类别">
              <el-option label="等级一" value="shanghai"></el-option>
              <el-option label="等级二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业资质内容">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="资质等级">
            <el-select v-model="form.resource" placeholder="请选择资质等级">
              <el-option label="等级一" value="shanghai"></el-option>
              <el-option label="等级二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="资质有效期">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="form.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="资质扫描上传">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog 
            :visible.sync="dialogVisible"
            append-to-body
            >
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="show=false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      show: false,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      ]
    };
  },
  methods: {
    onSubmit() {
      // console.log(process.env.VUE_APP_SECRET='23135')
      // console.log(process.env.VUE_APP_SECRET)
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
.qualification {
  padding: 20px 10px;
  background-color: #fff;
}

.qualification-main {
  margin-bottom: 20px;
}

.qualification-content {
  padding: 20px 0;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #e5e9f2;
  .content {
    display: inline-block;
    .qualification-img {
      position: relative;
      .mask {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        &:hover {
          opacity: 1;
        }
        .el-icon-zoom-in {
          font-size: 60px;
        }
      }
    }
    .detailed {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .time {
      }
    }
  }
}
</style>

