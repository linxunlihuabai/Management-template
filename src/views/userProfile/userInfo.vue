<template>
  <div class="panel">
    <!-- 个人信息显示面板 -->
    <el-card class="box-card zhou-box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: left;" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
        <span>基本资料</span>
        <el-button style="float: right;" type="text" @click="authenticationClickDialog()">修改</el-button>
      </div>
      <!-- 头像 -->
      <el-row>
        <el-avatar
          shape="square"
          :size="70"
          :src="userInfo.avatar"
          class="imgUser"
        />
      </el-row>
      <el-row>
        <strong class="str">
          <i class="el-icon-user-solid" />用户名称:
        </strong>
        <span class="rightSpan">{{ userInfo.userName }}</span>
      </el-row>
      <el-row>
        <strong class="str" style="padding-left:20px;">
          <i class="el-icon-phone-outline" />手机号:
        </strong>
        <span class="rightSpan">{{ userInfo.responsiblePersonPhone }}</span>
      </el-row>
      <el-row>
        <strong class="str" style="padding-left:68px;">
          <i class="el-icon-map-location" />邮箱地址:
        </strong>
        <span class="rightSpan">{{ userInfo.email }}</span>
      </el-row>
      <el-row>
        <strong class="str" style="padding-left:2px;">
          <i class="el-icon-map-location" />安全负责人:
        </strong>
        <span class="rightSpan">{{ userInfo.responsiblePerson }}</span>
      </el-row>
    </el-card>
    <el-dialog
      ref="authenticationData"
      title="验证身份"
      :visible.sync="authenticationDialog"
      width="400px"
      size="small"
      :before-close="handleClose"
      :model="authenticationData"
    >
      <el-form ref="authenticationData" :model="authenticationData" label-width="60px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="authenticationData.email" />
        </el-form-item>
        <el-row>
          <el-form-item label="验证码" class="captcha" prop="captcha">
            <el-col :span="13">
              <el-input v-model="authenticationData.captcha" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="11" style="padding-left:10px;" class="sendCode">
              <el-button
                v-if="!disabled"
                type="button"
                :disabled="disabled"
                @click="sendCode('authenticationData')"
              >进行邮箱验证</el-button>
              <el-button v-if="disabled" type="button" :disabled="disabled">{{ btntxt }}</el-button>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="successfulAuthentication('authenticationData')"
          >确定</el-button>
          <el-button @click="authenticationDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹出一个修改个人资料 -->
    <el-dialog
      title="修改个人信息"
      :visible.sync="personalEdit"
      width="400px"
      :before-close="handleClose"
      size="small"
    >
      <el-form ref="editPersonal" :model="editPersonal" label-width="100px">
        <!-- <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <el-row>
          <el-avatar
            shape="square"
            :size="70"
            :src="userInfo.avatar"
          />
        </el-row>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editPersonal.email" />
        </el-form-item>
        <el-form-item label="电话" prop="responsiblePersonPhone">
          <el-input v-model="editPersonal.responsiblePersonPhone" />
        </el-form-item>
        <el-form-item label="安全负责人" prop="responsiblePerson">
          <!-- <el-row>
          <el-col :span="14">-->
          <el-input v-model="editPersonal.responsiblePerson" />
          <!--  </el-col> -->
          <!--  <el-col :span="8" style="padding-left:10px;">
              <el-button
                size="small"
                type="primary"
                @click="authenticationClickDialog()"
                icon="el-icon-edit"
              >变更</el-button>
          </el-col>-->
          <!--  </el-row> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="btnLoading" @click="eigeneDatenBearbeiten('editPersonal')">确定</el-button>
          <el-button @click="personalEdit = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { get } from '@/utils/sessionStorage'
export default {
  data() {
    return {
      userInfo: {
        avatar: '',
        userName: '',
        roleName: '',
        responsiblePersonPhone: '110',
        email: '',
        responsiblePerson: '安全'
      },
      editPersonal: {
        roleName: '',
        responsiblePersonPhone: '',
        email: ''
      },
      authenticationData: {
        email: '',
        responsiblePersonPhone: '',
        responsiblePerson: ''
      },
      personalEdit: false,
      authenticationDialog: false,
      disabled: false,
      btnLoading: false
    }
  },
  created() {
    // 获取登录用户信息
    var user = get('user')
    this.userInfo.userName = user.username
    this.userInfo.avatar = user.avatar
    this.userInfo.roleName = user.roles.roleName
    this.userInfo.email = user.email
  },
  methods: {
    successfulAuthentication(formName) {
      // 添加按钮缓冲事件
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('验证身份成功')
          this.editPersonal = this.userInfo
          this.personalEdit = true
        }
      })
    },
    // 点击修改个人信息的确认键
    eigeneDatenBearbeiten(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('修改成功')
          this.personalEdit = false
          this.authenticationDialog = false
        }
      })
    },
    // 点击修改获取到一些数据
    authenticationClickDialog() {
      this.authenticationData = this.userInfo
      this.authenticationDialog = true
    },
    // 弹窗：是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.imgUser {
  margin-left: 50px;
}
.str {
  padding-right: 10px;
  line-height: 50px;
}
</style>
