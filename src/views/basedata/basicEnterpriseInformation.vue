<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="6">
        <el-button type="primary" size="small" @click="addDialog=true">
          <i class="el-icon-plus" /> 新增
        </el-button>
      </el-col>
      <el-col :span="18">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="企业名称">
            <el-select v-model="formInline.companyName" size="small" placeholder="企业名称">
              <el-option label="测绘院" value="1" />
              <el-option label="地质院" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formInline.organization"
              size="small"
              placeholder="单位名称"
              style="width:180px;"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table v-loading="listLoading" border :data="tableData" size="small" stripe>
          <!-- 详情展示 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form class="demo-table-expand">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="企业名称">
                      <span>{{ props.row.companyName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="法定代表人">
                      <span>{{ props.row.legalRepresentative }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <span>{{ props.row.phone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="安全生产主要负责人">
                      <span>{{ props.row.companyName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="从业人数">
                      <span>{{ props.row.legalRepresentative }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="注册安全工程师人数">
                      <span>{{ props.row.phone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="特种作业人数">
                      <span>{{ props.row.companyName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电话">
                      <span>{{ props.row.legalRepresentative }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="生产状态">
                      <span>{{ props.row.phone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="专职安全管理人员">
                      <span>{{ props.row.companyName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="安全生产许可证有效期">
                      <span>{{ props.row.legalRepresentative }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <span>{{ props.row.phone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单位值班电话">
                      <span>{{ props.row.companyName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电子邮箱">
                      <span>{{ props.row.legalRepresentative }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <span>{{ props.row.phone }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="许可证扫描件上传">
                    <div class="demo-image__preview">
                      <el-image :src="props.row.licence" style="width: 100px; height: 100px" />
                    </div>
                  </el-form-item>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column sortable prop="companyName" label="企业名称" width="200" />
          <el-table-column sortable prop="legalRepresentative" label="法定代表人" width="200" />
          <el-table-column sortable prop="phone" label="联系电话" width="300" />
          <el-table-column label="操作" width="621">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editOpenDialog(scope.$index,scope.row)">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
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
            <el-form-item label="企业名称">
              <el-input v-model="editData.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人">
              <el-input v-model="editData.legalRepresentative" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="editData.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人">
              <el-input v-model="editData.legalRepresentative" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="editData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="editData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="许可证扫描件上传">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              @error="handleLoadError"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog append-to-body :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button :loading="loading" type="primary">确定</el-button>
          <el-button @click="editDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 弹出添加窗口 -->
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
            <el-form-item label="企业名称">
              <el-input v-model="addData.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人">
              <el-input v-model="addData.legalRepresentative" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称">
              <el-input v-model="addData.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人">
              <el-input v-model="addData.legalRepresentative" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="addData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册地址">
              <el-input v-model="addData.address" />
            </el-form-item>
          </el-col>
          <el-row>
            <el-form-item label="许可证扫描件上传">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
          </el-row>
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
</template>

<script>
export default {
  data() {
    return {
      /* 搜索栏显示 */
      formInline: {
        organization: '',
        companyName: ''
      },
      tableData: [
        {
          companyName: '测绘院',
          phone: '111',
          date: '2016-05-03',
          legalRepresentative: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          licence:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575692911476&di=31f0688922bdef0b8930b51dd835d23f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201210%2F04%2F20121004231502_NrBQG.jpeg'
        },
        {
          companyName: '地勘院',
          phone: '111222',
          date: '2016-05-02',
          legalRepresentative: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          licence:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          companyName: '地勘院',
          phone: '111222',
          date: '2016-05-04',
          legalRepresentative: '李四',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          licence:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          companyName: '地勘院',
          phone: '111222',
          date: '2016-05-01',
          legalRepresentative: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          licence:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        },
        {
          companyName: '地勘院',
          phone: '111222',
          date: '2016-05-08',
          legalRepresentative: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          licence:
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
      ],
      editData: {
        companyName: '',
        legalRepresentative: '',
        phone: '',
        licence: ''
      },
      addData: {
        companyName: '',
        legalRepresentative: '',
        phone: '',
        licence: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        legalRepresentative: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },
      editDialog: false,
      dialogImageUrl: '',
      dialogVisible: false,
      /* 页面加载 */
      // listLoading: true,
      addDialog: false,
      currentPage2: 5,
      btnLoading: false
    }
  },
  methods: {
    /* 查询提交按钮 */
    onSubmit() {
      console.log('submit!')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    editOpenDialog(index, row) {
      this.editDialog = true // 编辑信息模态框显示
      // 获得所有数据显示在编辑信息模态框里面;
      this.editData = Object.assign({}, row)
    },
    /* 许可证扫描上传照片墙 */
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    /* 显示图片出错时 */
    handleLoadError(e) {
      const img = e.srcElement
      this.imageUrl = this.errorLoadImg //  用加载失败的图片替代之
      img.onerror = null //  清除错误:如果错误时加载时显示的图片出错，将会一直循环，所以我们必须清除掉错误，限制运行一次
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
