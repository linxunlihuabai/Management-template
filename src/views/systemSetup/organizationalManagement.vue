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
              >添加组织</el-button>
              <el-button
                v-if="data.parentId!=0"
                type="primary"
                size="mini"
                @click.stop="() => edit(data)"
              >
                修改组织
              </el-button>
              <el-button
                v-if="data.parentId!=0"
                type="danger"
                size="mini"
                @click.stop="() => remove(node, data)"
              >
                删除组织
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
          <el-form-item label="组织名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="默认角色">
            <el-select v-model="form.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <template v-if="form.type=='Y'">
            <el-form-item label="企业类别">
              <el-input v-model="form.detail.category" />
            </el-form-item>
            <el-form-item label="出资人全称">
              <el-input v-model="form.detail.promoter" />
            </el-form-item>
            <el-form-item label="产权层级">
              <el-input v-model="form.detail.propertyLevel" />
            </el-form-item>
            <el-form-item label="资质类别">
              <el-input v-model="form.detail.qualificationCategory" />
            </el-form-item>
            <el-form-item label="资质级别">
              <el-input v-model="form.detail.qualificationLevel" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.detail.remark" />
            </el-form-item>

          </template>

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
import { depClone } from '@/utils/auth'
export default {
  data() {
    return {
      form: {
        parentId: '',
        id: '',
        name: '',
        type: '',
        roleId: null,
        detail: {
          category: '',
          promoter: '',
          propertyLevel: '',
          qualificationCategory: '',
          qualificationLevel: '',
          remark: ''
        }
      },
      show: false,
      handle: '',
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roles: [],
      loading: false,
      menuList: [],
      treeExpandedKeys: [],
      temp: [] // 用于保存树的状态
    }
  },
  computed: {
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getRequest('/system/manage/enterprise/list').then(res => {
      console.log(res.data.obj)
      this.menuList = [...res.data.obj]
      this.temp = depClone(res.data.obj)
    }).catch(() => {
      this.$router.push('/login')
    })
    this.getRequest('/system/manage/enterprise/roles').then(res => {
      console.log(res.data.obj)
      this.roles = res.data.obj
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
        type: '',
        roleId: null,
        detail: {
          category: null,
          promoter: null,
          propertyLevel: null,
          qualificationCategory: null,
          qualificationLevel: null,
          remark: null
        }
      }
      this.show = true
      this.form.parentId = data.id
      data.type == 'J' ? this.form.type = 'D' : this.form.type = 'Y'
      console.log(this.form)
    },

    // 修改菜单
    edit(data) {
      console.log(data.detail)
      data.detail = data.detail ? data.detail : {
        category: null,
        promoter: null,
        propertyLevel: null,
        qualificationCategory: null,
        qualificationLevel: null,
        remark: null
      }
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
        // draggingData.sort = (dropType === 'before' ? dropData.sort - 1 : dropData.sort + 1)

        moveFlag = true
      } else {
        if (dropNode.parent.data.parentId === 0) {
          // 处理进入
          draggingData.parentId = dropData.id
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
            let url
            if (draggingNode.type == 'Y') {
              url = `/system/manage/enterprise/update/y/${draggingData.id}`
            } else {
              url = `/system/manage/enterprise/update/${draggingData.id}`
            }
            this.putRequest(url, draggingData)
              .then(res => {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.temp = depClone(this.menuList)
              }).catch(() => {
                this.handleAlert('修改失败，请重试', 'warning')
                this.menuList = depClone(this.temp)
              })
          }).catch((rej) => {
            this.handleAlert('修改失败，请重试', 'warning')
            this.menuList = depClone(this.temp)
          })
      }
    },

    // 删除菜单
    remove(node, data) {
      this.handleCofirm('您确定要删除么?', 'warning')
        .then(() => {
          this.deleteRequest(`/system/manage/enterprise/delete/${data.id}`).then(res => {
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
        let url
        let params
        if (this.form.type == 'Y') {
          url = '/system/manage/enterprise/add/y'
          params = this.form
        } else {
          url = '/system/manage/enterprise/add'
          const { detail, ...temp } = this.form
          params = temp
        }

        this.postRequest(url, params)
          .then(res => {
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.loading = false
            this.show = false
            // 返回的id
            this.form.id = res.data.obj
            console.log(this.form)
            this.$refs.tree.append(this.form, this.form.parentId)
            this.temp = depClone(this.menuList)
          })
          .catch(() => {
            this.loading = false
            this.menuList = depClone(this.temp)
            this.handleAlert('添加失败，请重试', 'warning')
          })
      } else if (this.handle === '修改') {
        const { id } = this.form
        let url
        let params
        if (this.form.type == 'Y') {
          url = `/system/manage/enterprise/update/y/${id}`
          const { children, ...temp } = this.form
          params = temp
        } else {
          url = `/system/manage/enterprise/update/${id}`
          const { detail, children, ...temp } = this.form
          params = temp
        }
        this.putRequest(url, params)
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
