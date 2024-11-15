<template>
  <div class="operate-log">
    <el-table
      :data="tableData"
      border
      tooltip-effect="dark myTooltips"
      :row-height="10"
      height="162"
      style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="moduleName" label="业务类型"/>
      <el-table-column :show-overflow-tooltip="true" prop="operateItem" label="业务操作"/>
      <el-table-column :show-overflow-tooltip="true" prop="operateContent" label="操作报文"/>
      <el-table-column :show-overflow-tooltip="true" prop="operateUserAccount" label="操作用户"/>
      <el-table-column :show-overflow-tooltip="true" prop="operateTime"  label="操作时间"/>
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
        tableData: []
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
  .operate-log .el-table--small .el-table__cell {
    padding: 1px 0;
  }
  .operate-log .el-table .el-table__header-wrapper th, .el-table .el-table__fixed-header-wrapper th{
    height: 15px;
  }
  .myTooltips{
    width: 50%;
  }
</style>
