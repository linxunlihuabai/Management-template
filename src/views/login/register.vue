<template>
  <div class="app-container">
    <el-card class="box-card zhou-box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <!-- 温馨提示 -->
      <div v-show="active == 0" class="prompt">请填写正确的统一社会信用代码，一旦注册，不允许修改！</div>
      <el-row>
        <el-steps size="medium" align-center :active="active" finish-status="success">
          <el-step title="填写注册信息" />
          <el-step title="提交成功，等待审核结果" />
        </el-steps>
      </el-row>
      <!-- 注册表单信息 -->
      <!-- 步骤一内容 -->
      <el-form
        v-show="active == 0"
        ref="userInfo"
        size="small"
        label-width="150px"
        :rules="rules"
        :model="userInfo"
      >
        <el-form-item label="统一社会信息代码" prop="creditCode" required>
          <el-input v-model="userInfo.creditCode" placeholder="请输入统一社会信息代码" required />
        </el-form-item>
        <el-form-item label="用户名" prop="username" required>
          <el-input v-model="userInfo.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input v-model="userInfo.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" required>
          <el-input v-model="userInfo.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="企业名称" prop="enterpriseCode" required>
          <el-cascader
            v-model="userInfo.enterpriseSelect"
            style="width: 100%"
            placeholder="请选择企业"
            :options="enterpriseOptions"
            :props="{ checkStrictly: true }"
            clearable
            @change="handleEnterpriseChange"
          />
        </el-form-item>
        <el-form-item label="安全负责人" prop="responsiblePerson" required>
          <el-input v-model="userInfo.responsiblePerson" placeholder="请输入安全负责人" />
        </el-form-item>
        <el-form-item label="移动电话号码" required prop="responsiblePersonPhone">
          <el-input v-model="userInfo.responsiblePersonPhone" placeholder="请输入移动电话号码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" required>
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-row>
          <el-form-item label="验证码" class="captcha" prop="captcha">
            <el-col :span="12">
              <el-input v-model="userInfo.captcha" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="12" class="sendCode">
              <el-button
                v-if="!disabled"
                type="button"
                :disabled="disabled"
                @click="sendCode('userInfo')"
              >点击进行邮箱验证</el-button>
              <el-button v-if="disabled" type="button" :disabled="disabled">{{ btntxt }}</el-button>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="submitForm('userInfo')">下一步</el-button>
          <el-button @click="resetForm('userInfo')">重置</el-button>
        </el-form-item>
        <router-link style="margin-left:800px;color:red;" to="/login">我要回到登录页面？</router-link>
      </el-form>
      <!-- 步骤二内容 -->
      <div v-show="active >= 1">
        <p align="center">
          <i class="el-step__icon-inner el-icon-check submit" style="font-size: 50px;" />
        </p>
        <h1 align="center">提交成功！等待审核结果</h1>
        <p align="center" class="finalDecision">审核结果会以邮件的方式通知您，请注意查收！</p>
        <router-link class="goLogin" to="/login">我要回到登录页面？</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  validateIsPhone,
  validatePassword,
  validateEMail,
  validateUserName
} from '@/utils/regList'

