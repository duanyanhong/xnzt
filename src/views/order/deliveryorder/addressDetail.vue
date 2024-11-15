<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px">
      <el-form-item label="收货人" class="order-class-item">
        <el-input disabled v-model="formData.receiverName" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="手机" class="order-class-item">
        <el-input disabled v-model="formData.receiverMobile" style="width: 300px;"  />
      </el-form-item>
      <el-form-item label="电话" class="order-class-item">
        <el-input disabled v-model="formData.receiverTel" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="省市区" class="order-class-item">
        <span class="address-item" >{{formData.receiverProvince}} / {{formData.receiverCity}} / {{formData.receiverArea}}</span>
      </el-form-item>
      <el-form-item label="街道" class="order-class-item">
        <el-input disabled v-model="formData.receiverTown" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="系统区域" class="order-class-item">
        <span class="address-item">{{formData.scopeProvince}} {{formData.scopeCity}} {{formData.scopeArea}}</span>
      </el-form-item>
      <el-form-item label="地址" class="order-class-item">
        <el-input disabled v-model="formData.receiverAddress" style="width: 300px;"  />
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
    width: 32%;
    height: 16px;
  }
  .address-item{
    border: 1px solid #E4E7ED;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    background-color: #F5F7FA;
    color: #C0C4CC;
    cursor: not-allowed;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    width: 300px;
  }
</style>
