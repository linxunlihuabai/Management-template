<template>
  <div class="panel">
    <!-- 个人信息显示面板 -->
    <el-card class="box-card zhou-box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: left;" size="small" type="primary" @click="$router.go(-1)">返回</el-button>
        <span>修改密码</span>
      </div>
      <!-- 修改密码 -->
      <el-form
        ref="resetForm"
        :model="resetForm"
        :rules="rules"
        status-icon
        label-width="100px"
        size="medium"
      >
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input v-model="resetForm.oldPassword" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input v-model="resetForm.newPassword" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="newPassword2">
          <el-input v-model="resetForm.newPassword2" type="password" auto-complete="off" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="toModifyPassword('resetForm')"
          >确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
      :show-close="false"
    >
      <span>确定修改此账号密码吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = true">确 定</el-button>
        <el-button @click="quit()">取消及退出</el-button>
      </span>
    </el-dialog>

    <el-dialog
      ref="authenticationEmail"
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
      :model="authenticationEmail"
    >
      <el-form ref="authenticationEmail" :model="authenticationEmail" label-width="60px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="authenticationEmail.email" />
        </el-form-item>
        <el-row>
          <el-form-item label="验证码" class="captcha" prop="captcha">
            <el-col :span="14">
              <el-input v-model="authenticationEmail.captcha" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="8" style="padding-left:10px;" class="sendCode">
              <el-button
                v-if="!disabled"
                type="button"
                :disabled="disabled"
                @click="sendCode('authenticationEmail')"
              >进行邮箱验证</el-button>
              <el-button v-if="disabled" type="button" :disabled="disabled">{{ btntxt }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="closeDialog()">确 定</el-button>
            <el-button @click="dialogVisible2 = false">取 消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { validatePassword } from '@/utils/regList'
export default {
  data() {
    const validateOldPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      } else if (value === this.resetForm.oldPassword) {
        callback(new Error('您未修改密码'))
      } else {
        callback()
      }
    }
    const validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else if (value === this.resetForm.oldPassword) {
        callback(new Error('您未修改密码'))
      } else {
        callback()
      }
    }
    return {
      // 邮箱验证
      authenticationEmail: {
        email: ''
      },
      resetForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [
          { required: true, validator: validateOldPwd, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePwd, trigger: 'blur' }
        ],
        newPassword2: [
          { required: true, validator: validatePwd2, trigger: 'blur' }
        ]
      },
      disabled: false,
      btnLoading: false,
      // 第一个弹窗默认打开出现
      dialogVisible: true,
      // 第二个弹窗进行身份验证
      dialogVisible2: false
    }
  },
  methods: {
    // 修改密码
    toModifyPassword(formName) {
      this.btnLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('修改成功')
        }
      })
    },
    // 弹窗：是否关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeDialog() {
      this.dialogVisible2 = this.authenticationEmail
      this.dialogVisible2 = false
      // 第二个弹窗进行身份验证
      this.dialogVisible = false
    },
    quit() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
