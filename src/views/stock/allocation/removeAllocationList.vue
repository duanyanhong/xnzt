<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div>
            <!-- 搜索 -->
            <date-range-picker v-model="searchData.createTime" :clearable="false" style="width: 350px !important;margin-right: 10px;" class="date-item" />
            <div class="filter-item my-select">
              <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择货主"  v-model="searchData.ownerId" :filterable=false :isfilte=true :fiftervalue="searchData.ownerId" bindId="ownerId" bindName="ownerName" :fifteroptions="owners" ></SelectToolbar>
            </div>
            <div  class="filter-item">
              <el-input
                v-model="searchData.allocationOrderCode"
                size="small"
                placeholder="输入调拨单单号"
                style="width: 180px;"
                clearable
              >
               <i  class="el-icon-edit el-input__icon"  slot="suffix"  @click="searchShow('allocationOrderCode','输入调拨单单号')"></i>
                <!-- <el-button slot="suffix" type="text" @click="searchShow('allocationOrderCode','输入调拨单单号')"><svg-icon icon-class="plus" style="background:#fff;vertical-align: 0;" /></el-button> -->
              </el-input>
            </div>
            <div  class="filter-item my-select">
              <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择原逻辑仓库"  v-model="searchData.fromLogicwarehouseId" :filterable=false :isfilte=true :fiftervalue="searchData.fromLogicwarehouseId" bindId="logicwarehouseId" bindName="logicwarehouseName" :fifteroptions="logicwarehouses" ></SelectToolbar>
            </div>
            <div  class="filter-item my-select">
              <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择目标逻辑仓库"  v-model="searchData.toLogicwarehouseId" :filterable=false :isfilte=true :fiftervalue="searchData.toLogicwarehouseId" bindId="logicwarehouseId" bindName="logicwarehouseName" :fifteroptions="logicwarehouses" ></SelectToolbar>
            </div>
            <div  class="filter-item my-select">
              <el-select
                v-model="searchData.allocationType"
                style="width: 150px"
                placeholder="请选择调拨类型"
                multiple
                clearable
                collapse-tags
              >
                <el-option label="仓间调拨" value="仓间调拨"/>
                <el-option label="仓内调拨" value="仓内调拨"/>
                <el-option label="仓店调拨" value="仓店调拨"/>
              </el-select>
            </div>
            <div  class="filter-item my-select">
              <el-select
                v-model="searchData.exceptionType"
                style="width: 150px"
                placeholder="请选择异常类型"
                multiple
                clearable
                collapse-tags
              >
                <el-option label="入库异常" value="入库异常"/>
                <el-option label="审核异常" value="审核异常"/>
                <el-option label="拦截异常" value="拦截异常"/>
                <el-option label="出库异常" value="出库异常"/>
                <el-option label="同步异常" value="同步异常"/>
                <el-option label="删除异常" value="删除异常"/>
              </el-select>
            </div>
            <div  class="filter-item my-select">
              <SelectToolbar style="width: 180px;display: inline-block;" placeholder="请选择创建用户"  v-model="searchData.createUserAccount" :filterable=false :isfilte=true :fiftervalue="searchData.createUserAccount" bindId="createUserAccount" bindName="createUserName" :fifteroptions="createUsers" ></SelectToolbar>
            </div>
            <el-button class="filter-item" style="margin-bottom: 13px;" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </div>
        </div>
        <div class="crud-opts">
          <span class="crud-opts-left">
            <!--左侧插槽-->
            <slot name="left" />
            <el-button
              class="filter-item"
              size="mini"
              type="success"
              icon="el-icon-refresh-left"
              @click="restoreAllocation"
              plain
              v-hasPermi="['Stock:Allocation:Restore']"
            >
              恢复
            </el-button>
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
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column type="selection"  width="55"  />
          <u-table-column :show-overflow-tooltip="true" prop="allocationOrderCode" label="调拨订单" />
          <u-table-column :show-overflow-tooltip="true" prop="fromLogicwarehouseName" label="原逻辑仓库" />
          <u-table-column :show-overflow-tooltip="true" prop="toLogicwarehouseName" label="目标逻辑仓库" />
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主" />
          <u-table-column :show-overflow-tooltip="true" prop="orderState" label="订单状态" />
          <u-table-column :show-overflow-tooltip="true" prop="allocationType" label="调拨类型" />
          <u-table-column :show-overflow-tooltip="true" prop="exceptionType" label="异常类型" />
          <u-table-column :show-overflow-tooltip="true" prop="exceptionDesc" label="异常描述" />
          <u-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"  />
          <u-table-column :show-overflow-tooltip="true" prop="remark" label="备注"  />
          <u-table-column :show-overflow-tooltip="true" prop="removeUserAccount" label="删除账号"  />
          <u-table-column :show-overflow-tooltip="true" prop="removeTime" label="删除时间"  />
          <u-table-column
            label="操作"
            align="center"
            width="125"
          >
            <template slot-scope="scope">
              <el-button v-hasPermi="['Stock:Allocation:Preview']" size="mini" type="text" style="width: 50px;" icon="el-icon-view" @click="editStaff(scope.row)"  >详情</el-button>
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
    <InputDialog :visible.sync="searchIsshow" :search-content.sync="searchContent" :title.sync="titlesContent" @confirmed="addSearchForm" />
    <el-dialog append-to-body :close-on-click-modal="false" top="8vh" :visible.sync="formDetailIsshow"  title="调拨单明细管理" width="80%">
      <RemoveAllocationDetail :detailData="detailData" :detailInfo.sync="detailInfo"></RemoveAllocationDetail>
    </el-dialog>
  </div>
