
<!-- 基础配置-门店管理-门店信息 -->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div>
            <!-- 搜索 -->
            <el-input
              v-model="searchData.siteCode"
              clearable
              size="small"
              placeholder="输入门店编码搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.siteName"
              clearable
              size="small"
              placeholder="输入门店名称搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>
        <div class="crud-opts">
          <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="addShow"
              plain
              v-hasPermi="['Base:Site:Add']"
            >
              新增
            </el-button>
            <!--右侧-->
            <slot name="right" />
          </span>
          <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-upload
              class="inline-block"
              :show-file-list="false"
              :http-request="uploadSuccess"
              accept=".xlsx,.xls,.csv"
              action="#"
              v-hasPermi="['Base:Site:Import']"
            >
              <el-button type="success" plain icon="el-icon-upload2" size="mini">导入</el-button>
            </el-upload>
          </span>
          <span class="crud-opts-left">
            <el-button
              class="filter-item"
              size="mini"
              type="warning"
              icon="el-icon-download"
              plain
              @click="downMyOrder"
              v-hasPermi="['Base:Site:Export']"
            >导出</el-button>
          </span>
        </div>
        <u-table
          ref="plTable"
          v-loading="loading"
          :data="dataList"
          :height="jsHeight"
          use-virtual
          :row-height="50"
          stripe
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseCode" align="center" width="120" label="逻辑仓编码" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseName" align="center" width="120" label="逻辑仓名称" />
          <u-table-column :show-overflow-tooltip="true" prop="siteCode" align="center" label="门店编码" />
          <u-table-column :show-overflow-tooltip="true" prop="siteName" align="center" label="门店名称" />
          <u-table-column :show-overflow-tooltip="true" prop="contactName" align="center" label="联系人" />
          <u-table-column :show-overflow-tooltip="true" prop="contactMobile" align="center" label="手机号码" />
          <u-table-column :show-overflow-tooltip="true" prop="province" align="center" label="省份" />
          <u-table-column :show-overflow-tooltip="true" prop="city" align="center" label="城市" />
          <u-table-column :show-overflow-tooltip="true" prop="area" align="center" label="区/县" />
          <u-table-column :show-overflow-tooltip="true" prop="town" align="center" label="街道" />
          <u-table-column :show-overflow-tooltip="true" prop="detailAddress" align="center" width="120"  label="详细地址" />
          <u-table-column :show-overflow-tooltip="true" prop="lng" align="center" label="经度" />
          <u-table-column :show-overflow-tooltip="true" prop="lat" align="center" label="纬度" />
          <u-table-column :show-overflow-tooltip="true" prop="assignSwitch" align="center" label="控单开关" />
          <u-table-column :show-overflow-tooltip="true" prop="assignLimit" align="center" label="配送上限" />
          <u-table-column :show-overflow-tooltip="true" prop="stockLimit" align="center" label="存货上限" />
          <u-table-column :show-overflow-tooltip="true" prop="siteType" align="center" label="门店类型" />
          <u-table-column :show-overflow-tooltip="true" prop="siteGrade" align="center" label="门店等级" />
          <u-table-column :show-overflow-tooltip="true" prop="siteExtent" align="center" width="120" label="门店面积(M²)" />
          <u-table-column :show-overflow-tooltip="true" prop="openTime"  align="center" width="120" label="开始营业时间" />
          <u-table-column :show-overflow-tooltip="true" prop="closeTime"  align="center" width="120" label="结束营业时间" />
          <u-table-column label="禁用" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            width="185"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Base:Site:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Site:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Site:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定启用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" class="el-button--success" type="text" icon="el-icon-unlock" size="mini">启用</el-button>
              </el-popover>
            </template>
          </u-table-column>
        </u-table>
        <!--分页组件-->
        <pagination
          :limit.sync="searchData.limit"
          :page.sync="searchData.page"
          :total="total"
          :page-sizes.sync="pageSizes"
          @pagination="loadData"
        />
      </el-col>
    </el-row>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="720px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="逻辑仓" prop="logicwarehouseId">
          <el-select
            v-model="formData.logicwarehouseId"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in logicwarehouses"
              :key="item.logicwarehouseId"
              :label="item.logicwarehouseName"
              :value="item.logicwarehouseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="门店编码" prop="siteCode">
          <el-input v-model="formData.siteCode" style="width: 200px" placeholder="请输入门店编码" />
        </el-form-item>
        <el-form-item label="门店名称" prop="siteName">
          <el-input v-model="formData.siteName" style="width: 200px" placeholder="请输入门店名称" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="formData.contactName" style="width: 200px" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="手机号" prop="contactMobile">
          <el-input v-model="formData.contactMobile" style="width: 200px" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="formData.province" style="width: 200px" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="formData.city" style="width: 200px" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="区/县" prop="area">
          <el-input v-model="formData.area" style="width: 200px" placeholder="请输入区/县" />
        </el-form-item>
        <el-form-item label="街道" prop="town">
          <el-input v-model="formData.town" style="width: 200px" placeholder="请输入街道" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input v-model="formData.detailAddress" style="width: 200px" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="经度" prop="lng">
          <el-input v-model="formData.lng" style="width: 200px" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="formData.lat" style="width: 200px" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="控单开关" prop="assignSwitch">
          <el-select
            v-model="formData.assignSwitch"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="开" label="开" />
            <el-option value="关" label="关" />
          </el-select>
        </el-form-item>
        <el-form-item label="配送上限" prop="assignLimit">
          <el-input v-model="formData.assignLimit" style="width: 200px" placeholder="请输入配送上限" />
        </el-form-item>
        <el-form-item label="存货上限" prop="stockLimit">
          <el-input v-model="formData.stockLimit" style="width: 200px" placeholder="请输入存货上限" />
        </el-form-item>
        <el-form-item label="门店类型" prop="siteType">
          <el-select
            v-model="formData.siteType"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="委外" label="委外" />
            <el-option value="自营" label="自营" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店等级" prop="siteGrade">
          <el-select
            v-model="formData.siteGrade"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="一级" label="一级" />
            <el-option value="二级" label="二级" />
          </el-select>
        </el-form-item>
        <el-form-item label="门店面积" prop="siteExtent">
          <el-input v-model="formData.siteExtent" style="width: 200px" placeholder="请输入门店面积(M²)" />
        </el-form-item>
        <el-form-item label="开始营业时间" prop="openTime">
          <el-time-picker
            v-model="formData.openTime"
            style="width: 200px;"
            value-format="HH:mm:ss"
            placeholder="选择时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束营业时间" prop="closeTime">
          <el-time-picker
            v-model="formData.closeTime"
            style="width: 200px;"
            value-format="HH:mm:ss"
            placeholder="选择时间点">
          </el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSiteList,editSite,addSite,disableSite,importSite,exportSite } from "@/api/base/site";
