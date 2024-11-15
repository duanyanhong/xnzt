<template>
  <div>
    <el-form ref="formData" class="contanier" :inline="true" :model="formData"  size="mini" label-width="120px">
      <div class="single-chunk">
          <el-form-item label="收件人" class="one_">
          <el-input disabled v-model="formData.receiverName"  />
        </el-form-item>
        <el-form-item label="手机" class="one_">
          <el-input disabled v-model="formData.receiverMobile" />
        </el-form-item>
        <el-form-item label="电话" class="one_">
          <el-input disabled v-model="formData.receiverPhone"  />
        </el-form-item>
        <el-form-item label="安全手机号" class="one_">
          <el-input disabled v-model="formData.receiverSecurityMobile"  />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="省市区" class="one_">
        <el-input disabled v-model="address"  />
        <!-- <span class="address-item" >{{formData.receiverProvince}} {{formData.receiverCity?'/'+formData.receiverCity:''}} {{formData.receiverArea ? '/'+formData.receiverArea:''}}</span> -->
        </el-form-item>
        <el-form-item label="街道" class="one_">
          <el-input disabled v-model="formData.receiverTown"  />
        </el-form-item>
        <!-- <el-form-item label="地址" class="order-class-item">
          <el-input disabled v-model="formData.receiverAddress"  />
        </el-form-item> -->
        <el-form-item label="所在经度" class="one_">
          <el-input disabled v-model="formData.lon"  />

        </el-form-item>
      <el-form-item label="所在纬度" class="one_">
        <el-input disabled v-model="formData.lat"  />
      </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="收件人地址" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.receiverAddress"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.receiverAddress"
                    disabled="disabled"
                    suffix-icon="el-icon-thumb"
                  ></el-input>
          </el-tooltip>
        </el-form-item>
      </div>
 
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
        formData: this.detailInfo,
        address: this.detailInfo.receiverProvince + (this.detailInfo.receiverCity?'/'+this.detailInfo.receiverCity:'') + (this.detailInfo.receiverArea ? '/'+this.detailInfo.receiverArea:'')
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.formData = val
          this.address =val.receiverProvince + (val.receiverCity?'/'+val.receiverCity:'') + (val.receiverArea ? '/'+val.receiverArea:'')
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
.footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  margin-bottom: 10px;
}
.contanier {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .single-chunk {
      width: 100%;
      display: flex;
      align-items: center;
      // flex-wrap: wrap;

      .one_ {
        flex: 0 0 22%;
        display: flex;
        align-items: center;
      }
    }
    
  }
  .order-class-item{
    width: 24%;
    height: 16px;
  }

  .address-item{
    border: 1px solid #E4E7ED;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    background-color: #F5F7FA;
    color: #C0C4CC;
    cursor: not-allowed;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
    width: 494px;
  }
  ::v-deep .el-form-item__content {
    width: 178px;
  }
  ::v-deep .el-input__inner {
    width: 178px;
  }
  ::v-deep .el-input .el-input__inner {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
  
</style>
