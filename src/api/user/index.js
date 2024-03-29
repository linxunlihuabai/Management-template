import { postRequest, getRequest } from '@/utils/request'

// 验证邮箱是否存在
export function checkEmail(email) {
  return getRequest('/register/check/email/' + email, {})
}

// es6新语法
// 验证手机是否存在
export function checkResponsiblePersonPhone(responsiblePersonPhone) {
  return getRequest(
    `/register/check/responsiblePersonPhone/${responsiblePersonPhone}`,
    {}
  )
}

// 验证统一社会信息代码
export function checkCreditCode(creditCode) {
  return getRequest(`/register/check/creditCode/${creditCode}`, {})
}

// 验证用户名是否存在
export function checkUsername(username) {
  return getRequest(`/register/check/username/${username}`, {})
}

// 注册验证码
export function getRegisterCaptcha(data) {
  return postRequest('/register/captcha', data)
}

// 获取企业信息
export function getEnterpriseTree() {
  return getRequest('/register/getEnterpriseTree', {})
}

// 注册
export function register(data) {
  return postRequest('/register/submit', data)
}

// 登录
export function login(data) {
  return postRequest('/login', data)
}
