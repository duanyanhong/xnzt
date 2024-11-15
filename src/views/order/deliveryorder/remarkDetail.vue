<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px">
      <el-form-item label="买家备注" class="order-class-item">
        <el-input disabled v-model="formData.buyerMessage"style="width: 500px;"  />
      </el-form-item>
      <el-form-item label="卖家备注" class="order-class-item">
        <el-input disabled v-model="formData.sellerMessage" style="width: 500px;"  />
      </el-form-item>
      <el-form-item label="客服备注" class="order-class-item">
        <el-input disabled v-model="formData.serviceDesc" style="width: 500px;" />
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
    width: 90%;
    height: 16px;
  }
</style>
