<template>
  <div class="app-container">
    <el-card class="box-card zhou-box-card">
      <div slot="header" class="clearfix">
        <span>忘记密码</span>
      </div>
      <!-- 登录时忘记密码用的表单 -->
      <el-form
        ref="forgetPasswordForm"
        size="small"
        :rules="rules"
        :model="forgetPasswordForm"
        label-width="180px"
      >
        <el-form-item label="证件号码" required prop="IDNumber">
          <el-input v-model="forgetPasswordForm.IDNumber" />
        </el-form-item>
        <el-form-item label="安全负责人手机号码" required prop="safetyDirectorPhone">
          <el-input v-model="forgetPasswordForm.safetyDirectorPhone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forgetPasswordForm.email" />
        </el-form-item>
        <el-form-item label="请重新设置新密码" required prop="password">
          <el-input
            v-model="forgetPasswordForm.password"
            type="password"
            auto-complete="off"
            placeholder="输入密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" required prop="confirmPassword">
          <el-input
            v-model="forgetPasswordForm.confirmPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
          />
        </el-form-item>
        <el-row>
          <el-form-item label="验证码" class="captcha" prop="captcha">
            <el-col :span="12">
              <el-input v-model="forgetPasswordForm.captcha" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="3" class="sendcode">
              <el-button
                v-if="!disabled"
                type="button"
                :disabled="disabled"
                @click="sendcode"
              >点击进行邮箱验证</el-button>
              <el-button
                v-if="disabled"
                type="button"
                :disabled="disabled"
                @click="sendcode"
              >{{ btntxt }}</el-button>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('forgetPasswordForm')">修改密码</el-button>
          <router-link class="login" to="/login">已有账号？立即登录</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  validateIsPhone,
  validatePassword,
  validateIdNo
} from '@/utils/regList'
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号码不能为空'))
      }
      if (!validateIsPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      }
      callback()
    }
    // 密码包含 数字,英文,字符中的两种以上，长度8-20
    const validatePass = (rule, value, callback) => {
      /* 密码不能全部是数字，或全部是小写字母，或全部是大写字母 */
      if (value === '') {
        callback(new Error('密码不能为空'))
      }
      if (!validatePassword(value)) {
        callback(new Error('密码包含 数字,英文,字符中的两种以上，长度8-20'))
      }
      callback()
    }
    // 再次输入密码验证
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次输入的密码不能为空'))
      } else if (value !== this.forgetPasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证身份证号码是否符合标准
    const validateIDNumber = (rule, value, callback) => {
      validateIdNo(rule, value, callback)
    }
    return {
      forgetPasswordForm: {
        IDNumber: '',
        safetyDirectorPhone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
        safetyDirectorPhone: [{ validator: validatePhone, trigger: 'blur' }],
        IDNumber: [{ validator: validateIDNumber, trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      disabled: false,
      time: 0,
      btntxt: '重新发送'
    }
  },
  methods: {
    // 60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.btntxt = '获取验证码'
        this.disabled = false
      }
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: '/index'
      })
    },
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.rules = forgetRuls;
          setTimeout(() => {
            alert('修改成功')
          }, 400)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 邮箱验证发送验证码
    sendcode() {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!reg.test(this.forgetPasswordForm.email)) {
        this.$message({
          message: '请输入正确的邮箱地址',
          center: true
        })
        return
      } else {
        ({}.then(res => {
          this.$message({
            message: '发送成功',
            type: 'success',
            center: true
          })
        }))
        this.time = 60
        this.disabled = true
        this.timer()
      }
    }
  }
}
</script>

<style  scoped>
.loading-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #aedff8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-wrapper img {
  position: absolute;
  z-index: 1;
}
.register-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
#register {
  max-width: 340px;
  margin: 60px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login {
  font-size: 14px;
  color: #1ab2ff;
  cursor: pointer;
}
.login:hover {
  color: #2c2fd6;
}
.code >>> .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code button {
  margin-left: 20px;
  width: 140px;
  text-align: center;
}
.sendcode {
  padding-left: 14px;
}
.el-button--primary:focus {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
