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
              v-model="searchData.cloudName"
              clearable
              size="small"
              placeholder="输入配置名搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-select
              v-model="searchData.ownerId"
              clearable
              size="small"
              placeholder="货主"
              class="order-input"
              style="width: 350px"
              multiple
              collapse-tags
              filterable
            >
              <el-option
                v-for="(item,index) in owner"
                :key="item.ownerId"
                :label="item.ownerName"
                :value="item.ownerId"
              />
            </el-select>
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
              v-hasPermi="['Base:Cloudwarehouse:Add']"
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
              v-hasPermi="['Base:Cloudwarehouse:Import']"
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
              v-hasPermi="['Base:Cloudwarehouse:Export']"
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
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseName" label="逻辑仓库" />
          <u-table-column :show-overflow-tooltip="true" prop="cloudName" label="配置名称" />
          <u-table-column :show-overflow-tooltip="true" prop="cloudCode" label="事业部编码" />
          <u-table-column :show-overflow-tooltip="true" prop="cloudKey" label="appKey" />
          <u-table-column :show-overflow-tooltip="true" prop="cloudSecret" label="appSecret" />
          <u-table-column :show-overflow-tooltip="true" prop="cloudToken" label="accessToken" />
          <u-table-column :show-overflow-tooltip="true" prop="pinCode" label="授权码" />
          <u-table-column :show-overflow-tooltip="true" prop="supplierCode" label="供应商编码" />
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
              <el-button v-hasPermi="['Base:Cloudwarehouse:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Cloudwarehouse:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Cloudwarehouse:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
        <el-form-item label="货主" prop="ownerId">
          <el-select
            v-model="formData.ownerId"
            style="width: 200px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in owner"
              :key="item.ownerId"
              :label="item.ownerName"
              :value="item.ownerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="逻辑仓库" prop="logicwarehouseId">
          <el-select
            v-model="formData.logicwarehouseId"
            style="width: 200px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in logicwarehouse"
              :key="item.logicwarehouseId"
              :label="item.logicwarehouseName"
              :value="item.logicwarehouseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配置名称" prop="cloudName">
          <el-input v-model="formData.cloudName" style="width: 200px" placeholder="请输入配置名称" />
        </el-form-item>
        <el-form-item label="事业部编码" prop="cloudCode">
          <el-input v-model="formData.cloudCode" style="width: 200px" placeholder="请输入事业部编码" />
        </el-form-item>
        <el-form-item label="appKey" prop="cloudKey">
          <el-input v-model="formData.cloudKey" style="width: 200px" placeholder="请输入appKey" />
        </el-form-item>
        <el-form-item label="appSecret" prop="cloudSecret">
          <el-input v-model="formData.cloudSecret" style="width: 200px" placeholder="请输入appSecret" />
        </el-form-item>
        <el-form-item label="accessToken" prop="cloudToken">
          <el-input v-model="formData.cloudToken" style="width: 200px" placeholder="请输入accessToken" />
        </el-form-item>
        <el-form-item label="授权码" prop="pinCode">
          <el-input v-model="formData.pinCode" style="width: 200px" placeholder="请输入授权码" />
        </el-form-item>
        <el-form-item label="供应商编码" prop="supplierCode">
          <el-input v-model="formData.supplierCode" style="width: 200px" placeholder="请输入供应商编码" />
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
import { getCloudwarehouseList,editCloudwarehouse,addCloudwarehouse,disableCloudwarehouse,importCloudwarehouse,exportCloudwarehouse } from "@/api/base/cloudwarehouse";
export default {
  name: 'Cloudwarehouse',
  data() {
    return {
      rules: {
        ownerId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        logicwarehouseId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cloudName: [
          { required: true, message: '请输入配置名称', trigger: 'blur' }
        ],
        cloudKey: [
          { required: true, trigger: 'blur', message: '请输入appKey' }
        ],
        cloudSecret: [
          { required: true, trigger: 'blur', message: '请输入appSecret' }
        ]
      },
      searchData: {
        cloudCode: '',
        cloudName: '',
        ownerId: [],
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
        ownerId: '',
        logicwarehouseId: '',
        cloudName: '',
        cloudCode: '',
        cloudKey: '',
        cloudSecret: '',
        cloudToken: '',
        pinCode: '',
        supplierCode:'',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理云仓配置',
      owner:[],
      logicwarehouse:[]
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
      getCloudwarehouseList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.owner = res.msgData.owners
          this.logicwarehouse = res.msgData.logicwarehouses
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
            editCloudwarehouse(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addCloudwarehouse(_this.formData).then(res => {
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
      importCloudwarehouse(param).then(res => {
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
      exportCloudwarehouse(this.searchData).then(res => {
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
      disableCloudwarehouse(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

