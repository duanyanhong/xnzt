<template>
  <div class="good-detail">
    <el-table
      :data="tableData"
      border
      height="90%"
      :row-height="10"
      style="width: 100%;overflow: auto;">
      <el-table-column :show-overflow-tooltip="true" prop="orderLineNo" label="单据行号"/>
      <el-table-column :show-overflow-tooltip="true" prop="itemCode" label="商品编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="barCode" label="商品条码"/>
      <el-table-column :show-overflow-tooltip="true" prop="itemName" label="商品名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="planQty" label="应发数量"/>
      <el-table-column :show-overflow-tooltip="true" prop="brandName" label="商品品牌"/>
      <el-table-column :show-overflow-tooltip="true" prop="specsName" label="商品规格"/>
      <el-table-column :show-overflow-tooltip="true" prop="grossWeight" label="商品毛重"/>
      <el-table-column :show-overflow-tooltip="true" prop="netWeight" label="商品净重"/>
      <el-table-column :show-overflow-tooltip="true" prop="retailPrice" label="零售价"/>
      <el-table-column :show-overflow-tooltip="true" prop="actualPrice" width="100" label="实际成交价"/>
      <el-table-column :show-overflow-tooltip="true" prop="discountAmount"  width="140"  label="单件商品折扣金额"/>
      <el-table-column :show-overflow-tooltip="true" prop="itemId" width="140"  label="仓储系统商品编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="extCode" width="120"  label="平台商品编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="sourceOrderCode"  width="100"  label="平台订单号"/>
      <el-table-column :show-overflow-tooltip="true" prop="subSourceOrderCode"  width="100"  label="平台子订单号"/>
      <el-table-column :show-overflow-tooltip="true" prop="inventoryType" label="库存类型"/>
      <el-table-column :show-overflow-tooltip="true" prop="batchCode" label="批次编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
      <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="过期日期"/>
      <el-table-column :show-overflow-tooltip="true" prop="marks" label="商品标记"/>
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
<style >
 .good-detail {}

  .good-detail .el-table--small .el-table__cell {
    padding: 1px 0;
  }
  .good-detail .el-table .el-table__header-wrapper th, .el-table .el-table__fixed-header-wrapper th{
    height: 15px;
  }
</style>
