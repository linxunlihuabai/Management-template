<template>
  <div class="dashboard-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addDialog=true">
            <i class="el-icon-plus" /> 登记使用
          </el-button>
        </el-col>
      </el-row>
      <!-- 页面展示 -->
      <el-row>
        <!-- v-loading="listLoading" -->
        <el-table
          :cell-style="cellStyle"
          :header-cell-style="rowClass"
          :data="tableData"
          size="small"
          border
          stripe
        >
          <el-table-column label="安全费用使用情况">
            <el-table-column prop="year" label="年份" />
            <el-table-column prop="extractThePlan" label="提取计划" />
            <el-table-column prop="extractionBasedOn" label="提取依据" />
          </el-table-column>
          <el-table-column label="使用情况">
            <el-table-column prop="time" label="时间" />
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="money" label="金额" />
            <el-table-column prop="summarizing" label="汇总" />
          </el-table-column>
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
              <el-form-item label="年份" prop="year">
                <el-input v-model="editData.year" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提取计划" prop="extractThePlan">
                <el-input v-model="editData.extractThePlan" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="提取依据" prop="extractionBasedOn">
                <el-input v-model="editData.extractionBasedOn" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间" prop="time">
                <el-input v-model="editData.time" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="内容" prop="content">
                <el-input v-model="editData.content" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额" prop="money">
                <el-input v-model="editData.money" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="汇总" prop="summarizing">
            <el-input v-model="editData.summarizing" />
          </el-form-item>
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
              <el-form-item label="年份" prop="year">
                <el-input v-model="addData.year" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提取计划" prop="extractThePlan">
                <el-input v-model="addData.extractThePlan" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="提取依据" prop="extractionBasedOn">
                <el-input v-model="addData.extractionBasedOn" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间" prop="time">
                <el-input v-model="addData.time" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="内容" prop="content">
                <el-input v-model="addData.content" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="金额" prop="money">
                <el-input v-model="addData.money" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="汇总" prop="summarizing">
            <el-input v-model="addData.summarizing" />
          </el-form-item>
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
          year: '2016-05-02',
          extractThePlan: '预计买房',
          extractionBasedOn: '找财务',
          time: '2年',
          content: '提钱买车买房',
          money: '20000',
          summarizing: '20000'
        },
        {
          year: '2016-05-05',
          extractThePlan: '预计买房',
          extractionBasedOn: '找财务',
          time: '8年',
          content: '提钱买车买房',
          money: '20000',
          summarizing: '20000'
        },
        {
          year: '2016-05-07',
          extractThePlan: '预计买房',
          extractionBasedOn: '去赚钱',
          time: '4年',
          content: '提钱买房',
          money: '20000',
          summarizing: '20000'
        },
        {
          year: '2016-05-02',
          extractThePlan: '预计买车',
          extractionBasedOn: '找爸妈',
          time: '4年',
          content: '提钱买车买房',
          money: '20000',
          summarizing: '20000'
        }
      ],
      editData: {
        year: '',
        extractThePlan: '',
        extractionBasedOn: '',
        time: '',
        content: '',
        money: '',
        summarizing: ''
      },
      addData: {
        year: '',
        extractThePlan: '',
        extractionBasedOn: '',
        time: '',
        content: '',
        money: '',
        summarizing: ''
      },
      rules: {
        year: [{ required: true, message: '月份不能为空', trigger: 'blur' }],
        extractThePlan: [
          { required: true, message: '提取计划不能为空', trigger: 'blur' }
        ],
        extractionBasedOn: [
          { required: true, message: '提取依据不能为空', trigger: 'blur' }
        ],
        time: [{ required: true, message: '时间不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        money: [{ required: true, message: '金额不能为空', trigger: 'blur' }],
        summarizing: [
          { required: true, message: '汇总不能为空', trigger: 'blur' }
        ]
      },
      /* 页面加载 */
      // listLoading: true,
      editDialog: false,
      currentPage2: 5,
      addDialog: false,
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
    },
    /* 居中 */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return 'text-align:center'
    },
    rowClass({ row, rowIndex }) {
      return 'text-align:center'
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
