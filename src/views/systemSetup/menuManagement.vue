<template>
  <div class="app-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <div class="panel-main">
        <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
        <el-tree
          ref="tree"
          class="accessibleResources"
          :data="menuList"
          node-key="id"
          expand-on-click-node
          :filter-node-method="filterNode"
          :props="defaultProps"
          :default-expanded-keys="treeExpandedKeys"
          draggable
          @node-drop="handleDrop"
          @node-expand="treeExpand"
          @node-collapse="treeCollapse"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span class="el-tree-node__label">{{ node.label }}</span>
            <span>
              <el-button
                v-if="data.parentId<=1"
                type="primary"
                size="mini"
                @click.stop="() => append(data)"
              >添加菜单</el-button>
              <el-button
                v-if="data.parentId!=0"
                type="primary"
                size="mini"
                @click.stop="() => edit(data)"
              >
                修改菜单
              </el-button>
              <el-button
                v-if="data.parentId!=0"
                type="danger"
                size="mini"
                @click.stop="() => remove(node, data)"
              >
                删除菜单
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <el-dialog
        append-to-body
        title="分类管理"
        :visible.sync="show"
        width="800px"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" label-width="120px" class="qualification">
          <el-form-item v-if="handle=='修改'" label="路由名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="form.meta.title" />
          </el-form-item>

          <el-form-item label="菜单图标">
            <el-input v-model="form.meta.icon" />
          </el-form-item>

          <el-form-item label="菜单组件">
            <el-col>
              <el-input v-model="form.component" />
            </el-col>
          </el-form-item>
          <el-form-item label="根路径">
            <el-input v-model="form.meta.origin" />
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="form.path" />
          </el-form-item>

          <el-form-item label="完整路径">
            <el-input v-model="form.meta.url" />
          </el-form-item>

          <el-form-item label="重定向路径">
            <el-col>
              <el-input v-model="form.redirect" />
            </el-col>
          </el-form-item>
          <el-form-item label="排序号">
            <el-col>
              <el-input-number v-model="form.sort" />
            </el-col>
          </el-form-item>

          <el-form-item label="是否隐藏菜单">
            <el-col :span="11">
              <el-radio v-model="form.hidden" :label="true">隐藏</el-radio>
              <el-radio v-model="form.hidden" :label="false">不隐藏</el-radio>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="show=false">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="submit()">立即{{ handle }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { depClone } from '@/utils/auth'

export default {
  data() {
    return {
      form: {
        parentId: '',
        id: '',
        name: '',
        path: '',
        component: '',
        redirect: null,
        hidden: '',
        meta: {
          title: '',
          icon: '',
          origin: '',
          url: ''
        }
      },
      show: false,
      handle: '',
      filterText: '',
      defaultProps: {
        children: 'children',
        label: function(data) {
          return data.meta.title
        }
      },
      loading: false,
      menuList: [],
      treeExpandedKeys: [],
      temp: [] // 用于保存树的状态
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
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getRequest('/system/manage/menu/list').then(res => {
      this.menuList = [...res.data.obj]
      this.temp = depClone(res.data.obj)
    }).catch(() => {
      this.$router.push('/login')
    })
  },
  methods: {
    // 当节点打开时，记录下打开节点的id
    treeExpand(data, node, self) {
      this.treeExpandedKeys.push(data.id)
    },

    // 当节点关闭时，移除节点的id
    treeCollapse(data) {
      const index = this.treeExpandedKeys.indexOf(data.id)
      if (index > -1) {
        this.treeExpandedKeys.splice(index, 1)
      }
    },
    // 过滤筛选
    filterNode(value, data) {
      if (!value) return true
      return data.meta.title.indexOf(value) !== -1
    },
    // 添加菜单
    append(data) {
      this.handle = '添加'
      this.form = {
        parentId: '',
        name: '',
        sort: null,
        path: '',
        component: '',
        redirect: null,
        hidden: '',
        meta: {
          title: '',
          icon: '',
          origin: '',
          url: ''
        }
      }
      this.show = true
      this.form.parentId = data.id
      this.form.meta.origin = data.meta.origin
    },

    // 修改菜单
    edit(data) {
      this.handle = '修改'
      this.form = data
      this.show = true
    },
    // 移动节点操作
    handleDrop(draggingNode, dropNode, dropType, ev) {
      const draggingData = draggingNode.data

      const dropData = dropNode.data

      let moveFlag = false

      if (dropType !== 'inner') {
        // 处理排序
        draggingData.parentId = dropData.parentId
        draggingData.sort = (dropType === 'before' ? dropData.sort - 1 : dropData.sort + 1)
        draggingData.meta.origin = dropData.meta.origin
        moveFlag = true
      } else {
        if (dropNode.parent.data.parentId === 0) {
          // 处理进入
          draggingData.parentId = dropData.id
          draggingData.meta.origin = dropData.meta.origin
          moveFlag = true
        } else {
          moveFlag = false
          // 目前菜单上限两级，拒绝处理三级
          this.handleAlert('无法移动,上限二级菜单', 'warning').then(() => {
            this.menuList = depClone(this.temp)
          })
            .catch(() => {
              this.menuList = depClone(this.temp)
            })
        }
      }
      if (moveFlag) {
        // 发起修改请求
        this.handleCofirm('您确定要移动该菜单么?', 'warning')
          .then(res => {
            this.putRequest(`/system/manage/menu/update/${draggingData.id}`, draggingData)
              .then(res => {
                this.temp = depClone(this.menuList)
              }).catch(() => {
                this.menuList = depClone(this.temp)
              })
          }).catch((rej) => {
            this.menuList = depClone(this.temp)
          })
      }
    },

    // 删除菜单
    remove(node, data) {
      this.handleCofirm('您确定要删除么?', 'warning')
        .then(() => {
          this.deleteRequest(`/system/manage/menu/delete/${data.id}`).then(res => {
            console.log(res.data.status)
            if (res.data.status === 500) {
              this.handleAlert('请先删除子菜单！', 'warning')
            } else {
              const parent = node.parent
              const children = parent.data.children || parent.data

              const index = children.findIndex(d => {
                return d.id === data.id
              })
              children.splice(index, 1)
              this.temp = depClone(this.menuList)
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
            }
          })
            .catch(() => {
              this.menuList = depClone(this.temp)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    submit() {
      this.loading = true
      if (this.handle === '添加') {
        this.form.name = this.form.path
        this.form.meta.origin = (this.form.meta.origin ? this.form.meta.origin : this.form.path)
        console.log(this.form)
        this.postRequest('/system/manage/menu/add', this.form)
          .then(res => {
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.loading = false
            this.show = false
            // 返回的id
            this.form.id = res.data.obj

            this.$refs.tree.append(this.form, this.form.parentId)
            this.temp = depClone(this.menuList)
          })
          .catch(() => {
            this.loading = false
            this.menuList = depClone(this.temp)
            this.handleAlert('添加失败，请重试', 'warning')
          })
      } else if (this.handle === '修改') {
        // eslint-disable-next-line no-unused-vars
        const { children, ...params } = this.form

        // eslint-disable-next-line no-unused-vars
        const { id } = params

        this.putRequest(`/system/manage/menu/update/${id}`, params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.temp = depClone(this.menuList)
            this.loading = false
            this.show = false
          })
          .catch(() => {
            this.loading = false
            this.menuList = depClone(this.temp)
            this.handleAlert('修改失败，请重试', 'warning')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.accessibleResources {
  margin-top: 20px;
  margin-bottom: 20px;
  /deep/ .el-tree-node__content {
    height: 40px;
  }
  /deep/ .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  /deep/ .el-tree-node.is-drop-inner>.el-tree-node__content .el-tree-node__label {
    background-color: #409eff;
    color: #fff;
}
}
</style>
