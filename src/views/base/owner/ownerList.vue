
<!-- 基础配置-货主管理-货主档案 -->
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
              v-model="searchData.ownerCode"
              clearable
              size="small"
              placeholder="输入货主编码搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="searchData.ownerName"
              clearable
              size="small"
              placeholder="输入货主名称搜索"
              style="width: 200px;"
              class="filter-item"
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
              v-hasPermi="['Base:Owner:Add']"
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
          <u-table-column :show-overflow-tooltip="true" prop="ownerCode" label="货主编码" />
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主名称" />
          <u-table-column :show-overflow-tooltip="true" prop="aliasName" label="货主别名" />
          <u-table-column :show-overflow-tooltip="true" prop="contactName" label="联系人" />
          <u-table-column :show-overflow-tooltip="true" prop="contactPhone" label="电话号码" />
          <u-table-column :show-overflow-tooltip="true" prop="contactMobile" label="手机号码" />
          <u-table-column :show-overflow-tooltip="true" prop="sendAddress" label="发货地址" />
          <!-- <u-table-column :show-overflow-tooltip="true" prop="erpBatch" label="ERP批次" />
          <u-table-column :show-overflow-tooltip="true" prop="wmsBatch" label="WMS批次" />
          <u-table-column :show-overflow-tooltip="true" prop="stocktakingNotice" label="盘点通知" />  不要了不要了不要了-->
          <!-- <u-table-column :show-overflow-tooltip="true" prop="timeConvert" width="100" label="时间转换率" />
          <u-table-column :show-overflow-tooltip="true" prop="volumeConvert" width="100" label="体积转换率" />
          <u-table-column :show-overflow-tooltip="true" prop="weightConvert" width="100" label="重量转换率" />
          <u-table-column :show-overflow-tooltip="true" prop="sizeConvert" width="100" label="长宽高转换率" />
          <u-table-column :show-overflow-tooltip="true" prop="examineName" label="审单流程" />     移走了移走了-->
          <u-table-column :show-overflow-tooltip="true" prop="ownerSource" label="货主来源" />
          <u-table-column :show-overflow-tooltip="true" prop="ownerSystem" label="系统类别" />
          <u-table-column :show-overflow-tooltip="true" prop="channelCode" label="渠道编码" />
          <u-table-column :show-overflow-tooltip="true" prop="channelName" label="渠道名称" />
          <!-- <u-table-column :show-overflow-tooltip="true" prop="appkey" label="appkey" /> -->
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
              <el-button v-hasPermi="['Base:Owner:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Owner:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Owner:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="700px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="货主编码" prop="ownerCode">
          <el-input v-model="formData.ownerCode" style="width: 200px" placeholder="请输入货主编码" />
        </el-form-item>
        <el-form-item label="货主名称" prop="ownerName">
          <el-input v-model="formData.ownerName" style="width: 200px" placeholder="请输入货主名称" />
        </el-form-item>
        <el-form-item label="货主别名" prop="aliasName">
          <el-input v-model="formData.aliasName" style="width: 200px" placeholder="请输入货主别名" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="formData.contactName" style="width: 200px" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="电话号码" prop="contactPhone">
          <el-input v-model="formData.contactPhone" style="width: 200px" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="手机号码" prop="contactMobile">
          <el-input v-model="formData.contactMobile" style="width: 200px" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="发货地址" prop="sendAddress">
          <el-input v-model="formData.sendAddress" style="width: 200px" placeholder="请输入发货地址" />
        </el-form-item>
        <!-- <el-form-item label="ERP批次" prop="erpBatch">
          <el-select
            v-model="formData.erpBatch"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="是" label="是" />
            <el-option value="否" label="否" />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="WMS批次" prop="wmsBatch">
          <el-select
            v-model="formData.wmsBatch"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="是" label="是" />
            <el-option value="否" label="否" />
          </el-select>
        </el-form-item>
        <el-form-item label="盘点通知" prop="stocktakingNotice">
          <el-select
            v-model="formData.stocktakingNotice"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="是" label="是" />
            <el-option value="否" label="否" />
          </el-select>
        </el-form-item> 不要了不要了不要了不要了 -->


        <!-- <el-form-item label="时间转换率" prop="timeConvert">
          <el-input v-model="formData.timeConvert" style="width: 200px" placeholder="请输入时间转换率" />
        </el-form-item>
        <el-form-item label="体积转换率" prop="volumeConvert">
          <el-input v-model="formData.volumeConvert" style="width: 200px" placeholder="请输入体积转换率" />
        </el-form-item>
        <el-form-item label="重量转换率" prop="weightConvert">
          <el-input v-model="formData.weightConvert" style="width: 200px" placeholder="请输入重量转换率" />
        </el-form-item>
        <el-form-item label="长宽高转换率" prop="sizeConvert">
          <el-input v-model="formData.sizeConvert" style="width: 200px" placeholder="请输入长宽高转换率" />
        </el-form-item>
        <el-form-item label="审单流程" prop="examineId">
          <el-select
            v-model="formData.examineId"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in examines"
              :key="item.examineId"
              :label="item.examineName"
              :value="item.examineId"
            />
          </el-select>
        </el-form-item> 移走至配置 移走至配置移走至配置-->


        <el-form-item label="货主来源" prop="ownerSource">
          <el-select
            v-model="formData.ownerSource"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="奇门" label="奇门" />
            <el-option value="网关" label="网关" />
          </el-select>
        </el-form-item>
        <el-form-item label="货主系统类别" prop="ownerSystem">
          <el-select
            v-model="formData.ownerSystem"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="E店宝" label="E店宝" />
            <el-option value="网店管家" label="网店管家" />
            <el-option value="吉客云" label="吉客云" />
            <el-option value="其它" label="其它" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道编码">
          <el-input v-model="formData.channelCode" style="width: 200px" placeholder="请输入渠道编码" />
        </el-form-item>
        <el-form-item label="渠道名称" >
          <el-input v-model="formData.channelName" style="width: 200px" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="奇门货主Id">
          <el-input v-model="formData.customerId" style="width: 200px" placeholder="请输入奇门货主Id" />
        </el-form-item>
        <el-form-item label="奇门对接编码" >
          <el-input v-model="formData.customerkey" style="width: 200px" placeholder="请输入奇门对接编码" />
        </el-form-item>
        <el-form-item label="奇门对接密钥">
          <el-input v-model="formData.customerSecret" style="width: 200px" placeholder="请输入奇门对接密钥" />
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
import { getOwnerList,editOwner,addOwner,disableOwner } from "@/api/base/owner";
export default {
  name: 'Owner',
  data() {
    return {
      rules: {
        ownerCode: [
          { required: true, message: '请输入货主编码', trigger: 'blur' }
        ],
        ownerName: [
          { required: true, message: '请输入货主名称', trigger: 'blur' }
        ],
        aliasName: [
          { required: true, message: '请输入货主别名', trigger: 'blur' }
        ],
        contactName: [
          { required: true, trigger: 'blur', message: '请输入联系人' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系人电话号码', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请输入联系人手机号码', trigger: 'blur' }
        ],
        sendAddress: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ],
        // erpBatch: [
        //   { required: true, message: '请选择', trigger: 'change' }
        // ],
        // wmsBatch: [
        //   { required: true, message: '请选择', trigger: 'change' }
        // ],
        // timeConvert: [
        //   { required: true, message: '请输入时间转换率', trigger: 'blur' }
        // ],
        // volumeConvert: [
        //   { required: true, message: '请输入体积转换率', trigger: 'blur' }
        // ],
        // weightConvert: [
        //   { required: true, message: '请输入重量转换率', trigger: 'blur' }
        // ],
        // sizeConvert: [
        //   { required: true, message: '请输入尺寸(长宽高)转换率', trigger: 'blur' }
        // ],
        // examineId: [
        //   { required: true, message: '请选择', trigger: 'change' }
        // ],
        ownerSource: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        ownerSystem: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        // stocktakingNotice: [
        //   { required: true, message: '请选择', trigger: 'change' }
        // ]
      },
      searchData: {
        ownerCode: '',
        ownerName: '',
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
        ownerCode: '',
        ownerName: '',
        aliasName: '',
        contactName: '',
        contactPhone: '',
        contactMobile: '',
        sendAddress: '',
        // erpBatch: '',
        // wmsBatch:'',
        // timeConvert:'',
        // volumeConvert: '',
        // weightConvert: '',
        // sizeConvert: '',
        // examineId:'',
        ownerSource: '',
        ownerSystem: '',
        // stocktakingNotice:'',
        // appkey: '', //不用
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理货主',
      examines:[]
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
      getOwnerList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.examines = res.msgData.examines
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
            editOwner(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addOwner(_this.formData).then(res => {
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
      disableOwner(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

