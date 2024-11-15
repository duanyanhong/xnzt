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
              v-model="searchData.provinceName"
              clearable
              size="small"
              placeholder="输入省搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.cityName"
              clearable
              size="small"
              placeholder="输入市搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.areaName"
              clearable
              size="small"
              placeholder="输入区搜索"
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
              v-hasPermi="['Base:PlatformScope:Add']"
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
              v-hasPermi="['Base:PlatformScope:Import']"
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
              v-hasPermi="['Base:PlatformScope:Export']"
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
          <u-table-column :show-overflow-tooltip="true" prop="platformName" label="平台" />
          <u-table-column :show-overflow-tooltip="true" prop="provinceName" label="省" />
          <u-table-column :show-overflow-tooltip="true" prop="cityName" label="市" />
          <u-table-column :show-overflow-tooltip="true" prop="areaName" label="区" />
          <u-table-column label="禁用" width="100" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            width="225"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Base:PlatformScope:Detail']" size="mini" type="text"  icon="el-icon-link" @click="shineDetail(scope.row)">详情</el-button>
              <el-popover v-hasPermi="['Base:PlatformScope:Cancel']"  :ref="`popoverC-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定取消吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popoverC-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="handelCancel(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" class="el-button--success" type="text"  size="mini">取消</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:PlatformScope:Delete']"  :ref="`popovers-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popovers-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteScope(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" class="el-button--success" type="text" icon="el-icon-delete" size="mini">删除</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:PlatformScope:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:PlatformScope:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <!--映射地址-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="500px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="名称" prop="scopeName">
          <el-input v-model="formData.scopeName" style="width: 250px" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="平台" prop="platformId">
          <el-select
            v-model="formData.platformId"
            style="width: 250px"
            placeholder="请选择"
            @change="getProvince"
          >
            <el-option
              v-for="item in platformsName"
              :key="item.platformId"
              :label="item.platformName"
              :value="item.platformId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="scopeType">
          <el-select
            v-model="formData.scopeType"
            style="width: 250px"
            placeholder="请选择"
            @change="getProvince"
          >
            <el-option value="省份" label="省份" />
            <el-option value="城市" label="城市" />
            <el-option value="区域" label="区域" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId" v-if="formData.scopeType=='城市' || formData.scopeType=='区域'">
          <el-select
            v-model="formData.provinceId"
            style="width: 250px"
            placeholder="请选择"
            @change="getCity"
            filterable
          >
            <el-option
              v-for="item in province"
              :key="item.provinceId"
              :label="item.provinceName"
              :value="item.provinceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityId" v-if="formData.scopeType=='区域'">
          <el-select
            v-model="formData.cityId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in city"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="映射详情" :visible.sync="dialogTableVisible" width="500px">
      <el-table :data="gridData" :row-height="50" :height="350" >
        <el-table-column property="provinceName" align="center"  label="省"></el-table-column>
        <el-table-column property="cityName" align="center"  label="市"></el-table-column>
        <el-table-column property="areaName" align="center"  label="区"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getPlatformscopeList,deletePlatformscope,addPlatformscope,disablePlatformscope,importPlatformscope,exportPlatformscope,getProvince,getCity,scopeDetail , cancelScope } from "@/api/base/platformscope";
export default {
  name: 'Platformscope',
  data() {
    return {
      rules: {
        platformId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        scopeType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        scopeName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      searchData: {
        provinceName: '',
        cityName: '',
        areaName: '',
        limit: 20,
        page: 1,
        accessToken:sessionStorage.getItem('xn_token')
      },
      pageSizes: [20, 50, 100],
      dataList: [],
      total: 0,
      loading: false,
      formIsshow: false,
      dialogTableVisible: false,
      formData: {
        id: '',
        platformId: '',
        scopeType: '',
        scopeName: '',
        cityId: '',
        provinceId: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理平台地址',
      province:[],
      city:[],
      platformsName: [],
      gridData: []
    }
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
      getPlatformscopeList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.platformsName = res.msgData.platformsName
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
          addPlatformscope(_this.formData).then(res => {
            if(res){
              _this.formIsshow = false
              _this.$modal.notifySuccess(res.errMsg)
              _this.loadData()
            }
          })
        } else {
          return false
        }
      })
    },
    uploadSuccess(file){
      this.loading = true
      const param = new FormData()
      param.append('file', file.file)
      param.append('accessToken', sessionStorage.getItem('xn_token'))
      importPlatformscope(param).then(res => {
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
      exportPlatformscope(this.searchData).then(res => {
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
      disablePlatformscope(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    },
    // 取消
    handelCancel(scope) {
      this.$refs[`popoverC-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      cancelScope(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    },
    deleteScope(scope) {
      this.$refs[`popovers-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      deletePlatformscope(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    },
    getProvince(){
      this.formData.provinceId=''
      this.formData.cityId=''
      this.city = []
      if(this.formData.scopeType=='省份' || this.formData.scopeType=='' || this.formData.platformId==''){
        this.province = []
        return;
      }
      const data = {accessToken:sessionStorage.getItem('xn_token'),platformId:this.formData.platformId}
      getProvince(data).then(res => {
        if(res){
          this.province = res.msgData.provinces
        }
      })
    },
    getCity(){
      if(this.formData.scopeType!='区域'){
        return;
      }
      const data = {accessToken:sessionStorage.getItem('xn_token'),provinceId:this.formData.provinceId}
      this.formData.cityId=''
      getCity(data).then(res => {
        if(res){
          this.city = res.msgData.cities
        }
      })
    },
    shineDetail(row){
      const data = {accessToken:sessionStorage.getItem('xn_token'),scopeAreaId:row.scopeAreaId}
      this.gridData=[]
      scopeDetail(data).then(res => {
        if(res){
          if(res.msgData.details.length<1){
            this.$modal.notifyError('暂无映射地址！')
            return
          }
          this.gridData = res.msgData.details
          this.dialogTableVisible = true
        }
      })
    },
  }
}
</script>