import {
  getRegisterCaptcha,
  register,
  checkEmail,
  checkUsername,
  checkResponsiblePersonPhone,
  getEnterpriseTree,
  checkCreditCode
} from '@/api/user/index'
export default {
  data() {
    // 手机验证
    const isvalidPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号码不能为空'))
      }
      if (!validateIsPhone(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        checkResponsiblePersonPhone(value)
          .then(res => {
            res = res.data
            if (res.status === 200) {
              callback()
            } else {
              callback(new Error('手机号码已存在'))
            }
          })
          .catch(res => {
            callback(new Error('手机号码验证异常！请重试'))
          })
      }
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
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    // 验证邮箱是否符合要求
    const checkEmailValidatore = (rule, value, callback) => {
      const flag = validateEMail(rule, value, callback)
      if (flag) {
        checkEmail(value)
          .then(res => {
            if (res.data.status === 200) {
              callback()
            } else {
              callback(new Error('邮箱已存在'))
            }
          })
          .catch(() => {
            callback(new Error('验证邮箱异常！请重试'))
          })
      }
    }

    // 验证用户名是否存在
    const checkUsernameValidatore = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      }
      if (!validateUserName(value)) {
        callback(new Error('用户名由6位英文字母和数字组成，不能以数字开头'))
        // eslint-disable-next-line brace-style
      }
      // 它的意思是 当符合要求的条件的时候，就触发回调函数。这个回调的函数是显示成功的标识
      else {
        checkUsername(value)
          .then(res => {
            res = res.data
            if (res.status === 200) {
              callback()
            } else {
              callback(new Error('用户名已存在'))
            }
          })
          .catch(res => {
            callback(new Error('用户名验证异常！请重试'))
          })
      }
    }

    // 验证统一社会信息代码是否唯一
    const checkCreditCodeValidatore = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('统一社会信息代码不能为空'))
      } else {
        checkCreditCode(value)
          .then(res => {
            res = res.data
            if (res.status === 200) {
              callback()
            } else {
              callback(new Error('统一社会信息代码已经存在，请重新填写'))
            }
          })
          .catch(res => {
            callback(new Error('统一社会信息代码异常！请重试'))
          })
      }
    }
    // 验证验证码
    /* const validateIdentifyCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (value !== res.data.captcha) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    }; */
    return {
      userInfo: {
        creditCode: '',
        username: '',
        password: '',
        confirmPassword: '',
        enterpriseSelect: [],
        enterpriseCode: '',
        responsiblePerson: '',
        responsiblePersonPhone: '',
        captcha: '',
        email: '',
        taskId: ''
      },
      enterpriseOptions: [],
      rules: {
        confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        responsiblePersonPhone: [{ validator: isvalidPhone, trigger: 'blur' }],
        username: [{ validator: checkUsernameValidatore, trigger: 'blur' }],
        creditCode: [{ validator: checkCreditCodeValidatore, trigger: 'blur' }],
        email: [{ validator: checkEmailValidatore, trigger: 'blur' }],
        /* captcha: [{ validator: validateIdentifyCode, trigger: "blur" }], */
        enterpriseCode: [
          { required: true, message: '企业不能为空', trigger: 'blur' },
          { required: true, message: '企业不能为空', trigger: 'change' }
        ],
        responsiblePerson: [
          { required: true, message: '安全负责人不能为空', trigger: 'blur' }
        ]
      },
      disabled: false,
      time: 0,
      btntxt: '重新发送',
      active: 0
    }
  },
  mounted() {
    this.getEnterpriseOptions()
  },
  methods: {
    // 清除选择的企业信息
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.userInfo.enterpriseSelect = []
      this.userInfo.enterpriseCode = ''
    },
    submitForm(formName) {
      this.userInfo.enterpriseCode = this.userInfo.enterpriseSelect[this.userInfo.enterpriseSelect.length - 1]
      this.$refs[formName].validate(valid => {
        if (this.userInfo.captcha === '') {
          this.$message.error('验证码不能为空')
          return false
        }
        console.log('注册操作' + this.userInfo)
        if (valid) {
          register(this.userInfo).then(res => {
            res = res.data
            console.log(res.msg)
            if (res.status === 200) {
              // 将步骤条跳转至注册提交成功页面
              this.active = 2
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 邮箱验证发送验证码
    sendCode(formName) {
      this.$refs[formName].validate(valid => {
        this.$message.error('验证码发送失败,信息请输入完整')
        if (valid) {
          console.log(this.userInfo.email)
          getRegisterCaptcha({
            email: this.userInfo.email,
            taskId: this.userInfo.taskId
          }).then(res => {
            res = res.data
            if (res.status === 200) {
              this.userInfo.taskId = res.obj
              this.$message.error('验证码发送成功')
            } else {
              this.$message.error('验证码发送失败，请刷新重试')
            }
          })
          this.time = 60
          this.disabled = true
          this.timer()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
    getEnterpriseOptions() {
      getEnterpriseTree().then(res => {
        res = res.data
        if (res.status === 200) {
          const enterprises = res.obj
          // 处理后台的接口数据 指定为 {value: '', label: '', children: []} 的格式
          if (enterprises != null && enterprises.length > 0) {
            if (
              enterprises[0].children != null &&
              enterprises[0].children.length > 0
            ) {
              enterprises[0].children.forEach((child, index) => {
                this.enterpriseOptions.push({})
                this.enterpriseOptions[index] = {
                  value: child.id,
                  label: child.name,
                  children: []
                }
                if (child.children != null && child.children.length > 0) {
                  child.children.forEach((child1, childIndex) => {
                    this.enterpriseOptions[index].children.push({})
                    this.enterpriseOptions[index].children[childIndex] = {
                      value: child1.id,
                      label: child1.name
                    }
                  })
                }
              })
            }
          }

          //   enterprises.forEach((e, i) => {
          //     this.enterpriseOptions.push({});
          //     this.enterpriseOptions[i] = {
          //       value: e.id,
          //       label: e.name,
          //       children: []
          //     };
          //     if (e.children != null && e.children.length > 0) {
          //       e.children.forEach((child, index) => {
          //         this.enterpriseOptions[0].children.push({});
          //         this.enterpriseOptions[0].children[index] = {
          //           value: child.id,
          //           label: child.name,
          //           children: []
          //         };
          //         if (child.children != null && child.children.length > 0) {
          //           child.children.forEach((child1, childIndex) => {
          //             this.enterpriseOptions[0].children[index].children.push(
          //               {}
          //             );
          //             this.enterpriseOptions[0].children[index].children[
          //               childIndex
          //             ] = {
          //               value: child1.id,
          //               label: child1.name
          //             };
          //           });
          //         }
          //       });
          //     }
          //   });
          // }
        } else {
          this.$message.error('企业信息获取失败！请刷新重试')
        }
      })
    },
    handleEnterpriseChange(value) {
      if (value !== null || value !== []) {
        this.userInfo.enterpriseCode = value[value.length - 1]
      }
    }
  }
}
</script>

<style scoped>
.prompt {
  width: 400px;
  height: 36px;
  line-height: 36px;
  background-color: #07c181;
  color: white;
  font-size: 14px;
  padding-left: 12px;
  margin-bottom: 20px;
}
.sendCode {
  padding-right: 80px;
}
.submit,
.goLogin {
  color: #67c23a;
}
.finalDecision {
  font-size: 18px;
}
.goLogin {
  margin-left: 750px;
}
h1 {
  font-size: 24px;
}
</style>
