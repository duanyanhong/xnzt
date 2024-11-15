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
              v-model="searchData.erplogisticsCode"
              clearable
              size="small"
              placeholder="输入平台物流编码搜索"
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
              v-hasPermi="['Base:PlatformLogistics:Add']"
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
              v-hasPermi="['Base:PlatformLogistics:Import']"
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
              v-hasPermi="['Base:PlatformLogistics:Export']"
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
          <u-table-column :show-overflow-tooltip="true" prop="logisticsName" label="物流" />
          <u-table-column :show-overflow-tooltip="true" prop="platformlogisticsCode" label="平台物流编码" />
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
              <el-button v-hasPermi="['Base:PlatformLogistics:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
              <el-popover v-hasPermi="['Base:PlatformLogistics:Disable']" v-if="scope.row.disable=='否'" :ref="`popover-${scope.$index}`" placement="top" width="200">
                <p style="line-height:40px"><i class="el-icon-info" style="color:rgb(255,153,0)" /> 确定禁用吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[`popover-${scope.$index}`].doClose()">取消</el-button>
                  <el-button type="primary" size="mini" @click="editDisable(scope)">确定</el-button>
                </div>
                <el-button slot="reference" style="width: 50px;" type="text" icon="el-icon-lock" size="mini">禁用</el-button>
              </el-popover>
              <el-popover v-hasPermi="['Base:PlatformLogistics:Disable']" v-if="scope.row.disable=='是'" :ref="`popover-${scope.$index}`" placement="top" width="200">
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
      <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="150px">
        <el-form-item label="平台" prop="platformId">
          <el-select
            v-model="formData.platformId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in platforms"
              :key="item.platformId"
              :label="item.platformName"
              :value="item.platformId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流" prop="logisticsId">
          <el-select
            v-model="formData.logisticsId"
            style="width: 250px"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in logistics"
              :key="item.logisticsId"
              :label="item.logisticsName"
              :value="item.logisticsId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="平台物流编码" prop="platformlogisticsCode">
          <el-input v-model="formData.platformlogisticsCode" style="width: 250px" placeholder="请输入erp物流编码" />
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
  import { getPlatformlogisticsList,editPlatformlogistics,addPlatformlogistics,disablePlatformlogistics,importPlatformlogistics,exportPlatformlogistics } from "@/api/base/platformlogistics";
  export default {
    name: 'Platformlogistics',
    data() {
      return {
        rules: {
          platformlogisticsCode: [
            { required: true, message: '请输入平台物流编码', trigger: 'blur' }
          ],
          platformId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          logisticsId: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        searchData: {
          erplogisticsCode: '',
          limit: 20,
          page: 1,
          accessToken:sessionStorage.getItem('xn_token')
        },
        pageSizes: [20, 50, 100],
        dataList: [],
        logistics: [],
        platforms: [],
        total: 0,
        loading: false,
        formIsshow: false,
        formData: {
          id: '',
          platformId: '',
          logisticsId: '',
          platformlogisticsCode: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理平台物流'
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
        getPlatformlogisticsList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.logistics = res.msgData.logistics
            this.platforms = res.msgData.platforms
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
              editPlatformlogistics(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
              addPlatformlogistics(_this.formData).then(res => {
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
        importPlatformlogistics(param).then(res => {
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
        exportPlatformlogistics(this.searchData).then(res => {
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
        disablePlatformlogistics(data).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      }
    }
  }
</script>

