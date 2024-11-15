<template>
  <div class="good-detail">
    <el-table
      :data="tableData"
      border
      height="162"
      :row-height="10"
      style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="itemCode" label="SKU编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="barCode" label="SKU条码"/>
      <el-table-column :show-overflow-tooltip="true" prop="itemName" label="SKU名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="platformOrderCode" width="100" label="网店订单号"/>
      <el-table-column :show-overflow-tooltip="true" prop="sourceOrderCode" width="100" label="平台订单"/>
      <el-table-column :show-overflow-tooltip="true" prop="planQty" label="应发数量"/>
      <el-table-column :show-overflow-tooltip="true" prop="retailPrice" label="零售价"/>
      <el-table-column :show-overflow-tooltip="true" prop="actualPrice" label="成交价"/>
      <el-table-column :show-overflow-tooltip="true" prop="discountAmount" label="折扣金额"/>
      <el-table-column :show-overflow-tooltip="true" prop="grossWeight" label="毛重"/>
      <el-table-column :show-overflow-tooltip="true" prop="netWeight" label="净重"/>
      <el-table-column :show-overflow-tooltip="true" prop="volume" label="体积"/>
      <el-table-column :show-overflow-tooltip="true" prop="batchCode" label="批次编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
      <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="过期日期"/>
      <el-table-column :show-overflow-tooltip="true" prop="ownerName" label="货主"/>
      <el-table-column :show-overflow-tooltip="true" prop="shopName" label="店铺"/>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      detailInfo: {
        type: Array
      }
    },
    data() {
      return {
        tableData: this.detailInfo
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.tableData = val
        }
      }
    },
    activated(){
    },
    mounted() {
    },
    methods: {

    }
  }
</script>
<style>
  .good-detail .el-table--small .el-table__cell {
    padding: 1px 0;
  }
  .good-detail .el-table .el-table__header-wrapper th, .el-table .el-table__fixed-header-wrapper th{
    height: 15px;
  }
</style>
