(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57a1ee02"],{"205f":function(a,e,t){"use strict";t.r(e);var s=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("el-form",{ref:"formData",attrs:{inline:!0,model:a.formData,size:"mini","label-width":"120px"}},[t("el-form-item",{staticClass:"order-class-item",attrs:{label:"销售订单"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.soCode,callback:function(e){a.$set(a.formData,"soCode",e)},expression:"formData.soCode"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"销售出库订单"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.shCode,callback:function(e){a.$set(a.formData,"shCode",e)},expression:"formData.shCode"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"货主"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.ownerName,callback:function(e){a.$set(a.formData,"ownerName",e)},expression:"formData.ownerName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"店铺"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.shopName,callback:function(e){a.$set(a.formData,"shopName",e)},expression:"formData.shopName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"仓库"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.warehouseName,callback:function(e){a.$set(a.formData,"warehouseName",e)},expression:"formData.warehouseName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"逻辑仓库"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.logicwarehouseName,callback:function(e){a.$set(a.formData,"logicwarehouseName",e)},expression:"formData.logicwarehouseName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"审核状态"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.orderState,callback:function(e){a.$set(a.formData,"orderState",e)},expression:"formData.orderState"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"来源订单"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.deliveryOrderCode,callback:function(e){a.$set(a.formData,"deliveryOrderCode",e)},expression:"formData.deliveryOrderCode"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"来源平台"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.sourcePlatformName,callback:function(e){a.$set(a.formData,"sourcePlatformName",e)},expression:"formData.sourcePlatformName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"下单时间"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.placeOrderTime,callback:function(e){a.$set(a.formData,"placeOrderTime",e)},expression:"formData.placeOrderTime"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"付款时间"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.payTime,callback:function(e){a.$set(a.formData,"payTime",e)},expression:"formData.payTime"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"承运商"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.logisticsName,callback:function(e){a.$set(a.formData,"logisticsName",e)},expression:"formData.logisticsName"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"配送类型"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.deliveryType,callback:function(e){a.$set(a.formData,"deliveryType",e)},expression:"formData.deliveryType"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"出库单"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.shCode,callback:function(e){a.$set(a.formData,"shCode",e)},expression:"formData.shCode"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"主运单号"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.vestNo,callback:function(e){a.$set(a.formData,"vestNo",e)},expression:"formData.vestNo"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"配运单号"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.expressCode,callback:function(e){a.$set(a.formData,"expressCode",e)},expression:"formData.expressCode"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"作废原因"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.voidCause,callback:function(e){a.$set(a.formData,"voidCause",e)},expression:"formData.voidCause"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"是否需要解密"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.decrypto,callback:function(e){a.$set(a.formData,"decrypto",e)},expression:"formData.decrypto"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"是否需要马甲"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.vest,callback:function(e){a.$set(a.formData,"vest",e)},expression:"formData.vest"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"是否门店配送"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.unsalableTime,callback:function(e){a.$set(a.formData,"unsalableTime",e)},expression:"formData.unsalableTime"}})],1),t("el-form-item",{staticClass:"order-class-item",attrs:{label:"网店订单号"}},[t("el-input",{attrs:{disabled:""},model:{value:a.formData.platformOrderCode,callback:function(e){a.$set(a.formData,"platformOrderCode",e)},expression:"formData.platformOrderCode"}})],1)],1)],1)},l=[],r={props:{detailInfo:{type:Object}},data:function(){return{formData:this.detailInfo}},watch:{detailInfo:{handler:function(a){this.formData=a}}},activated:function(){},mounted:function(){},methods:{}},o=r,i=(t("5831"),t("2877")),m=Object(i["a"])(o,s,l,!1,null,"27b14204",null);e["default"]=m.exports},5831:function(a,e,t){"use strict";t("5836")},5836:function(a,e,t){}}]);