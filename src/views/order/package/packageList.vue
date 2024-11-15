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
              v-model="searchData.markName"
              clearable
              size="small"
              placeholder="输入标记内容搜索"
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
              type="warning"
              icon="el-icon-download"
              @click="downMyOrder"
              plain
              v-hasPermi="['Order:Package:Export']"
            >
              导出
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
          :header-cell-style="{background:'#f8f8f9', color:'#515a6e', fontSize:'13px',height:'45px',border:'none'}"
          :cell-style="{border:'none'}"
        >
          <u-table-column :show-overflow-tooltip="true" prop="deliveryOrderCode" label="出库单号" />
          <u-table-column :show-overflow-tooltip="true" prop="deliveryOrderId" label="仓储系统出库单号" width="130" />
          <u-table-column :show-overflow-tooltip="true" prop="orderType" label="出库单类型" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="warehouseCode" label="仓库编码" />
          <u-table-column :show-overflow-tooltip="true" prop="itemCode" label="货主" />
          <u-table-column :show-overflow-tooltip="true" prop="itemName" label="商品名称" />
          <u-table-column :show-overflow-tooltip="true" prop="ownerName" label="商品编码" />
          <u-table-column :show-overflow-tooltip="true" prop="barCode" label="商品条码" />
          <u-table-column :show-overflow-tooltip="true" prop="actualQty" label="商品数量" />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsCode" label="物流公司编码" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsName" label="物流公司名称" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="expressCode" label="配运单号" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="routeState" label="路由状态" />
          <u-table-column :show-overflow-tooltip="true" prop="bindState" label="是否绑定" />
          <u-table-column :show-overflow-tooltip="true" prop="acceptTime" label="同步时间" width="130" />
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
  </div>
</template>

<script>
  import { getPackageList,exportPackage } from "@/api/order/package";
  export default {
    name: 'Package',
    data() {
      return {
        searchData: {
          limit: 20,
          page: 1,
          accessToken:sessionStorage.getItem('xn_token')
        },
        pageSizes: [20, 50, 100],
        dataList: [],
        total: 0,
        loading: false,
        jsHeight: 500
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
        getPackageList(this.searchData).then(res => {
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
      downMyOrder() {
        this.loading = true
        exportPackage(this.searchData).then(res => {
          this.loading = false
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            if (res.msgData.downloadUrl !== undefined && res.msgData.downloadUrl !== '') {
              window.location.href = res.msgData.downloadUrl
            }
            this.loadData()
          }
        })
      }
    }
  }
</script>

