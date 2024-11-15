<template>
  <div>
    <div slot="footer" class="footer"  v-hasPermi="['Order:SaleOrder:Savebase']" >
      <el-button size="mini" @click="editBase" type="primary">保存基本信息</el-button>
    </div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="140px" class="contanier">
      <div class="single-chunk">
        <el-form-item label="销售订单" class="one_">
          <el-input disabled v-model="formData.soCode"  />
        </el-form-item>
        <el-form-item label="新鸟订单" class="one_">
          <el-input disabled v-model="formData.xnCode"  />
        </el-form-item>
        <el-form-item label="订单状态" class="one_">
          <el-input disabled v-model="formData.orderState"  />
        </el-form-item>
        <el-form-item label="来源平台" class="one_">
          <el-input disabled v-model="formData.sourcePlatformName"  />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="货主" class="one_">
        <el-input disabled v-model="formData.ownerName"  />
        </el-form-item>
        <el-form-item label="店铺" class="one_">
          <el-input disabled v-model="formData.shopName" />
        </el-form-item>
        <el-form-item label="出库单号" class="one_">
          <el-input disabled v-model="formData.deliveryOrderCode" />
        </el-form-item>
        <el-form-item label="平台订单创建时间" class="one_">
          <el-input disabled v-model="formData.createTime" />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="仓库编码" class="one_">
          <el-input disabled v-model="formData.warehouseCode" />
        </el-form-item>
        <el-form-item label="仓库名称" class="one_">
        <el-input disabled v-model="formData.warehouseName" />
        </el-form-item>
        <el-form-item label="逻辑仓库编码" class="one_">
          <el-input disabled v-model="formData.logicwarehouseCode" />
        </el-form-item>
        <!-- <el-form-item label="逻辑仓库名称" class="one_">
          <el-input disabled v-model="formData.logicwarehouseName" />
        </el-form-item> -->
        <el-form-item label="逻辑仓库名称" class="one_">
        <el-select
          v-model="formData.logicwarehouseCode"
          placeholder="请选择"
          filterable
          @change="handlerChange"
          clearable
        >
          <el-option
            v-for="item in logicwarehousesArr"
            :key="item.logicwarehouseCode"
            :label="item.logicwarehouseName"
            :value="item.logicwarehouseCode"
          />
        </el-select>
      </el-form-item>
      </div>
        <div class="single-chunk">
          <el-form-item label="渠道名称" class="one_">
            <el-input disabled v-model="formData.channelName" />
            </el-form-item>
            <el-form-item label="渠道编码" class="one_">
              <el-input disabled v-model="formData.channelCode" />
            </el-form-item>
          
            <el-form-item label="门店/站点编码" class="one_">
              <el-input disabled v-model="formData.siteCode" />
            </el-form-item>
            <el-form-item label="门店/站点名称" class="one_">
            <!-- <el-input disabled v-model="formData.siteName" /> -->
            <el-select
              v-model="formData.siteCode"
              placeholder="请选择"
              filterable
              @change="siteChange"
              clearable
            >
              <el-option
                v-for="item in sitesArr"
                :key="item.siteCode"
                :label="item.siteName"
                :value="item.siteCode"
              />
            </el-select>
            </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="主运单号" class="one_">
          <el-input disabled v-model="formData.vestNo" />
        </el-form-item>
        <el-form-item label="下单时间" class="one_">
          <el-input disabled v-model="formData.placeOrderTime" />
        </el-form-item>
        <el-form-item label="支付时间" class="one_">
          <el-input disabled v-model="formData.payTime" />
        </el-form-item>
        <el-form-item label="是否需要解密" class="one_">
          <el-input disabled v-model="formData.decrypto" />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="是否需要马甲" class="one_">
          <el-input disabled v-model="formData.vest" />
        </el-form-item>
        <el-form-item label="马甲快递编码" class="one_">
          <el-input disabled v-model="formData.vestCode" />
        </el-form-item>
        <el-form-item label="物流编码" class="one_">
          <el-input disabled v-model="formData.logisticsCode" />
        </el-form-item>
        <el-form-item label="物流名称" class="one_">
          <!-- <el-input disabled v-model="formData.logisticsCode" /> -->
          <el-select
          v-model="formData.logisticsCode"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in logistics"
            :key="item.logisticsCode"
            :label="item.logisticsName"
            :value="item.logisticsCode"
          />
        </el-select>
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="快递名称" class="one_">
        <el-input disabled v-model="formData.expressName" />
        </el-form-item>
        <el-form-item label="配运单号" class="one_">
          <el-input disabled v-model="formData.expressCode" />
        </el-form-item>
        <el-form-item label="出库单类型" class="one_">
          <el-input disabled v-model="formData.orderType" />
        </el-form-item>
        <el-form-item label="配送类型" class="one_">
          <!-- <el-input disabled v-model="formData.shipType" /> -->
          <el-select
          v-model="formData.shipType"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in deliveryType"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="原出库单号(ERP)" class="one_">
        <el-input disabled v-model="formData.preDeliveryOrderCode" />
        </el-form-item>
        <el-form-item label="原出库单号(WMS)" class="one_">
          <el-input disabled v-model="formData.preDeliveryOrderId" />
        </el-form-item>
        <el-form-item label="网店订单号" class="one_">
          <el-input disabled v-model="formData.platformOrderCode" />
        </el-form-item>
        <el-form-item label="创建时间" class="one_">
          <el-input disabled v-model="formData.acceptTime" />
        </el-form-item>
      </div>
      <div class="single-chunk" style="margin-bottom: 50px;">
        <el-form-item label="审核时间" class="one_">
          <el-input disabled v-model="formData.toOutTime" />
        </el-form-item>
        <el-form-item label="锁定原因" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.lockCause"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.lockCause"
                    disabled="disabled"
                    suffix-icon="el-icon-thumb"
                  ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="作废原因" class="one_" >
          <el-tooltip
                  placement="top-start"
                  effect="light"
                  :content="formData.voidCause"
                  ><!-- 当输入框内容长度小于11时，顶部提示框不显示 -->
                  <el-input
                    v-model="formData.voidCause"
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
  import { getLogicwarehouse,updateBase ,getSites } from "@/api/order/saleorder";
  export default {
    props: {
      detailInfo: {
        type: Object
      },
      logicwarehousesNew:{
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
      },
      carriers:{
        type:Array
      },
      sites:{
        type:Array
      }
    },
    data() {
      return {
        formData: this.detailInfo,
        logicwarehousesArr: this.logicwarehousesNew,
        carriersArr:this.carriers,
        sitesArr:this.sites,
        deliveryType:[
          {label:'店配'},
          {label:'仓配'},
          {label:'车配'},
        ]
      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.formData = val
        }
      },
      logicwarehousesNew:{
        handler(val){
          this.logicwarehousesArr = val
        }
      },
      carriers:{
        handler(val){
          this.carriersArr = val
        }
      },
      sites:{
        handler(val){
          this.sitesArr = val
        }
      }
    },
    activated(){
    },
    mounted() {
    },
    methods: {
      // 逻辑仓库改变获取仓库信息
      handlerChange(val) {
        console.log(val)
        let id =''
        if(!val) {
          this.sitesArr=[]
          this.formData.siteCode =''
          this.formData['warehouseId'] = ''
          this.formData['logicwarehouseId'] = ''
          return
        }
        this.logicwarehousesArr.forEach(item => {
            if(val == item.logicwarehouseCode) {
              this.formData.warehouseName = item.warehouseName
              this.formData.warehouseCode = item.warehouseCode
              this.formData['warehouseId'] = item.warehouseId
              this.formData['logicwarehouseId'] = item.logicwarehouseId
              id = item.logicwarehouseId
            }
        });
        getSites({logicwarehouseId:id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
          if(res){
            this.sitesArr=res.msgData.sites
            this.formData.siteCode =''
          }
        })
      },
      // 承商change获取站点信息
      // carrierChange(val) {
      //   let id = ''
      //   this.carriersArr.forEach(item => {
      //       if(val == item.carrierCode) {
      //         id= item.carrierId
      //         this.formData['carrierId'] = item.carrierId
      //       }
      //   });
      //   getSites({carrierId:id,accessToken: sessionStorage.getItem('xn_token')}).then(res => {
      //     if(res){
      //       this.sitesArr=res.msgData.sites
      //       this.formData.siteCode =''
      //     }
      //   })
      // },
      // 站点选择
      siteChange(val){
        console.log(val)
        if(!val) {
          this.formData['siteId'] =''
          return
        }
        this.sitesArr.forEach(item => {
            if(val == item.siteCode) {
              this.formData['siteId'] = item.siteId
            }
        });
      },
      // getLogicwarehouse(){
      //   getLogicwarehouse({warehouseId:[ this.formData.warehouseId],accessToken: sessionStorage.getItem('xn_token')}).then(res => {
      //     if(res){
      //       this.formData.logicwarehouseId = ''
      //       this.logicwarehousesArr=res.msgData.logicwarehouses
      //     }
      //   })
      // },
      editBase(){
        if(this.selectOrderId<1){
          return;
        }
        console.log(this.formData)
        updateBase({
          id:this.selectOrderId,
          warehouseId:this.formData.warehouseId || '',
          logisticsCode:this.formData.logisticsCode ,
          logicwarehouseId:this.formData.logicwarehouseId || '',
          // carrierId:this.formData.carrierId,
          siteId:this.formData.siteId || '',
          shipType:this.formData.shipType,
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
