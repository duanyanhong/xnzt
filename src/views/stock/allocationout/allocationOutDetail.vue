<template>
  <div style="height: 700px;max-height: 700px;overflow-y: auto;">
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        基础信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="出库单号">
          <el-input v-model="detailData.basics.outOrderCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="出库单状态">
          <el-input v-model="detailData.basics.outState" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="调拨订单">
          <el-input v-model="detailData.basics.allocationOrderCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="逻辑仓库">
          <el-input v-model="detailData.basics.fromLogicwarehouseName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="货主">
          <el-input v-model="detailData.basics.ownerName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="出库时间">
          <el-input v-model="detailData.basics.outTime" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="来源平台">
          <el-input v-model="detailData.basics.sourcePlatformCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="来源订单">
          <el-input v-model="detailData.basics.sourceOrderCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="detailData.basics.remark" style="width: 220px" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        发货信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="发货人">
          <el-input v-model="detailData.sender.contactName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="detailData.sender.contactMobile" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="省">
          <el-input v-model="detailData.sender.province" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="detailData.sender.city" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="区">
          <el-input v-model="detailData.sender.area" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="detailData.sender.detailAddress" style="width: 550px" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        收货信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="收货人">
          <el-input v-model="detailData.receiver.contactName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="detailData.receiver.contactMobile" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="省">
          <el-input v-model="detailData.receiver.province" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="市">
          <el-input v-model="detailData.receiver.city" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="区">
          <el-input v-model="detailData.receiver.area" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="detailData.receiver.detailAddress" style="width: 550px" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        统计信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="总行数">
          <el-input v-model="detailData.statistics.totalLine" style="width: 220px" disabled /> 
        </el-form-item>
        <el-form-item label="总数量">
          <el-input v-model="detailData.statistics.totalPlanQty" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总金额">
          <el-input v-model="detailData.statistics.totalPrice" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总体积">
          <el-input v-model="detailData.statistics.totalVolume" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总重量">
          <el-input v-model="detailData.statistics.totalWeight" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="实发数量">
          <el-input v-model="detailData.statistics.totalActualQty" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="实际体积">
          <el-input v-model="detailData.statistics.totalActualVolume" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="实际重量">
          <el-input v-model="detailData.statistics.totalActualWeight" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="商品金额">
          <el-input v-model="detailData.statistics.totalItemPrice" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="实付金额">
          <el-input v-model="detailData.statistics.totalPayPrice" style="width: 220px" disabled />
        </el-form-item>
      </el-form>
      <el-table
        :data="detailData.items"
        border
        height="300"
        :row-height="10"
        style="width: 100%;overflow-y: auto;">
        <el-table-column :show-overflow-tooltip="true" prop="skuCode" label="商品编码"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuName" label="商品名称"/>
        <el-table-column :show-overflow-tooltip="true" prop="stockUnit" label="单位"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuState" label="库存状态"/>
        <el-table-column :show-overflow-tooltip="true" prop="planQty" label="请求数量"/>
        <el-table-column :show-overflow-tooltip="true" prop="actualQty" label="实发数量"/>
        <el-table-column :show-overflow-tooltip="true" prop="lotNo" label="批号"/>
        <el-table-column :show-overflow-tooltip="true" prop="batchNo" label="批次"/>
        <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="失效日期"/>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detailData: {
        type: Object,
        required: {}
      }
    },
    activated(){
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style>
  .custom-dialog .el-dialog__header {
    background-color: #81D3F8;
  }
</style>
