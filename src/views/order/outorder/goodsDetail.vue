<template>
  <div class="good-detail">
    <el-table
      :data="tableData"
      border
      height="100%"
      :row-height="10"
      style="width: 100%;overflow-y: auto;">
      <el-table-column :show-overflow-tooltip="true" prop="scItemId" label="商品编码"/>
      <el-table-column :show-overflow-tooltip="true" prop="barCode" label="商品条码"/>
      <el-table-column :show-overflow-tooltip="true" prop="scItemName" label="商品名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="quantity"  label="请求数量"/>
      <el-table-column :show-overflow-tooltip="true" prop="abnormalDesc" label="异常标记"/>
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
