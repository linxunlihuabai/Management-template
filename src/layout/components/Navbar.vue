<template>
  <div class="navbar">
    <div class="navList">
      <ul class="menu-list">
        <li v-for="item in menu" :key="item.id" :class="path == item.path ? 'active':''">
          <router-link :to="item.path" class="nav-link">{{ item.meta.title }}</router-link>
        </li>
      </ul>
    </div>

    <div class="right-menu">
      <el-header class="header">
        <div class="el-header__right">
          <router-link to="/">
            <i class="el-icon-message" />
          </router-link>
          <router-link to="/systemSetup">
            <i class="el-icon-setting" />
          </router-link>
          <el-badge :value="12" class="notice">
            <router-link to="#/notice">
              <i class="el-icon-bell" />
            </router-link>
          </el-badge>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link userinfo">
              <el-avatar :size="28" :src="circleUrl" />
              <span>{{ name }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="/userProfile/userInfo">基本信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" command="/userProfile/changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" divided command="/logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
    </div>
  </div>
</template>

<script>
import { get, clear } from '@/utils/sessionStorage'
import { delLocalStorage } from '@/utils/localStorage'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: '用户未登录',
      isActive: false,
      isCollapse: false,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      keyword: ''
    }
  },
  created() {
    // 获取登录用户信息
    var user = get('user')
    this.name = user.username
    this.circleUrl = user.avatar
  },
  computed: {
    ...mapGetters(['permission_routes']),
    menu() {
      return this.permission_routes.filter(item => {
        return item.hidden !== true
      })
    },
    path() {
      return this.$route.meta.origin
    }
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {},
  methods: {
    handleCommand(command) {
      if (command === '/logout') {
        this.$confirm('您确定要退出登录吗？', '提示')
          .then(res => {
            // 清除 sessionStorage 内的所有信息
            clear()
            // 清除 localStorage 内的所有信息
            delLocalStorage()
            localStorage.removeItem('sun_token')
            this.$router.push('/login')
          })
          .catch(e => {})
      } else {
        this.$router.push(command)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #409eff;
.navbar {
  height: 50px;
  padding: 5px 10px;
  overflow: hidden;
  position: relative;
  background-color: $mainColor;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .navList {
    overflow: hidden;

    float: left;
    .menu-list {
      float: left;
      list-style: none;
      overflow: hidden;
      padding: 0;
      margin: 0;
      li {
        float: left;
        color: #fff;
        height: 40px;
        line-height: 40px;
        font-size: 1.6rem;
        cursor: pointer;
        &.active {
          color: #333;
          background-color: #fff;
        }
        .nav-link {
          display: block;
          border-radius: 4px;
          padding: 0 20px;
        }
      }
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    .el-header {
      display: flex;
      align-items: center;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.05);
      > .el-header__right {
        display: flex;
        align-items: center;
      }
      > .el-header__right {
        flex-grow: 1;
        justify-content: flex-end;
        [class*="el-icon-"] {
          font-size: 18px;
        }

        a {
          padding: 8px 10px;
          color: #fff;
        }
        .notice {
          /deep/.el-badge__content {
            right: 20px;
          }
        }
        .userinfo {
          color: #fff;
        }
      }
    }

    .el-dropdown-link {
      margin-left: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .el-avatar {
        margin-right: 8px;
      }
    }
  }
}
</style>
