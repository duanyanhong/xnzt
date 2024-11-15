<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px">
      <el-form-item label="商品金额(元)" class="order-class-item">
        <el-input disabled v-model="formData.itemAmount"  />
      </el-form-item>
      <el-form-item label="订单金额(元)" class="order-class-item">
        <el-input disabled v-model="formData.totalAmount"  />
      </el-form-item>
      <el-form-item label="实付金额(元)" class="order-class-item">
        <el-input disabled v-model="formData.arAmount" />
      </el-form-item>
      <el-form-item label="总行数" class="order-class-item">
        <el-input disabled v-model="formData.totalLine" />
      </el-form-item>
      <el-form-item label="总数量" class="order-class-item">
        <el-input disabled v-model="formData.totalQty" />
      </el-form-item>
      <el-form-item label="总重量(KG)" class="order-class-item">
        <el-input disabled v-model="formData.totalWeight"  />
      </el-form-item>
      <el-form-item label="总体积(CM³)" class="order-class-item">
        <el-input disabled v-model="formData.totalVolume"  />
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
