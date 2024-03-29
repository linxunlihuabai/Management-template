import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 公共路由，不需要权限

export const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/login',
  //   hidden: true
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: '登录页面',
    meta: { title: '登录页面', icon: 'example', origin: '/login' },
    hidden: true
  },
  {
    path: '/login/forgetPassword',
    component: () => import('@/views/login/forgetPassword'),
    name: '忘记密码页面',
    meta: { title: '忘记密码页面', icon: 'example', origin: '/login' },
    hidden: true
  },
  {
    path: '/userProfile/changePassword',
    component: () => import('@/views/userProfile/changePassword'),
    name: '修改密码页面',
    meta: { title: '修改密码页面', icon: 'example', origin: '/login' },
    hidden: true
  },
  {
    path: '/userProfile/userInfo',
    component: () => import('@/views/userProfile/userInfo'),
    name: '基本信息页面',
    meta: { title: '基本信息页面', icon: 'example', origin: '/basicInfo' },
    hidden: true
  },
  {
    path: '/login/register',
    component: () => import('@/views/login/register'),
    name: '注册页面',
    meta: { title: '注册页面', icon: 'example', origin: '/login' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: { title: '404页面', icon: 'example', origin: '/login' },
    hidden: true
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404' }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
