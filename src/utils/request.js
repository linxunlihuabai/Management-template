import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// eslint-disable-next-line no-unused-vars
import { clear } from '@/utils/sessionStorage'
import router from '@/router'

// 请求接口 API 地址
// const VUE_APP_BASE_API = 'http://192.168.100.2:8080/swagger-ui.html#/%E8%B4%A6%E6%88%B7%E6%B3%A8%E5%86%8C%E6%8E%A7%E5%88%B6%E5%99%A8/registerUsingPOST'
// wifi共享
// const VUE_APP_BASE_API = 'http://192.168.100.2:8080/swagger-ui.html#/%E8%B4%A6%E6%88%B7%E6%B3%A8%E5%86%8C%E6%8E%A7%E5%88%B6%E5%99%A8/registerUsingPOST'
// 本地
/* const VUE_APP_BASE_API = 'http://192.168.100.2:8080/swagger-ui.html#/%E8%B4%A6%E6%88%B7%E6%B3%A8%E5%86%8C%E6%8E%A7%E5%88%B6%E5%99%A8/registerUsingPOST'

axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
} */

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    var res = response.data
    if (res.status !== 200) {
      // 如果响应的代码是401，则判断为未登录。
      console.log(res.status)
      if (res.status === 401) {
        MessageBox.confirm(
          '您的登录信息已过期，您可以取消以停留在此页，或重新登录',
          '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // 清除cookic中的 token，跳转回主页
          // 为了重新实例化vue-router对象 避免bug
          router.replace('/login')
        })
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('身份过期')
      } else if (res.status === 403) {
        Message({
          // title: '请求错误',
          message: res.msg || '您的权限不足',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject('您的权限不足')
      } else if (res.status === 500) {
        return response
      }
      return Promise.reject('请求错误' + res.msg)
    }
    return response
  },
  error => {
    console.log('err' + error) // for debug
    const res = error.response.data
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('请求错误' + error)
  }
)

// post封装
export const postRequest = (url, params) => {
  return service({
    method: 'post',
    url,
    data: params
  })
}

// get封装
export const getRequest = (url, params) => {
  return service({
    method: 'get',
    url,
    data: params
  })
}

// put封装
export const putRequest = (url, params) => {
  return service({
    method: 'put',
    url,
    data: params
  })
}

// delete封装
export const deleteRequest = (url, params) => {
  return service({
    method: 'delete',
    url,
    params
  })
}

// 基础封装使用对象作为参数
export default service
