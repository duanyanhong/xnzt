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
              v-model="searchData.logicwarehouseCode"
              clearable
              size="small"
              placeholder="输入逻辑仓编码搜索"
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
              v-hasPermi="['Base:Logicwarehouse:Add']"
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
          <u-table-column :show-overflow-tooltip="true" prop="warehouseName" label="物理仓" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseCode" label="逻辑仓编码" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseName" label="逻辑仓名称" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseType" label="接口类型" />
          <u-table-column :show-overflow-tooltip="true" prop="logicwarehouseClass" width="100" label="仓类型" />
          <u-table-column label="禁用"  align="center" width="100" >
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
              <el-button v-hasPermi="['Base:Logicwarehouse:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Logicwarehouse:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Logicwarehouse:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
        <el-form-item label="物理仓" prop="warehouseId">
          <el-select
            v-model="formData.warehouseId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in warehouses"
              :key="item.warehouseId"
              :label="item.warehouseName"
              :value="item.warehouseId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="逻辑仓编码" prop="logicwarehouseCode">
          <el-input v-model="formData.logicwarehouseCode" style="width: 250px" placeholder="请输入逻辑仓编码" />
        </el-form-item>
        <el-form-item label="逻辑仓名称" prop="logicwarehouseName">
          <el-input v-model="formData.logicwarehouseName" style="width: 250px" placeholder="请输入逻辑仓名称" />
        </el-form-item>
        <el-form-item label="接口类型" prop="logicwarehouseType">
          <el-select
            v-model="formData.logicwarehouseType"
            style="width: 250px"
            placeholder="请选择"
          >
            <el-option value="吉客云" label="吉客云" />
            <el-option value="京东云" label="京东云" />
            <el-option value="通天晓" label="通天晓" />
            <el-option value="爱家" label="爱家" />
            <el-option value="吉客道" label="吉客道" />
            <el-option value="其他" label="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓类型" prop="logicwarehouseClass">
          <el-select
            v-model="formData.logicwarehouseClass"
            style="width: 250px"
            placeholder="请选择"
          >
            <el-option value="虚拟" label="虚拟" />
            <el-option value="标准" label="标准" />
          </el-select>
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
import { getLogicwarehouseList,editLogicwarehouse,addLogicwarehouse,disableLogicwarehouse } from "@/api/base/logicwarehouse";
export default {
  name: 'Logicwarehouse',
  data() {
    return {
      rules: {
        warehouseId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        logicwarehouseType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        logicwarehouseCode: [
          { required: true, message: '请输入逻辑仓编码', trigger: 'blur' }
        ],
        logicwarehouseName: [
          { required: true, message: '请输入逻辑仓名称', trigger: 'blur' }
        ],
        logicwarehouseClass:[
        { required: true, message: '请选择仓类型', trigger: 'change' }

        ]
      },
      searchData: {
        logicwarehouseCode: '',
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
        warehouseId: '',
        logicwarehouseCode: '',
        logicwarehouseName: '',
        logicwarehouseType: '',
        logicwarehouseClass:'',
        accessToken: sessionStorage.getItem('xn_token')
      },
      jsHeight: 500,
      editStatus: false,
      titleContent: '管理逻辑仓库',
      warehouses:[]
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
      getLogicwarehouseList(this.searchData).then(res => {
        if(res){
          this.loading = false
          this.dataList = res.msgData.list.items
          this.total = res.msgData.list.total
          this.warehouses = res.msgData.warehouses
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
            editLogicwarehouse(_this.formData).then(res => {
              if(res){
                _this.formIsshow = false
                _this.$modal.notifySuccess(res.errMsg)
                _this.loadData()
              }
            })
          } else {
            addLogicwarehouse(_this.formData).then(res => {
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
      disableLogicwarehouse(data).then(res => {
        if(res){
          this.$modal.notifySuccess(res.errMsg)
          this.loadData()
        }
      })
    }
  }
}
</script>

