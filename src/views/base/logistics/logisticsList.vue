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
              v-model="searchData.logisticsCode"
              clearable
              size="small"
              placeholder="输入物流编码搜索"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="searchData.logisticsName"
              clearable
              size="small"
              placeholder="输入物流名称搜索"
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
              v-hasPermi="['Base:Logistics:Add']"
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
              v-hasPermi="['Base:Logistics:Import']"
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
              v-hasPermi="['Base:Logistics:Export']"
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
          <u-table-column :show-overflow-tooltip="true" prop="logisticsCode" label="物流编码" />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsName" label="物流名称" />
          <u-table-column :show-overflow-tooltip="true" prop="aliasName" label="物流别名" />
          <u-table-column :show-overflow-tooltip="true" prop="contactName" label="联系人" />
          <u-table-column :show-overflow-tooltip="true" prop="contactMobile" label="联系电话" />
          <u-table-column :show-overflow-tooltip="true" prop="assignType" label="指派类型" />
          <u-table-column :show-overflow-tooltip="true" prop="useScope" label="使用范围" />
          <u-table-column :show-overflow-tooltip="true" prop="remark" label="备注" />
          <u-table-column label="禁用"  align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.disable == '是'" type="danger" >{{ scope.row.disable }}</el-tag>
              <el-tag v-else-if="scope.row.disable == '否'" type="success" >{{ scope.row.disable }}</el-tag>
            </template>
          </u-table-column>
          <u-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Base:Logistics:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:Logistics:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:Logistics:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
        <el-form-item label="物流编码" prop="logisticsCode">
          <el-input v-model="formData.logisticsCode" style="width: 200px" placeholder="请输入物流编码" />
        </el-form-item>
        <el-form-item label="物流名称" prop="logisticsName">
          <el-input v-model="formData.logisticsName" style="width: 200px" placeholder="请输入物流名称" />
        </el-form-item>
        <el-form-item label="物流别名" prop="aliasName">
          <el-input v-model="formData.aliasName" style="width: 200px" placeholder="请输入物流别名" />
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="formData.contactName" style="width: 200px" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactMobile">
          <el-input v-model="formData.contactMobile" style="width: 200px" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="指派类型" prop="assignType">
          <el-select
            v-model="formData.assignType"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="自己联系" label="自己联系" />
            <el-option value="平台联系" label="平台联系" />
          </el-select>
        </el-form-item>
        <el-form-item label="使用范围" prop="useScope">
          <el-select
            v-model="formData.useScope"
            style="width: 200px"
            placeholder="请选择"
          >
            <el-option value="普通快递" label="普通快递" />
            <el-option value="门店配送" label="门店配送" />
            <el-option value="线下配送" label="线下配送" />
            <el-option value="自有物流" label="自有物流" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" style="width: 200px" placeholder="请输入备注" />
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
  import { getLogisticsList,editLogistics,addLogistics,disableLogistics,importLogistics,exportLogistics } from "@/api/base/logistics";
  export default {
    name: 'Logistics',
    data() {
      return {
        rules: {
          logisticsCode: [
            { required: true, message: '请输入物流编码', trigger: 'blur' }
          ],
          logisticsName: [
            { required: true, message: '请输入物流名称', trigger: 'blur' }
          ],
          aliasName: [
            { required: true, message: '请输入物流别名', trigger: 'blur' }
          ],
          assignType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          useScope: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        searchData: {
          logisticsCode: '',
          logisticsName: '',
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
          logisticsCode: '',
          logisticsName: '',
          aliasName: '',
          contactName: '',
          contactMobile: '',
          assignType: '',
          useScope: '',
          remark: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理物流信息'
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
        getLogisticsList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
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
              editLogistics(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addLogistics(_this.formData).then(res => {
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
        importLogistics(param).then(res => {
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
        exportLogistics(this.searchData).then(res => {
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
        disableLogistics(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      }
    }
  }
</script>

