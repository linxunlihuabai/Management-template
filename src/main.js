/* eslint-disable no-unused-vars */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import 'normalize.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Vuerify from 'vuerify'

// get和post请求
import { postRequest, getRequest, putRequest, deleteRequest } from '@/utils/request'

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest

// 弹出框
import { handleCofirm, handleAlert } from '@/utils/messageBox'

Vue.prototype.handleCofirm = handleCofirm
Vue.prototype.handleAlert = handleAlert

// 全局组件
import globalUI from '@/components'

Vue.use(globalUI)

Vue.use(Vuerify, {
  required: {
    test: /\S+$/,
    message: '必填项'
  }
})
import '@/icons' // icon
import '@/permission' // permission control

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'sCrmUchPh7eKuHSyuZKx0e1acqyk7REF'
})
import mock from '../mock/table.js'
// if (process.env.NODE_ENV === 'production') {
//   console.log(process.env.NODE_ENV)
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

