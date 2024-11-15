
<!-- 基础配置-货主管理-货主配置 -->
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
                v-hasPermi="['Base:Ownerconfig:Add']"
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
           <u-table-column :show-overflow-tooltip="true" prop="ownerName" width="120"  label="货主名称" />
           <u-table-column :show-overflow-tooltip="true" prop="ownerCode" width="120"  label="货主编码" />
           <u-table-column :show-overflow-tooltip="true" prop="examineName" width="120"  label="审单流程" />
            <u-table-column :show-overflow-tooltip="true" prop="timeConvert" width="120" label="时间转换率" />
            <u-table-column :show-overflow-tooltip="true" prop="volumeConvert" width="120" label="体积转换率" />
            <u-table-column :show-overflow-tooltip="true" prop="weightConvert" width="120"  label="重量转换率" />
            <u-table-column :show-overflow-tooltip="true" prop="sizeConvert"  width="120" label="长宽高转换率" />
            <u-table-column :show-overflow-tooltip="true" prop="centralizedDistribution" label="统仓分配" />
            <u-table-column :show-overflow-tooltip="true" prop="batchInReturn" width="120" label="分批入库回传" />
            <u-table-column :show-overflow-tooltip="true" prop="batchOutReturn" width="120" label="分批出货回传" />
            <u-table-column :show-overflow-tooltip="true" prop="appointBatchOut" width="120" label="指定批次出库" />
            <u-table-column :show-overflow-tooltip="true" prop="appointBatchDelivery" width="120" label="指定批次发货" />
            <u-table-column :show-overflow-tooltip="true" prop="weightReturn" label="重量回传" />
            <u-table-column :show-overflow-tooltip="true" prop="inventoryAbnormal" width="120" label="库存异动通知" />
            <u-table-column :show-overflow-tooltip="true" prop="inventoryCheck" width="120" label="盘点结果通知" />
            <u-table-column :show-overflow-tooltip="true" prop="orderFlow" width="120" label="订单流水通知" />
            <u-table-column :show-overflow-tooltip="true" prop="orderAbnormal" width="120" label="订单异常通知" />
            <u-table-column :show-overflow-tooltip="true" prop="stockShortage" width="120" label="缺货异常通知" />
            <u-table-column :show-overflow-tooltip="true" prop="returnState" width="130" label="退货包裹状态通知" />
            <u-table-column :show-overflow-tooltip="true" prop="autoExamine" label="自动审单" />
            <u-table-column :show-overflow-tooltip="true" prop="autoMerge" label="自动合单" />
            <u-table-column
              label="操作"
              width="185"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button v-hasPermi="['Base:Ownerconfig:Edit']" size="mini" type="text" style="width: 50px;" icon="el-icon-edit" @click="editStaff(scope.row)">修改</el-button>
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
      <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="formIsshow" :title="titleContent" width="800px">
        <el-form ref="formData" :inline="true" :model="formData" :rules="rules" size="small" label-width="140px">
            <el-form-item label="货主名称" prop="ownerCode" >
                <el-select
                v-model="formData.ownerCode"
                style="width: 200px"
                placeholder="请选择"
                :disabled="editStatus"
                >
                    <el-option
                    v-for="item in owners"
                    :key="item.ownerCode"
                    :label="item.ownerName"
                    :value="item.ownerCode"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="货主编码" prop="ownerCode">
            <el-input v-model="formData.ownerCode"  disabled style="width: 200px" placeholder="请选择货主名称" />
            </el-form-item>
            <el-form-item label="时间转换率" prop="timeConvert">
            <el-input v-model="formData.timeConvert" type="number" style="width: 200px" placeholder="请输入时间转换率" />
            </el-form-item>
            <el-form-item label="体积转换率" prop="volumeConvert">
            <el-input v-model="formData.volumeConvert" type="number" style="width: 200px" placeholder="请输入体积转换率" />
            </el-form-item>
            <el-form-item label="重量转换率" prop="weightConvert">
            <el-input v-model="formData.weightConvert" type="number" style="width: 200px" placeholder="请输入重量转换率" />
            </el-form-item>
            <el-form-item label="长宽高转换率" prop="sizeConvert">
            <el-input v-model="formData.sizeConvert" type="number" style="width: 200px" placeholder="请输入长宽高转换率" />
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
            </el-form-item> 

            <div class="switch-chunk">
                <el-form-item label="统仓分配" >
                 <el-switch v-model="formData.centralizedDistribution"></el-switch>
                </el-form-item>
                <el-form-item label="分批入库回传" >
                 <el-switch v-model="formData.batchInReturn"></el-switch>
                </el-form-item>
                <el-form-item label="分批出货回传" >
                 <el-switch v-model="formData.batchOutReturn"></el-switch>
                </el-form-item>
                <el-form-item label="指定批次出库" >
                 <el-switch v-model="formData.appointBatchOut"></el-switch>
                </el-form-item>
                <el-form-item label="指定批次发货" >
                 <el-switch v-model="formData.appointBatchDelivery"></el-switch>
                </el-form-item>
                <el-form-item label="重量回传" >
                 <el-switch v-model="formData.weightReturn"></el-switch>
                </el-form-item>
                <el-form-item label="库存异动通知" >
                 <el-switch v-model="formData.inventoryAbnormal"></el-switch>
                </el-form-item>
                <el-form-item label="盘点结果通知" >
                 <el-switch v-model="formData.inventoryCheck"></el-switch>
                </el-form-item>
                <el-form-item label="订单流水通知" >
                 <el-switch v-model="formData.orderFlow"></el-switch>
                </el-form-item>
                <el-form-item label="订单异常通知" >
                 <el-switch v-model="formData.orderAbnormal"></el-switch>
                </el-form-item>
                <el-form-item label="缺货异常通知" >
                 <el-switch v-model="formData.stockShortage"></el-switch>
                </el-form-item>
                <el-form-item label="退货包裹状态通知" >
                 <el-switch v-model="formData.returnState"></el-switch>
                </el-form-item>
                <el-form-item label="自动审单" >
                 <el-switch v-model="formData.autoExamine"></el-switch>
                </el-form-item>
                <el-form-item label="自动合单">
                 <el-switch v-model="formData.autoMerge"></el-switch>
                </el-form-item>
            </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="formIsshow=false">取消</el-button>
            <el-button type="primary" v-debounce="addForm" >确认</el-button>
        </div>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import { ownerConfList,editOwnerconfig,addOwnerconfig } from "@/api/base/owner";
  export default {
    name: 'Owner',
    data() {
      return {
        rules: {
          timeConvert: [
            { required: true, message: '请输入时间转换率', trigger: 'blur' }
          ],
          volumeConvert: [
            { required: true, message: '请输入体积转换率', trigger: 'blur' }
          ],
          weightConvert: [
            { required: true, message: '请输入重量转换率', trigger: 'blur' }
          ],
          sizeConvert: [
            { required: true, message: '请输入尺寸(长宽高)转换率', trigger: 'blur' }
          ],
          examineId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        owners:[],
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
          examineId:'',
          sizeConvert:'',
          weightConvert:'',
          volumeConvert:'',
          timeConvert:'',
          ownerName:'',
          ownerCode:'',
          centralizedDistribution:false,
          batchInReturn:false,
          batchOutReturn:false,
          appointBatchOut:false,
          appointBatchDelivery:false,
          weightReturn:false,
          inventoryAbnormal:false,
          inventoryCheck:false,
          orderFlow:false,
          orderAbnormal:false,
          stockShortage:false,
          returnState:false,
          autoExamine:false,
          autoMerge:false,
          ownerId:'',
          // appkey: '', //不用
          accessToken: sessionStorage.getItem('xn_token')
        },
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理货主配置',
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
        ownerConfList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.examines = res.msgData.examines
            this.owners = res.msgData.owners
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
            if(key == 'centralizedDistribution' 
            || key == 'batchInReturn' 
            || key == 'batchOutReturn'
            || key == 'appointBatchOut'
            || key == 'appointBatchDelivery'
            || key == 'weightReturn'
            || key == 'inventoryAbnormal'
            || key == 'inventoryCheck'
            || key == 'orderFlow'
            || key == 'orderAbnormal'
            || key == 'stockShortage'
            || key == 'returnState'
            || key == 'autoExamine'
            || key == 'autoMerge'
        ) {
            this.formData[key]=false

        }
           }
        }
        this.formIsshow = true
      },
      addForm() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            var _this = this
            if (_this.editStatus) {
                for(var key in this.formData){
                       if(key == 'centralizedDistribution' 
                        || key == 'batchInReturn' 
                        || key == 'batchOutReturn'
                        || key == 'appointBatchOut'
                        || key == 'appointBatchDelivery'
                        || key == 'weightReturn'
                        || key == 'inventoryAbnormal'
                        || key == 'inventoryCheck'
                        || key == 'orderFlow'
                        || key == 'orderAbnormal'
                        || key == 'stockShortage'
                        || key == 'returnState'
                        || key == 'autoExamine'
                        || key == 'autoMerge'
                    ) {
                      if(this.formData[key] == false) this.formData[key] = '否'
                      if(this.formData[key] == true) this.formData[key] = '是'
                    } 
                }
              editOwnerconfig(_this.formData).then(res => {
                if(res){
                  _this.formIsshow = false
                  _this.$modal.notifySuccess(res.errMsg)
                  _this.loadData()
                }
              })
            } else {
                for(var key in this.formData){
                    if(key == 'centralizedDistribution' 
                        || key == 'batchInReturn' 
                        || key == 'batchOutReturn'
                        || key == 'appointBatchOut'
                        || key == 'appointBatchDelivery'
                        || key == 'weightReturn'
                        || key == 'inventoryAbnormal'
                        || key == 'inventoryCheck'
                        || key == 'orderFlow'
                        || key == 'orderAbnormal'
                        || key == 'stockShortage'
                        || key == 'returnState'
                        || key == 'autoExamine'
                        || key == 'autoMerge'
                    ) {
                      if(this.formData[key] == false) this.formData[key] = '否'
                      if(this.formData[key] == true) this.formData[key] = '是'
                    } 
                }
                this.owners.forEach(item => {
                    if( item.ownerCode == this.formData.ownerCode ) {
                        this.formData.ownerName = item.ownerName
                        this.formData.ownerId = item.id
                    }
                });
                addOwnerconfig(_this.formData).then(res => {
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
                if(key == 'centralizedDistribution' 
                || key == 'batchInReturn' 
                || key == 'batchOutReturn'
                || key == 'appointBatchOut'
                || key == 'appointBatchDelivery'
                || key == 'weightReturn'
                || key == 'inventoryAbnormal'
                || key == 'inventoryCheck'
                || key == 'orderFlow'
                || key == 'orderAbnormal'
                || key == 'stockShortage'
                || key == 'returnState'
                || key == 'autoExamine'
                || key == 'autoMerge'
            ) {
                 if(this.formData[key] == '否') this.formData[key] = false
                 if(this.formData[key] == '是') this.formData[key] = true
            }
            }
        }
        this.editStatus = true
        this.formIsshow = true
      },
    }
  }
  </script>
  <style lang="scss" scoped>

  .switch-chunk {
    width: 100%;
    display: flex;
    align-items:center;
    flex-wrap: wrap;
    
  }
  ::v-deep .el-form-item__label {
        width: 140px;
    }
</style>
  