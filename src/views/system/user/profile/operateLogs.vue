<template>
  <div class="operate-log">
    <el-table
      :data="tableData"
      border
      tooltip-effect="dark myTooltips"
      :row-height="10"
      height="100%"
      style="width: 100%;overflow-y: auto;">
      <el-table-column :show-overflow-tooltip="true" prop="moduleName" label="业务类型"/>
      <el-table-column :show-overflow-tooltip="true" prop="actionName" label="业务操作"/>
      <el-table-column :show-overflow-tooltip="true" prop="itemName"  label="执行单元"/>
      <el-table-column :show-overflow-tooltip="true" prop="opContent" label="操作报文"/>
      <el-table-column :show-overflow-tooltip="true" prop="opTime"  label="操作时间"/>
      <el-table-column :show-overflow-tooltip="true" prop="opResult"  label="是否成功"/>
      <el-table-column :show-overflow-tooltip="true" prop="failCause"  label="失败原因"/>
    </el-table>
  </div>
</template>

<script>
import {personLog } from "@/api/system/user";

  export default {
   
    data() {
      return {
        tableData: [],
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
      this.getLogs()
    },
    methods: {
      getLogs() {
        personLog({accessToken: sessionStorage.getItem('xn_token')}).then(response => {
          this.tableData = response.msgData.list.items;
        });
    }
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
