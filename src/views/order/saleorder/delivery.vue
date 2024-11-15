<template>
  <div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="140px" class="contanier">
      <div class="single-chunk">
        <el-form-item label="时效要求" class="one_">
          <!-- <el-input disabled v-model="formData.scheduleType"  /> -->
          <!-- （1=工作日，2=节假日，101=当日达，102=次晨达，103=次日达， 104=预约达） -->
          <span class="address-item">{{formData.scheduleType==1?'工作日':formData.scheduleType==2?'节假日':formData.scheduleType==101?'当日达':formData.scheduleType==102?'次晨达':formData.scheduleType==103?'次日达':formData.scheduleType==104?'预约达':''  }}</span>
        </el-form-item>
        <el-form-item label="要求送达日期" class="one_">
          <el-input disabled v-model="formData.scheduleDay"  />
        </el-form-item>
        <el-form-item label="预约配送时间" class="one_">
          <el-input disabled v-model="formData.scheduleStartTime"  />
        </el-form-item>
        <el-form-item label="预计送达时间" class="one_">
          <el-input disabled v-model="formData.scheduleEndTime"  />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="发货服务类型" class="one_">
        <!-- <el-input disabled v-model="formData.deliveryType"  /> -->
        <!-- （PTPS=普通配送，LLPS=冷链配送，HBP=环保配） -->
         <span class="address-item">{{formData.deliveryType=='PTPS'?'普通配送':formData.deliveryType=='LLPS'?'冷链配送':formData.deliveryType=='HBP'?'环保配':''  }}</span>
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
.contanier {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .single-chunk {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .one_ {
        flex: 0 0 22%;
        display: flex;
        align-items: center;
      }
    }
    
  }
  .others {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;


    
    .temp {
      flex: 1;
    }
  }
 .order-class-item{
    width: 24%;
    height: 16px;
    margin: 15px 0;
  }
  ::v-deep .el-input--mini {
    font-size: 13px;
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
    width: 200px;
  }
  ::v-deep .el-form-item__content {
    font-size: 12px;
  }
</style>
