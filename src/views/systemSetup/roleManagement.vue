<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <div class="panel-main">

        <el-row :gutter="30">
          <el-col :span="10">
            <el-input v-model="roleForm.roleKey" placeholder="请输入角色英文名称">
              <template slot="prepend">ROLE_</template>
            </el-input>
          </el-col>
          <el-col :span="10">
            <el-input v-model="roleForm.roleName" placeholder="请输入角色中文名称" />
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addRole()">添加角色</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page.sync="cpage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
        <el-row>
          <el-collapse @change="handleChange">
            <el-collapse-item
              v-for="item in roleList"
              :key="item.id"
              :title="item.roleName"
              :name="item.id"
            >
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>可访问的资源</span>
                  <el-button
                    style="float: right; padding: 3px 0; color:red"
                    type="text"
                    @click="delRole(item.id)"
                  >
                    <i class="el-icon-delete" />
                  </el-button>
                </div>
                <el-tree
                  :ref="'treeList'+item.id"
                  class="accessibleResources"
                  :data="menuList"
                  :default-expanded-keys="[1]"
                  :default-checked-keys="item.menuIds"
                  show-checkbox
                  node-key="id"
                  :props="defaultProps"
                />
                <div class="footbtn">
                  <el-button @click="editCancel(item.id,item.menuIds)">取消修改</el-button>
                  <el-button type="primary" @click="editSubmit(item.id)">确认修改</el-button>
                </div>
              </el-card>
            </el-collapse-item>
          </el-collapse>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      roleForm: {
        roleKey: '',
        roleName: ''
      },
      cpage: 1,
      pageSize: 5,
      total: null,
      roleList: [],
      menuList: [],
      treeName: [],
      menuIds: [],
      defaultProps: {
        children: 'children',
        label: function(data) {
          return data.meta.title
        }
      }
    }
  },
  computed: {
    ...mapGetters(['permission_routes']),
    treeList() {
      return this.permission_routes.filter(item => {
        return item.meta
      })
    }
  },
  created() {
    this.getRequest('/system/manage/menu/list').then(res => {
      this.menuList = [...res.data.obj]
    }).catch(() => {
      this.$router.push('/login')
    })
    this.fetchRoleList()
  },
  methods: {
    // 获取角色列表
    fetchRoleList(cpage, pageSize) {
      const params = {}
      params.page = cpage || this.cpage
      params.size = pageSize || this.pageSize
      this.postRequest('/system/manage/role/list', params).then(res => {
        const pageObj = res.data.obj
        this.total = pageObj.total
        this.roleList = pageObj.list
        console.log(res.data.obj)
      })
    },
    // 改变当前页
    handleCurrentChange(cpage) {
      this.fetchRoleList()
    },
    // 改变每页条数
    handleSizeChange(pageSize) {
      this.fetchRoleList()
    },
    // 递归关闭菜单的方法
    closeTree(childNodes) {
      childNodes.forEach(item => {
        item.expanded = false
        if (item.childNodes && item.childNodes.length > 0) {
          this.closeTree(item.childNodes)
        }
      })
    },
    // 收起时自动关闭所有菜单
    handleChange(val) {
      let tree
      console.log(val)
      if (val.length > this.treeName.length) {
        tree = val.filter(item => {
          return !this.treeName.includes(item)
        })
      } else if (this.treeName.length > val.length) {
        tree = this.treeName.filter(item => {
          return !val.includes(item)
        })
      }

      this.treeName = val

      tree[0] && (tree = 'treeList' + tree[0])

      const childNodes = this.$refs[tree][0].store.root.childNodes[0].childNodes
      if (childNodes && childNodes.length > 0) {
        this.closeTree(childNodes)
      }
    },
    // 添加角色
    addRole() {
      console.log(this.roleForm)
      this.postRequest(`/system/manage/role/add`, this.roleForm)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          // console.log(res.data.obj)
          this.roleForm.id = res.data.obj
          // this.roleList.push(this.roleForm)
        })
    },
    // 删除角色
    delRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRequest(`/system/manage/role/delete/${id}`).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.roleList = this.roleList.filter(item => item.id != id)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 取消修改
    editCancel(id, menuIds) {
      const tree = 'treeList' + id
      const keys = (this.menuIds.length > 0 ? this.menuIds : menuIds)
      this.$refs[tree][0].setCheckedKeys(keys)
      // console.log(menuIds)
    },
    // 提交修改
    editSubmit(id) {
      const tree = 'treeList' + id
      const checkedKeys = this.$refs[tree][0].getCheckedKeys()
      this.putRequest(`/system/manage/role/menu/update/${id}`, checkedKeys)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.menuIds = checkedKeys
        })
    }
  }
}
</script>

<style lang="scss">

.footbtn {
  display: flex;
  justify-content: flex-end;
}
</style>
