<template>
  <div style="height: 700px;max-height: 700px;overflow-y: auto;">
    <div>
      <div style="font-weight: bold;font-size: 15pt;height: 40px;line-height: 40px;">
        基础信息
      </div>
      <div style="border-bottom: 1px solid #ccc;margin-bottom: 10px;"></div>
      <el-form ref="formData" :inline="true"  size="small" label-width="100px">
        <el-form-item label="调拨订单">
          <el-input v-model="detailData.allocationOrderCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="调拨类型">
          <el-input v-model="detailData.allocationType" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="detailData.orderState" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="来源平台">
          <el-input v-model="detailData.sourcePlatformCode" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="货主">
          <el-input v-model="detailData.ownerName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="原逻辑仓库">
          <el-input v-model="detailData.fromLogicwarehouseName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="目标逻辑仓库">
          <el-input v-model="detailData.toLogicwarehouseName" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="异常类型">
          <el-input v-model="detailData.exceptionType" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="异常描述">
          <el-input v-model="detailData.exceptionDesc" style="width: 220px" disabled />
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
          <el-input v-model="total.count" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总数量">
          <el-input v-model="total.sum" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总重量">
          <el-input v-model="total.weight" style="width: 220px" disabled />
        </el-form-item>
        <el-form-item label="总体积">
          <el-input v-model="total.volume" style="width: 220px" disabled />
        </el-form-item>
      </el-form>
      <el-table
        :data="detailInfo"
        border
        height="390"
        :row-height="10"
        style="width: 100%;overflow-y: auto;">
        <el-table-column :show-overflow-tooltip="true" prop="skuCode"  label="商品编码"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuName"  label="商品名称"/>
        <el-table-column :show-overflow-tooltip="true" prop="skuState" label="库存状态"/>
        <el-table-column :show-overflow-tooltip="true" prop="planQty" label="请求数量"/>
        <el-table-column :show-overflow-tooltip="true" prop="stockUnit" label="单位"/>
        <el-table-column :show-overflow-tooltip="true" prop="totalWeight" label="总重量"/>
        <el-table-column :show-overflow-tooltip="true" prop="totalVolume" label="总体积"/>
        <el-table-column :show-overflow-tooltip="true" prop="lotNo" label="批号"/>
        <el-table-column :show-overflow-tooltip="true" prop="batchNo" label="批次"/>
        <el-table-column :show-overflow-tooltip="true" prop="productDate" label="生产日期"/>
        <el-table-column :show-overflow-tooltip="true" prop="expireDate" label="失效日期"/>
        <el-table-column :show-overflow-tooltip="true" prop="shelfLife" label="保质期"/>
        <el-table-column :show-overflow-tooltip="true" prop="shelfLifeUnit" label="保质期单位"/>
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
      },
      detailInfo: {
        type: Array
      }
    },
    data() {
      return {
        total:{
          count:'',
          sum:'',
          weight:'',
          volume:''
        }
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.getTotal()
        }
      }
    },
    activated(){
    },
    mounted() {
      this.getTotal()
    },
    methods: {
      getTotal(){
        this.total.count = this.detailInfo.length
        this.total.sum = 0
        this.total.weight = 0
        this.total.volume = 0
        for (let k = 0; k < this.detailInfo.length; k++) {
          this.total.sum=this.total.sum+this.detailInfo[k].planQty
          this.total.weight=this.total.weight+this.detailInfo[k].totalWeight
          this.total.volume=this.total.volume+this.detailInfo[k].totalVolume
        }
        this.total.weight = this.total.weight.toFixed(2)
        this.total.volume = this.total.volume.toFixed(2)
      }
    }
  }
</script>
<style>
  .custom-dialog .el-dialog__header {
    background-color: #81D3F8;
  }
</style>