</template>

<script>
  import { removeAllocationList,getAllocationDetail,restoreAllocation } from "@/api/stock/allocationorder";
  import RemoveAllocationDetail from "./removeAllocationDetail";
  export default {
    name: 'RemoveAllocation',
    components: { RemoveAllocationDetail },
    data() {
      return {
        searchData: {
          limit: 20,
          page: 1,
          createTime: [],
          ownerId: [],
          allocationOrderCode: '',
          fromLogicwarehouseId: [],
          toLogicwarehouseId: [],
          allocationType: [],
          exceptionType: [],
          createUserAccount: [],
          accessToken:sessionStorage.getItem('xn_token')
        },
        owners: [],
        logicwarehouses: [],
        createUsers: [],
        ids: [],
        pageSizes: [20, 50, 100],
        dataList: [],
        total: 0,
        searchIsshow: false,
        searchContent: '',
        titlesContent: '',
        searchType: '',
        loading: false,
        formDetailIsshow: false,
        detailData: [],
        detailInfo: [],
        jsHeight: 500
      }
    },
    mounted() {
      this.searchData.createTime = this.$commonApi.calculateTimeRange('pastWeek')
      this.loadData()
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
        removeAllocationList(this.searchData).then(res => {
          if(res){
            this.loading = false
            this.dataList = res.msgData.list.items
            this.total = res.msgData.list.total
            this.owners = res.msgData.owners
            this.logicwarehouses = res.msgData.logicwarehouses
            this.createUsers = res.msgData.createUsers
            this.jsHeight = window.innerHeight - $('.head-container').outerHeight() - $('.crud-opts').outerHeight() - 180
          }
        })
      },
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k].id)
        }
      },
      // 搜索
      search() {
        this.page = 1
        this.loadData()
      },
      searchShow(type, title) {
        this.searchContent = this.searchData[type].replace(/,/g, '\n')
        this.searchType = type
        this.titlesContent = title
        this.searchIsshow = true
      },
      addSearchForm() {
        this.searchData[this.searchType] = this.searchContent.replace(/\n/g, ',').replace('，', ',')
        this.searchIsshow = false
      },
      editStaff(row) {
        this.detailData = row
        getAllocationDetail({id:this.detailData.id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.detailInfo = JSON.parse(JSON.stringify(res.msgData.items))
            for (let i = 0; i < this.detailInfo.length; i++) {
              var str = this.detailInfo[i].skuCode+this.detailInfo[i].skuState+this.detailInfo[i].batchNo
              this.detailInfo[i].uniqueId=btoa(unescape(encodeURIComponent(str)));
            }
            this.formDetailIsshow = true
          }
        })
      },
      restoreAllocation() {
        var _this = this
        if (this.ids.length < 1) {
          this.$message({title: '错误', message: '请选择要操作的数据', duration: 3000, type: 'error'})
          return
        }
        _this.$confirm('确定要操作选中数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          restoreAllocation({ids:this.ids,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
            if(res){
              this.$modal.notifySuccess(res.errMsg)
              this.loadData()
            }
          })
        }).catch(() => {

        })
      }
    }
  }
</script>
<style lang="scss" scoped>
 ::v-deep .head-container  div{
  display: flex;
  align-items: end;
 }
</style>