import { watch } from "vue";
export default {
  name: 'Site',
  data() {
    return {
      rules: {
        logicwarehouseId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        assignSwitch: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        siteType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        siteGrade: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        siteCode: [
          { required: true, message: '请输入门店编码', trigger: 'blur' }
        ],
        siteName: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请输入省', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入市', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入区/县', trigger: 'blur' }
        ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        assignLimit: [
          { required: true, message: '请输入配送上限', trigger: 'blur' }
        ],
        stockLimit: [
          { required: true, message: '请输入存货上限', trigger: 'blur' }
        ]
      },
      searchData: {
        siteCode: '',
        siteName: '',
        limit: 20,
        page: 1,
        accessToken:sessionStorage.getItem('xn_token')
      },
      pageSizes: [20, 50, 100],
      dataList: [],
      total: 0,
      loading: false,
      formIsshow: false,
      formData: {
        id: '',
        logicwarehouseId:'',
        // carrierId: '',
        siteCode: '',
        siteName: '',
        contactName: '',
        contactMobile: '',
        province: '',
        city: '',
        area:'',
        town:'',
        detailAddress: '',
        lng: '',
        lat: '',
        assignSwitch: '',
        assignLimit: '',
        stockLimit: '',
        siteType: '',
        siteGrade: '',
        siteExtent: '',
        openTime: '',
        closeTime: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理门店信息',
      carrier:[],
      logicwarehouses:[],
    }
  },
  watch:{
    
  },
  created() {
        this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
  },
  mounted() {
      this.loadData()
      // 设置表格高度
      this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
      // / 监听浏览器窗口变化，动态计算表格高度，
      window.onresize = () => {
      return (() => {
          this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
      })()
      }
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.plTable.doLayout(); //解决表格错位
    });
  },
  methods: {
    // 列表数据
    loadData() {
      this.loading = true
      getSiteList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          // this.carrier = res.msgData.carriers
          this.logicwarehouses =res.msgData.logicwarehouses
        }
      })
    },
    // 搜索
    search() {
      this.page = 1
      this.loadData()
    },
    // 添加用户
    addShow() {
      this.editStatus = false
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken'){
          this.formData[key]=''
        }
      }
      this.formIsshow = true
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var _this = this
          if (_this.editStatus) {
            editSite(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addSite(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    editStaff(row) {
      if (this.$refs['formData'] !== undefined) {
        this.$refs['formData'].resetFields()
      }
      for(var key in this.formData){
        if(key!='accessToken'){
          this.formData[key]=row[key]
        }
      }
      this.editStatus = true
      this.formIsshow = true
    },
    uploadSuccess(file){
      this.loading = true
      const param = new FormData()
      param.append('file', file.file)
      param.append('accessToken', sessionStorage.getItem('xn_token'))
      importSite(param).then(res => {
        this.loading = false
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
            window.location.href = res.msgData.downloadUrl
          }
          this.loadData()
        }
      })
    },
    downMyOrder() {
      this.loading = true
      exportSite(this.searchData).then(res => {
        this.loading = false
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
            window.location.href = res.msgData.downloadUrl
          }
          this.loadData()
        }
      })
    },
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disableSite(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

