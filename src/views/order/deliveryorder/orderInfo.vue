<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px">
      <el-form-item label="销售订单" class="order-class-item">
        <el-input disabled v-model="formData.soCode"  />
      </el-form-item>
      <el-form-item label="销售出库订单" class="order-class-item">
        <el-input disabled v-model="formData.shCode"  />
      </el-form-item>
      <el-form-item label="货主" class="order-class-item">
        <el-input disabled v-model="formData.ownerName"  />
      </el-form-item>
      <el-form-item label="店铺" class="order-class-item">
        <el-input disabled v-model="formData.shopName" />
      </el-form-item>
      <el-form-item label="仓库" class="order-class-item">
        <el-input disabled v-model="formData.warehouseName"  />
      </el-form-item>
      <el-form-item label="逻辑仓库" class="order-class-item">
        <el-input disabled v-model="formData.logicwarehouseName"  />
      </el-form-item>
      <el-form-item label="审核状态" class="order-class-item">
        <el-input disabled v-model="formData.orderState"  />
      </el-form-item>
      <el-form-item label="来源订单" class="order-class-item">
        <el-input disabled v-model="formData.deliveryOrderCode"  />
      </el-form-item>
      <el-form-item label="来源平台" class="order-class-item">
        <el-input disabled v-model="formData.sourcePlatformName"  />
      </el-form-item>
      <el-form-item label="下单时间" class="order-class-item">
        <el-input disabled v-model="formData.placeOrderTime"  />
      </el-form-item>
      <el-form-item label="付款时间" class="order-class-item">
        <el-input disabled v-model="formData.payTime"  />
      </el-form-item>
      <el-form-item label="承运商" class="order-class-item">
        <el-input disabled v-model="formData.logisticsName"  />
      </el-form-item>
      <el-form-item label="配送类型" class="order-class-item">
        <el-input disabled v-model="formData.deliveryType"  />
      </el-form-item>
      <el-form-item label="出库单" class="order-class-item">
        <el-input disabled v-model="formData.shCode"  />
      </el-form-item>
      <el-form-item label="主运单号" class="order-class-item">
        <el-input disabled v-model="formData.vestNo"  />
      </el-form-item>
      <el-form-item label="配运单号" class="order-class-item">
        <el-input disabled v-model="formData.expressCode"  />
      </el-form-item>
      <el-form-item label="作废原因" class="order-class-item">
        <el-input disabled v-model="formData.voidCause"  />
      </el-form-item>
      <el-form-item label="是否需要解密" class="order-class-item">
        <el-input disabled v-model="formData.decrypto"  />
      </el-form-item>
      <el-form-item label="是否需要马甲" class="order-class-item">
        <el-input disabled v-model="formData.vest"  />
      </el-form-item>
      <el-form-item label="是否门店配送" class="order-class-item">
        <el-input disabled v-model="formData.unsalableTime"  />
      </el-form-item>
      <el-form-item label="网店订单号" class="order-class-item">
        <el-input disabled v-model="formData.platformOrderCode"  />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
      return {
        formData: this.detailInfo
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.formData = val
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
<style scoped>
  .order-class-item{
    width: 24%;
    height: 16px;
  }
</style>
