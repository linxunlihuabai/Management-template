<template>
  <div class="dashboard-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addDialog=true">
            <i class="el-icon-plus" /> 新增证书
          </el-button>
        </el-col>
      </el-row>
      <!-- 展示页面 -->
      <el-row>
        <!-- v-loading="listLoading" -->
        <el-table :data="tableData" stripe border>
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="certificateTitle" label="证书名称" />
          <el-table-column prop="certificateNo" label="证书编号" />
          <el-table-column prop="certificateType" label="证书类型" />
          <el-table-column prop="expirationDate" label="到期时间" />
          <el-table-column prop="certificateStatus" label="证书状态" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editOpenDialog(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页栏 -->
      <el-row>
        <el-pagination
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
      <!-- 修改 -->
      <el-dialog title="修改" :visible.sync="editDialog" width="40%" :before-close="handleClose">
        <el-form ref="editData" :rules="rules" size="small" :model="editData" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="editData.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书名称" prop="certificateTitle">
                <el-input v-model="editData.certificateTitle" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证书编号" prop="certificateNo">
                <el-input v-model="editData.certificateNo" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书类型" prop="certificateType">
                <el-input v-model="editData.certificateType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="到期时间" prop="expirationDate">
                <el-input v-model="editData.expirationDate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书状态" prop="certificateStatus">
                <el-select v-model="editData.certificateStatus" placeholder="请选择证书状态">
                  <el-option label="有效（正常）" value="1" />
                  <el-option label="暂停" value="2" />
                  <el-option label="撤销" value="3" />
                  <el-option label="注销" value="4" />
                  <el-option label="证书过期" value="5" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button :loading="btnLoading" type="primary" @click="edit('editData')">确定</el-button>
            <el-button @click="editDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 新增 -->
      <el-dialog title="新增" :visible.sync="addDialog" width="40%" :before-close="handleClose">
        <el-form
          id="addData"
          ref="addData"
          size="small"
          :model="addData"
          :rules="rules"
          label-width="130px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="addData.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书名称" prop="certificateTitle">
                <el-input v-model="addData.certificateTitle" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证书编号" prop="certificateNo">
                <el-input v-model="addData.certificateNo" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书类型" prop="certificateType">
                <el-input v-model="addData.certificateType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="到期时间" prop="expirationDate">
                <el-input v-model="addData.expirationDate" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书状态" prop="certificateStatus">
                <el-select v-model="addData.certificateStatus" placeholder="请选择证书状态">
                  <el-option label="有效（正常）" value="1" />
                  <el-option label="暂停" value="2" />
                  <el-option label="撤销" value="3" />
                  <el-option label="注销" value="4" />
                  <el-option label="证书过期" value="5" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button :loading="btnLoading" type="primary" @click="submitForm('addData')">确定</el-button>
              <el-button @click="addDialog = false">取消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          expirationDate: '2016-05-02',
          name: '王小虎',
          certificateNo: 'Z100732010000113',
          certificateType: '通用型证书',
          certificateTitle: '计算机等级证书',
          certificateStatus: '有效（正常）'
        },
        {
          expirationDate: '2016-05-04',
          name: '王2狐',
          certificateType: '通用型证书',
          certificateNo: 'Z100732010000113',
          certificateTitle: '大学英语四六级',
          certificateStatus: '暂停'
        },
        {
          expirationDate: '2016-05-01',
          name: '网散户',
          certificateType: '通用型证书',
          certificateNo: 'Z100732010000113',
          certificateTitle: '计算机等级证书',
          certificateStatus: '撤销'
        },
        {
          expirationDate: '2016-05-03',
          name: '可开',
          certificateType: '英语能力证书',
          certificateNo: 'Z100732010000113',
          certificateTitle: '托福成绩证书',
          certificateStatus: '注销'
        },
        {
          expirationDate: '2016-05-03',
          name: '周达',
          certificateType: 'IT能力证书',
          certificateNo: 'Z100732010000113',
          certificateTitle: 'ACCP软件工程师',
          certificateStatus: '证书过期'
        }
      ],
      editData: {
        name: '',
        certificateTitle: '',
        certificateNo: '',
        certificateType: '',
        expirationDate: '',
        certificateStatus: ''
      },
      addData: {
        name: '',
        certificateTitle: '',
        certificateNo: '',
        certificateType: '',
        expirationDate: '',
        certificateStatus: ''
      },
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        certificateTitle: [
          { required: true, message: '证书名称不能为空', trigger: 'blur' }
        ],
        certificateNo: [
          { required: true, message: '证书编号不能为空', trigger: 'blur' }
        ],
        certificateType: [
          { required: true, message: '证书类型不能为空', trigger: 'blur' }
        ],
        expirationDate: [
          { required: true, message: '到期时间不能为空', trigger: 'blur' }
        ],
        certificateStatus: [
          { required: true, message: '证书状态不能为空', trigger: 'blur' }
        ]
      },
      editDialog: false,
      addDialog: false,
      currentPage2: 5,
      /* 页面加载 */
      // listLoading: true,
      btnLoading: false
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('添加成功')
        }
      })
    },
    edit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('修改成功')
        }
      })
    },
    editOpenDialog(index, row) {
      this.editDialog = true // 编辑信息模态框显示
      // 获得所有数据显示在编辑信息模态框里面;
      this.editData = Object.assign({}, row)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
