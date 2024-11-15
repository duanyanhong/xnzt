<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="140px" class="contanier">
      <div class="single-chunk">
          <el-form-item label="商品金额(元)" class="one_">
            <el-input disabled v-model="formData.itemAmount"  />
          </el-form-item>
          <el-form-item label="订单金额(元)" class="one_">
            <el-input disabled v-model="formData.totalAmount"  />
          </el-form-item>
          <el-form-item label="折扣金额（元）" class="one_">
            <el-input disabled v-model="formData.discountAmount"  />
          </el-form-item>
          <el-form-item label="快递费用（元）" class="one_">
            <el-input disabled v-model="formData.freight"  />
          </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="应收金额（元）" class="one_">
           <el-input disabled v-model="formData.arAmount" />
        </el-form-item>
        <el-form-item label="已收金额（元）" class="one_">
          <el-input disabled v-model="formData.gotAmount" />
        </el-form-item>
        <el-form-item label="COD服务费（元）" class="one_">
          <el-input disabled v-model="formData.serviceFee" />
        </el-form-item>
        <el-form-item label="总行数" class="one_">
          <el-input disabled v-model="formData.totalLine" />
        </el-form-item>
      </div>
      <div class="single-chunk" style="margin-bottom: 50px;">
        <el-form-item label="总数量" class="one_">
           <el-input disabled v-model="formData.totalQty" />
        </el-form-item>
        <el-form-item label="总重量(KG)" class="one_">
          <el-input disabled v-model="formData.totalWeight"  />
        </el-form-item>
        <el-form-item label="总体积(CM³)" class="one_">
          <el-input disabled v-model="formData.totalVolume"  />
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
  }
  ::v-deep .el-form-item__label {
    width: 130px !important;
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
</style>
