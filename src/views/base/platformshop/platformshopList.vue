
<!--基础配置-店铺管理-网店对接 -->
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
              v-model="searchData.appCode"
              clearable
              size="small"
              placeholder="输入供应商编码搜索"
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
              v-hasPermi="['Base:PlatformShop:Add']"
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
          :row-height="50"
          stripe
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column :show-overflow-tooltip="true" prop="shopName"  label="店铺" />
          <u-table-column :show-overflow-tooltip="true" prop="appCode" label="供应商编码" />
          <u-table-column :show-overflow-tooltip="true" prop="appKey" label="appKey" />
          <u-table-column :show-overflow-tooltip="true" prop="appSecret" label="appSecret" />
          <u-table-column :show-overflow-tooltip="true" prop="batchOutReturn" label="分批出库回传" />
          <u-table-column label="禁用"  align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            align="center"
            width="185"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Base:PlatformShop:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:PlatformShop:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:PlatformShop:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="500px">
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="120px">
        <el-form-item label="店铺" prop="shopId">
          <el-select
            v-model="formData.shopId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in shop"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="供应商编码" prop="appCode">
          <el-input v-model="formData.appCode" style="width: 250px" placeholder="请输入供应商编码" />
        </el-form-item>
        <el-form-item label="appKey" prop="appKey">
          <el-input v-model="formData.appKey" style="width: 250px" placeholder="请输入appKey" />
        </el-form-item>
        <el-form-item label="appSecret" prop="appSecret">
          <el-input v-model="formData.appSecret" style="width: 250px" placeholder="请输入appSecret" />
        </el-form-item>
        <el-form-item label="分批出库回传" >
          <el-switch v-model="formData.batchOutReturn"></el-switch>
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
import { getPlatformShopList,editPlatformShop,addPlatformShop,disablePlatformShop } from "@/api/base/platformshop";
export default {
  name: 'Platformshop',
  data() {
    return {
      rules: {
        shopId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      searchData: {
        appCode: '',
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
        shopId: '',
        appCode: '',
        appKey: '',
        appSecret: '',
        batchOutReturn:false,
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理网店对接',
      shop:[]
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
      getPlatformShopList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.shop = res.msgData.shops
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
      this.formData.batchOutReturn = false
      this.formIsshow = true
    },
    addForm() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          var _this = this
          _this.formData.batchOutReturn =  _this.formData.batchOutReturn ? '是':'否'
          if (_this.editStatus) {
            editPlatformShop(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addPlatformShop(_this.formData).then(res => {
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
      this.formData.batchOutReturn = this.formData.batchOutReturn == '是' ? true : false
      this.editStatus = true
      this.formIsshow = true
    },
    editDisable(scope) {
      this.$refs[`popover-${scope.$index}`].doClose()
      const data = {id: scope.row.id, accessToken: sessionStorage.getItem('xn_token')}
      disablePlatformShop(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

