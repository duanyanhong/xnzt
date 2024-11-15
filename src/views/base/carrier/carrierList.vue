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
              v-model="searchData.carrierCode"
              clearable
              size="small"
              placeholder="输入城配商编码搜索"
              style="width: 200px;"
              class="order-input"
            />
            <el-input
              v-model="searchData.carrierName"
              clearable
              size="small"
              placeholder="输入城配商名称搜索"
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
              v-hasPermi="['Base:Carrier:Add']"
            >
              新增
            </el-button>
            <!--右侧-->
            <slot name="right" />
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
          <u-table-column :show-overflow-tooltip="true" prop="carrierCode" label="城配商编码" />
          <u-table-column :show-overflow-tooltip="true" prop="carrierName" label="城配商名称" />
          <u-table-column :show-overflow-tooltip="true" prop="aliasName" label="城配商别名" />
          <u-table-column :show-overflow-tooltip="true" prop="companyName" label="公司" />
          <u-table-column :show-overflow-tooltip="true" prop="contactName" label="负责人" />
          <u-table-column :show-overflow-tooltip="true" prop="contactMobile" label="手机号码" />
          <u-table-column :show-overflow-tooltip="true" prop="province" label="省份" />
          <u-table-column :show-overflow-tooltip="true" prop="city" label="城市" />
          <u-table-column :show-overflow-tooltip="true" prop="area" label="区/县" />
          <u-table-column :show-overflow-tooltip="true" prop="town" label="街道" />
          <u-table-column :show-overflow-tooltip="true" prop="detailAddress" label="详细地址" />
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
              <el-button v-hasPermi="['Base:Carrier:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Carrier:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Carrier:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
        <el-form-item label="公司" prop="companyId">
          <el-select
            v-model="formData.companyId"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in company"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城配商编码" prop="carrierCode">
          <el-input v-model="formData.carrierCode" style="width: 200px" placeholder="请输入城配商编码" />
        </el-form-item>
        <el-form-item label="城配商名称" prop="carrierName">
          <el-input v-model="formData.carrierName" style="width: 200px" placeholder="请输入城配商名称" />
        </el-form-item>
        <el-form-item label="城配商别名" prop="aliasName">
          <el-input v-model="formData.aliasName" style="width: 200px" placeholder="请输入城配商别名" />
        </el-form-item>
        <el-form-item label="负责人" prop="contactName">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="addForm" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCarrierList,editCarrier,addCarrier,disableCarrier } from "@/api/base/carrier";
export default {
  name: 'Carrier',
  data() {
    return {
      rules: {
        companyId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        carrierCode: [
          { required: true, message: '请输入城配商编码', trigger: 'blur' }
        ],
        carrierName: [
          { required: true, message: '请输入城配商名称', trigger: 'blur' }
        ],
        aliasName: [
          { required: true, message: '请输入城配商别名', trigger: 'blur' }
        ]
      },
      searchData: {
        carrierCode: '',
        carrierName: '',
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
        companyId: '',
        carrierCode: '',
        carrierName: '',
        aliasName:'',
        contactName: '',
        contactMobile: '',
        province: '',
        city: '',
        area:'',
        town:'',
        detailAddress: '',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理城配商',
      owner:[],
      company:[],
      department:[],
      platform: []
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
      getCarrierList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.company = res.msgData.companies
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
            editCarrier(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addCarrier(_this.formData).then(res => {
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
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disableCarrier(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

