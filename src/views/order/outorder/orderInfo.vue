<template>
  <div>
    <el-button size="mini" @click="editBase" v-hasPermi="['Order:Saleorder:Edit']">保存基本信息</el-button>
    <el-form ref="formData" class="contanier" :inline="true" :model="formData"  size="mini" label-width="140px">
        <div class="single-chunk">
          <el-form-item label="新鸟订单"  class="one_">
            <el-input disabled v-model="formData.xnCode"  />
          </el-form-item>
          <el-form-item label="网店订单号" class="one_">
            <el-input disabled v-model="formData.bizOrderCode"  />
          </el-form-item>
          <el-form-item label="货主" class="one_">
            <el-input disabled v-model="formData.ownerName"  />
          </el-form-item>
          <el-form-item label="店铺" class="one_">
            <el-input disabled v-model="formData.shopName" />
          </el-form-item>
        </div>
        <div class="single-chunk">
          <el-form-item label="订单状态" class="one_">
            <el-input disabled v-model="formData.orderState"  />
          </el-form-item>
          <el-form-item label="交易状态" class="one_">
            <el-input disabled v-model="formData.tradeState"  />
          </el-form-item>
          <el-form-item label="来源平台" class="one_">
            <el-input disabled v-model="formData.sourcePlatformCode" />
          </el-form-item>
          <el-form-item label="交易类型" class="one_">
            <el-input disabled v-model="formData.bizType" />
          </el-form-item>
        </div>
        <div class="single-chunk">
          <el-form-item label="下单时间" class="one_">
            <el-input disabled v-model="formData.placeOrderTime" />
          </el-form-item>
          <el-form-item label="付款时间" class="one_">
            <el-input disabled v-model="formData.payTime" />
          </el-form-item>
          <el-form-item label="发货创单时间" class="one_">
            <el-input disabled v-model="formData.orderCreateTime" />
          </el-form-item>
          <el-form-item label="创建时间" class="one_">
            <el-input disabled v-model="formData.acceptTime" />
          </el-form-item>
        </div>
        <div class="single-chunk">
          <el-form-item label="审核时间" class="one_">
            <el-input disabled v-model="formData.toSaleTime" />
          </el-form-item>
          <el-form-item label="买家留言" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.buyerMessage"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.buyerMessage"
                    disabled="disabled"
                    suffix-icon="el-icon-thumb"
                  ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="异常标记" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.abnormalDesc"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.abnormalDesc"
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
  import { getLogicwarehouse,editBase } from "@/api/order/saleorder";
  export default {
    props: {
      detailInfo: {
        type: Object
      },
      logicwarehouses:{
        type:Array
      },
      logistics:{
        type:Array
      },
      warehouses:{
        type:Array
      },
      selectOrderId:{
        type:Number
      },
      loadData: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        formData: this.detailInfo,
        logicwarehousesArr: this.logicwarehouses
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.formData = val
        }
      },
      logicwarehouses:{
        handler(val){
          this.logicwarehousesArr = val
        }
      }
    },
    activated(){
    },
    mounted() {
    },
    methods: {
      getLogicwarehouse(){
        getLogicwarehouse({warehouseId:[ this.formData.warehouseId],accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.formData.logicwarehouseId = ''
            this.logicwarehousesArr=res.msgData.logicwarehouses
          }
        })
      },
      editBase(){
        if(this.selectOrderId<1){
          return;
        }
        editBase({
          saleorderId:this.selectOrderId,
          warehouseId:this.formData.warehouseId,
          logisticsCode:this.formData.logisticsCode,
          logicwarehouseId:this.formData.logicwarehouseId,
          accessToken: sessionStorage.getItem('xn_token')
        }).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      }
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
