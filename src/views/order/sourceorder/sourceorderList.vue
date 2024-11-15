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
              type="primary"
              icon="el-icon-finished"
              @click="downMyOrder"
              plain
              v-hasPermi="['Order:SourceOrder:Tosale']"
            >
              审核
            </el-button>
          </span>
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
              v-hasPermi="['Order:SourceOrder:Export']"
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
          @selection-change="handleSelectionChange"
        >
          <u-table-column type="selection"  width="55"  />
          <u-table-column :show-overflow-tooltip="true" prop="snCode" label="发货单号" />
          <u-table-column :show-overflow-tooltip="true" prop="soCode" label="销售单号" />
          <u-table-column :show-overflow-tooltip="true" prop="platformOrderCode" width="120" label="网店订单号" />
          <u-table-column :show-overflow-tooltip="true" prop="deliveryOrderCode" label="来源订单号" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="deliveryOrderCode" label="ERP出库单号" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="deliveryOrderCode" label="WMS出库单号" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="orderType" label="出库单类型" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="warehouseCode" label="仓库编码" />
          <u-table-column :show-overflow-tooltip="true" prop="orderFlag" label="订单标记" />
          <u-table-column :show-overflow-tooltip="true" prop="sourcePlatformCode" label="来源平台编码" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="sourcePlatformName" label="来源平台名称" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="createTime" label="发货单创建时间" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="placeOrderTime" width="130"  label="前台订单创建时间" />
          <u-table-column :show-overflow-tooltip="true" prop="payTime" label="支付时间" width="130" />
          <u-table-column :show-overflow-tooltip="true" prop="payNo" width="130" label="支付平台交易号" />
          <u-table-column :show-overflow-tooltip="true" prop="serviceCode" label="服务编码" />
          <u-table-column :show-overflow-tooltip="true" prop="shopNick" label="店铺名称(上位)" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="sellerNick"  label="卖家昵称" />
          <u-table-column :show-overflow-tooltip="true" prop="buyerNick" label="买家昵称" />
          <u-table-column :show-overflow-tooltip="true" prop="totalAmount" width="120" label="订单总金额 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="itemAmount" width="120" label="商品总金额 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="discountAmount" width="130" label="订单折扣金额 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="arAmount" width="120" label="应收金额 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="gotAmount" width="120" label="已收金额 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="freight" width="120" label="快递费用 (元)" />
          <u-table-column :show-overflow-tooltip="true" prop="serviceFee" label="COD 服务费" width="130"  />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsCode" label="物流公司编码" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsName" label="物流公司名称" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="expressCode" label="配运单号" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="logisticsAreaCode"  label="快递区域编码" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="isUrgency" label="是否紧急" />
          <u-table-column :show-overflow-tooltip="true" prop="invoiceFlag" label="是否需要发票" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="insuranceFlag" label="是否需要保险" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="buyerMessage" label="买家留言" />
          <u-table-column :show-overflow-tooltip="true" prop="sellerMessage" label="卖家留言" />
          <u-table-column :show-overflow-tooltip="true" prop="serviceDesc" label="客服备注" />
          <u-table-column :show-overflow-tooltip="true" prop="remark" label="备注" />
          <u-table-column :show-overflow-tooltip="true" prop="acceptTime" label="销售订单创建时间" width="130" />
          <u-table-column :show-overflow-tooltip="true" prop="orderState" label="订单审核状态" width="120" />
          <u-table-column :show-overflow-tooltip="true" prop="examineTime" label="审核时间" />
          <u-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间" />
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
        <el-form-item label="标记内容" prop="markName">
          <el-input v-model="formData.markName" style="width: 250px" placeholder="请输入标记内容" />
        </el-form-item>
        <el-form-item label="标记颜色" prop="markColor">
          <el-color-picker v-model="formData.markColor" style="width: 250px"></el-color-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="formIsshow=false">取消</el-button>
        <el-button type="primary" v-debounce="loadData" >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getSourceorderList,toSourceorder,exportSourceorder } from "@/api/order/sourceorder";
  export default {
    name: 'Sourceorder',
    data() {
      return {
        rules: {
          markName: [
            { required: true, message: '请输入标记内容', trigger: 'blur' }
          ],
          markColor: [
            { required: true, message: '请选择标记颜色', trigger: 'change' }
          ]
        },
        searchData: {
          markName: '',
          markColor: '#409EFF',
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
          markName: '',
          markColor: '',
          accessToken: sessionStorage.getItem('xn_token')
        },
        ids: [],
        jsHeight: 500,
        editStatus: false,
        titleContent: '管理商品标记'
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
        getSourceorderList(this.searchData).then(res => {
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
      // 勾选数据
      handleSelectionChange(value) {
        this.ids = []
        for (let k = 0; k < value.length; k++) {
          this.ids.push(value[k])
        }
      },
      downMyOrder() {
        this.loading = true
        exportSourceorder(this.searchData).then(res => {
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

