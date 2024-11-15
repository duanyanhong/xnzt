<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px">
      <el-form-item label="预约配送时间" class="order-class-item">
        <el-input disabled v-model="formData.appointDeliveryTime"  />
      </el-form-item>
      <el-form-item label="预计送达时间" class="order-class-item">
        <el-input disabled v-model="formData.appointArrivedTime"  />
      </el-form-item>
      <el-form-item label="预计到货日期" class="order-class-item">
        <el-input disabled v-model="formData.esDate"  />
      </el-form-item>
      <el-form-item label="应发货时间" class="order-class-item">
        <el-input disabled v-model="formData.deliveryTime"  />
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
<style scoped lang="scss">
 .order-class-item{
    width: 24%;
    height: 16px;
    margin: 15px 0;
  }
  ::v-deep .el-input--mini {
    font-size: 14px;
  }
</style>
