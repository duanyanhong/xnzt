<template>
  <div>
    <div slot="footer" class="footer" v-hasPermi="['Order:SaleOrder:Savedesc']" >
        <el-button type="primary"  v-debounce="addForm" >保存备注信息</el-button>
    </div>
    <el-form ref="formData" class="contanier"  :inline="true" :model="formData"  size="mini" label-width="120px">
      <div class="others">
        <el-form-item label="买家备注" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.buyerMessage"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.buyerMessage"
                    disabled="disabled"
                    suffix-icon="el-icon-thumb"
                    style="width: 400px;" 
                  ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="客服备注" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.serviceDesc"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.serviceDesc"
                    suffix-icon="el-icon-thumb"
                    style="width: 400px;" 
                  ></el-input>
          </el-tooltip>
        </el-form-item>
      </div>
      <div class="others">
        <el-form-item label="卖家备注" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.sellerMessage"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.sellerMessage"
                    suffix-icon="el-icon-thumb"
                    style="width: 400px;" 
                  ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="内部备注" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.remark"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.remark"
                    suffix-icon="el-icon-thumb"
                    style="width: 400px;" 
                  ></el-input>
          </el-tooltip>
        </el-form-item>
      </div>
      
    </el-form>
  </div>
</template>

<script>
import { updateDesc} from "@/api/order/saleorder";

  export default {
    props: {
      detailInfo: {
        type: Object
      },
      selectOrderId:{
        type:Number
      },
      loadData: {
        type: Function,
        default: null
      },
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
      addForm() {
        if(this.selectOrderId<1){
          return;
        }
        console.log(this.formData)
        updateDesc({
          id:this.selectOrderId,
          sellerMessage:this.formData.sellerMessage,
          serviceDesc:this.formData.serviceDesc,
          remark:this.formData.remark,
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
}
  .order-class-item{
    width: 24%;
    height: 16px;
    margin: 15px 0;
  }
  .others {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .one_ {
        flex: 0 0 45%;
        display: flex;
        align-items: center;
      }
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
    width:400px;
  }
  .contanier {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
  }
  ::v-deep .el-input .el-input__inner {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
