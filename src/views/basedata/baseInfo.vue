<template>
  <div class="dashboard-container">
    <div class="panel">
      <div class="panel-title">
        <breadcrumb class="breadcrumb-container" />
      </div>
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
          <!-- v-loading="listLoading" -->
          <el-table border :data="tableData" size="small" stripe>
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
                      <el-form-item label="代码证类型">
                        <span>{{ props.row.codeCertificateType }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="单位类别">
                        <span>{{ props.row.unitCategory }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="注册地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="统一社会信用代码">
                        <span>{{ props.row.unifiedSocialCreditCode }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="生产经营地址">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="营业执照类别">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="法定代表人">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="工商登记有效期">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="法定代表人联系电话">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经营范围">
                        <span>{{ props.row.businessAddress }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="行业类别">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="企业规模">
                        <span>{{ props.row.companyName }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经济类型">
                        <span>{{ props.row.legalRepresentative }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="注册证件上传">
                        <div class="demo-image__preview">
                          <el-image :src="props.row.licence" style="width: 100px; height: 100px" />
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="办公地点GPS坐标">
                        <!-- <span>{{ props.row.phone }}</span> -->
                        <div id="bmap" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column sortable prop="companyName" label="企业名称" />
            <el-table-column sortable prop="legalRepresentative" label="法定代表人" />
            <el-table-column sortable prop="phone" label="联系电话" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="editOpenDialog(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 分页栏 -->

      <el-row>
        <!-- 分页栏 -->
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
      <!--   <el-row>
        <el-pagination layout="prev, pager, next" :total="50" />
      </el-row> -->
      <!-- 修改 -->
      <el-dialog title="修改" :visible.sync="editDialog" width="50%" :before-close="handleClose">
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
                :file-list="fileList"
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
            <el-button :loading="btnLoading" type="primary">确定</el-button>
            <el-button @click="editDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 弹出添加窗口 -->
      <el-dialog title="新增" :visible.sync="addDialog" width="50%" :before-close="handleClose">
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
  </div>
</template>

<script>
// import { BMap } from 'BMap'
export default {
  name: 'Dashboard',
  data() {
    return {
      fileList: [
        {
          // name可以为空，但是路径不可以
          name: 'food.jpeg',
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575692911476&di=31f0688922bdef0b8930b51dd835d23f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201210%2F04%2F20121004231502_NrBQG.jpeg'
        },
        {
          name: 'food1.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: '',
          url: ''
        }
      ],
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
      /* 页面加载 */
      // listLoading: true,
      dialogVisible: false,
      addDialog: false,
      currentPage2: 5,
      btnLoading: false
    }
  },
  mounted() {
    var map = new BMap.Map('bmap')
    // 中心位置在甘肃，然后5倍速
    map.centerAndZoom(new BMap.Point(104.769128, 34.972443), 5)
    var data_info = [
      [106.653298, 29.732213, '重庆江北国际机场'],
      [115.807698, 28.662684, '地址：南昌市红谷滩新区学府大道999号'],
      [116.412222, 39.912345, '地址：北京市东城区正义路甲5号']
    ]
    var opts = {
      width: 250, // 信息窗口宽度
      height: 60, // 信息窗口高度
      title: '信息窗口', // 信息窗口标题
      enableMessage: true // 设置允许信息窗发送短息
    }
    for (var i = 0; i < data_info.length; i++) {
      // eslint-disable-next-line no-undef
      var marker = new BMap.Marker(
        new BMap.Point(data_info[i][0], data_info[i][1])
      )
      // 创建标注
      var content = data_info[i][2]
      map.addOverlay(marker)
      // 将标注添加到地图中
      addClickHandler(content, marker)
    }
    function addClickHandler(content, marker) {
      marker.addEventListener('click', function(e) {
        openInfo(content, e)
      })
    }
    function openInfo(content, e) {
      var p = e.target
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
      var infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, point) // 开启信息窗口
    }
    // 右键放大
    var txtMenuItem = [
      {
        text: '放大',
        callback: function() {
          map.zoomIn()
        }
      },
      {
        text: '缩小',
        callback: function() {
          map.zoomOut()
        }
      }
    ]
    var menu = new BMap.ContextMenu()
    // eslint-disable-next-line no-redeclare
    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100))
    }
    // 右键放大
    map.addContextMenu(menu)
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
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
    /* 照片墙 */
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
