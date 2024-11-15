<template>
  <div>
    <div slot="footer" class="footer" v-hasPermi="['Order:SaleOrder:Savereceiver']" >
        <el-button type="primary"  v-debounce="addForm" >保存收件信息</el-button>
    </div>
    <el-form ref="formData" :inline="true" :model="formData"  size="mini" label-width="120px" class="contanier">
      <div class="single-chunk">
        <el-form-item label="收件公司" class="one_">
        <el-input disabled v-model="formData.receiverCompany"  />
        </el-form-item>
        <el-form-item label="收件人" class="one_">
          <el-input disabled v-model="formData.receiverName"  />
        </el-form-item>
        <el-form-item label="手机" class="one_">
          <el-input  v-model="formData.receiverMobile" />
        </el-form-item>
        <el-form-item label="电话" class="one_">
          <el-input  v-model="formData.receiverPhone"  />
        </el-form-item>
      </div>
      <div class="single-chunk">
        <el-form-item label="安全手机号" class="one_">
        <el-input  v-model="formData.receiverSecurityMobile"  />
        </el-form-item>
        <el-form-item label="省市区" class="one_">
          <el-input disabled  v-model="address"  />
          <!-- <span  class="address-item" >{{formData.receiverProvince}} {{formData.receiverCity?'/'+formData.receiverCity:''}} {{formData.receiverArea ? '/'+formData.receiverArea:''}}</span> -->
        </el-form-item>
        <el-form-item label="街道" class="one_">
          <el-input disabled v-model="formData.receiverTown"  />
        </el-form-item>
        <el-form-item label="地址" class="one_">
          <el-input  v-model="formData.receiverAddress"  />
        </el-form-item>
      </div>
      <div class="others single-chunk"  style="margin-bottom: 50px;">
        <!-- <el-form-item label="系统区域" class="one_" >
          <el-input  v-model="scopeAddress"  />
        </el-form-item> -->
        <el-form-item label="省份"  class="one_">
          <el-select
            v-model="formData.provinceId"
            placeholder="请选择"
            @change="getCity"
            filterable
          >
            <el-option
              v-for="item in provincesArr"
              :key="item.provinceId"
              :label="item.provinceName"
              :value="item.provinceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市"  class="one_">
          <el-select
            v-model="formData.cityId"
            placeholder="请选择"
            filterable
            @change="getArea"
          >
            <el-option
              v-for="item in citys"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区域"  class="one_">
          <el-select
            v-model="formData.areaId"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in areas"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所在经纬度" class="one_">
          <el-input disabled v-model="lonLat"  />
           <!-- <span class="address-item">{{formData.lon}},{{ formData.lat }}</span> -->
        </el-form-item>
      </div>
      <!-- <div class="single-chunk">
       
      <el-form-item label="所在纬度" class="one_">
        <el-input disabled v-model="formData.lat"  />
      </el-form-item>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { getCity,getArea ,updateReceiver} from "@/api/order/saleorder";
import { type } from "jquery";

import { get } from "sortablejs";

  export default {
    props: {
      detailInfo: {
        type: Object
      },
      provinces:{
        type:Array
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
        formData: this.detailInfo,
        provincesArr:this.provinces,
        citys:[],
        areas:[],
        lonLat:this.detailInfo.lon+'/'+this.detailInfo.lat,
        address: this.detailInfo.receiverProvince + (this.detailInfo.receiverCity?'/'+this.detailInfo.receiverCity:'') + (this.detailInfo.receiverArea ? '/'+this.detailInfo.receiverArea:''),
        scopeAddress: this.detailInfo.provinceName + (this.detailInfo.cityName?'/'+this.detailInfo.cityName:'') + (this.detailInfo.areaName ? '/'+this.detailInfo.areaName:'')

      }
    },
    watch:{
      detailInfo:{
        handler(val){
          this.formData = val
          this.address =val.receiverProvince + (val.receiverCity?'/'+val.receiverCity:'') + (val.receiverArea ? '/'+val.receiverArea:'')
          this.scopeAddress =val.provinceName + (val.cityName?'/'+val.cityName:'') + (val.areaName ? '/'+val.areaName:'')
          this.lonLat =val.lon+'/'+val.lat
          if(val.provinceId) {
              this.getCity(1)
          }
          if(val.cityId) {
              this.getArea(1)
          }
            }
      },
      provinces:{
        handler(val) {
          this.citys = []
          this.areas = []
          this.provincesArr = val
        }
      }
    },
    activated(){
    },
    mounted() {
      if(this.formData.provinceId) {
          this.getCity(1)
      }
      if(this.formData.cityId) {
          this.getArea(1)
      }
    },
    methods: {
      addForm() {
        if(this.selectOrderId<1){
          return;
        }
        console.log(this.formData)
        updateReceiver({
          id:this.selectOrderId,
          provinceId:this.formData.provinceId,
          provinceName:this.formData.provinceName,
          cityId:this.formData.cityId,
          cityName:this.formData.cityName,
          areaId:this.formData.areaId,
          areaName:this.formData.areaName,
          receiverPhone:this.formData.receiverPhone,
          receiverMobile:this.formData.receiverMobile,
          receiverSecurityMobile:this.formData.receiverSecurityMobile,
          receiverAddress:this.formData.receiverAddress,
          accessToken: sessionStorage.getItem('xn_token')
        }).then(res => {
          if(res){
            this.$modal.notifySuccess(res.errMsg)
            this.loadData()
          }
        })
      },
      getCity(val=0){
      const data = {accessToken:sessionStorage.getItem('xn_token'),provinceId:[this.formData.provinceId]}
      if(val!=1) this.formData.cityId=''
      getCity(data).then(res => {
        if(res){
          this.citys = res.msgData.cities
          this.areas = []
        }
      })
    },
    getArea(val=0){
      console.log(val)
      if(val !=1) this.formData.areaId = ''
      const data = {accessToken:sessionStorage.getItem('xn_token'),cityId:[this.formData.cityId]}
      getArea(data).then(res => {
        if(res){
          this.areas = res.msgData.areas
        }
      })
    },

    }
  }

</script>
<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
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
  }
  ::v-deep .el-input--mini {
    font-size: 14px;
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
    // width: 300px;
  }
  ::v-deep .el-input--mini {
    font-size: 12px;
  }
</style>
