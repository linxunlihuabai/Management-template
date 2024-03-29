<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="identifyCode">
        <span class="svg-container">
          <svg-icon icon-class="verificationCode" />
        </span>
        <el-input
          v-model="loginForm.identifyCode"
          class="identifyCode"
          placeholder="验证码"
          name="identifyCode"
        />
        <div class="get-code" @click="refreshCode()">
          <s-identify :identify-code="identifyCode" />
        </div>
      </el-form-item>

      <el-button
        :loading="btnLoading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <div class="tips">
        <router-link style="margin-right:20px;" to="/login/register">立即注册</router-link>
        <router-link to="/login/forgetPassword">忘记密码</router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SIdentify from '@/components/sIdentify'
import { saveLocalStorage } from '@/utils/localStorage'

export default {
  name: 'Login',
  components: {
    SIdentify
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
        callback(new Error('验证码输入错误'))
      } else {
        callback()
      }
    }
    return {
      identifyCode: '1111',
      identifyCodes:
        'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789', // 随便打的
      loginForm: {
        username: 'admin',
        password: '123456',
        identifyCode: '1111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        identifyCode: [
          { required: true, trigger: 'blur', validator: validateIdentifyCode }
        ]
      },
      btnLoading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    // this.refreshCode();
  },
  methods: {
    refreshCode() {
      // 刷新验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    randomNum(min, max) {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)]
      }
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              console.log('成功')
              return Promise.resolve('登录成功！')
            })
            .then(() => {
              this.getRequest('/system/manage/menu/list').then(res => {
                const accessRoutes = res.data.obj[0].children// 后台拿到路由
                saveLocalStorage('router', accessRoutes) // 存储路由到localStorage
                console.log('存储本地')
              }).then(() => {
                this.$router.push({ path: this.redirect || '/home' })
                this.btnLoading = false
              })
            })
            .catch(() => {
              this.btnLoading = false
              console.log('失败')
            })
        } else {
          this.refreshCode()
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f2f2f2;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    &.identifyCode {
      width: 62%;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .get-code {
      float: right;
      height: 52px;
      cursor: pointer;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
