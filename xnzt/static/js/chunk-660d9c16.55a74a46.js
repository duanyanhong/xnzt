(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-660d9c16"],{"0c24":function(t,a,e){"use strict";e("c4d2")},8643:function(t,a,e){"use strict";e.r(a);var l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticStyle:{height:"700px","max-height":"700px","overflow-y":"auto"}},[e("div",[e("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 基础信息 ")]),e("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),e("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[e("el-form-item",{attrs:{label:"出库单号"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outOrderCode,callback:function(a){t.$set(t.detailData.basics,"outOrderCode",a)},expression:"detailData.basics.outOrderCode"}})],1),e("el-form-item",{attrs:{label:"出库单状态"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outState,callback:function(a){t.$set(t.detailData.basics,"outState",a)},expression:"detailData.basics.outState"}})],1),e("el-form-item",{attrs:{label:"调拨订单"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.allocationOrderCode,callback:function(a){t.$set(t.detailData.basics,"allocationOrderCode",a)},expression:"detailData.basics.allocationOrderCode"}})],1),e("el-form-item",{attrs:{label:"逻辑仓库"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.fromLogicwarehouseName,callback:function(a){t.$set(t.detailData.basics,"fromLogicwarehouseName",a)},expression:"detailData.basics.fromLogicwarehouseName"}})],1),e("el-form-item",{attrs:{label:"货主"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.ownerName,callback:function(a){t.$set(t.detailData.basics,"ownerName",a)},expression:"detailData.basics.ownerName"}})],1),e("el-form-item",{attrs:{label:"出库时间"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outTime,callback:function(a){t.$set(t.detailData.basics,"outTime",a)},expression:"detailData.basics.outTime"}})],1),e("el-form-item",{attrs:{label:"来源平台"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.sourcePlatformCode,callback:function(a){t.$set(t.detailData.basics,"sourcePlatformCode",a)},expression:"detailData.basics.sourcePlatformCode"}})],1),e("el-form-item",{attrs:{label:"来源订单"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.sourceOrderCode,callback:function(a){t.$set(t.detailData.basics,"sourceOrderCode",a)},expression:"detailData.basics.sourceOrderCode"}})],1),e("el-form-item",{attrs:{label:"备注"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.remark,callback:function(a){t.$set(t.detailData.basics,"remark",a)},expression:"detailData.basics.remark"}})],1)],1)],1),e("div",[e("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 发货信息 ")]),e("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),e("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[e("el-form-item",{attrs:{label:"发货人"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.contactName,callback:function(a){t.$set(t.detailData.sender,"contactName",a)},expression:"detailData.sender.contactName"}})],1),e("el-form-item",{attrs:{label:"手机"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.contactMobile,callback:function(a){t.$set(t.detailData.sender,"contactMobile",a)},expression:"detailData.sender.contactMobile"}})],1),e("el-form-item",{attrs:{label:"省"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.province,callback:function(a){t.$set(t.detailData.sender,"province",a)},expression:"detailData.sender.province"}})],1),e("el-form-item",{attrs:{label:"市"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.city,callback:function(a){t.$set(t.detailData.sender,"city",a)},expression:"detailData.sender.city"}})],1),e("el-form-item",{attrs:{label:"区"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.area,callback:function(a){t.$set(t.detailData.sender,"area",a)},expression:"detailData.sender.area"}})],1),e("el-form-item",{attrs:{label:"地址"}},[e("el-input",{staticStyle:{width:"550px"},attrs:{disabled:""},model:{value:t.detailData.sender.detailAddress,callback:function(a){t.$set(t.detailData.sender,"detailAddress",a)},expression:"detailData.sender.detailAddress"}})],1)],1)],1),e("div",[e("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 收货信息 ")]),e("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),e("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[e("el-form-item",{attrs:{label:"收货人"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.contactName,callback:function(a){t.$set(t.detailData.receiver,"contactName",a)},expression:"detailData.receiver.contactName"}})],1),e("el-form-item",{attrs:{label:"手机"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.contactMobile,callback:function(a){t.$set(t.detailData.receiver,"contactMobile",a)},expression:"detailData.receiver.contactMobile"}})],1),e("el-form-item",{attrs:{label:"省"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.province,callback:function(a){t.$set(t.detailData.receiver,"province",a)},expression:"detailData.receiver.province"}})],1),e("el-form-item",{attrs:{label:"市"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.city,callback:function(a){t.$set(t.detailData.receiver,"city",a)},expression:"detailData.receiver.city"}})],1),e("el-form-item",{attrs:{label:"区"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.area,callback:function(a){t.$set(t.detailData.receiver,"area",a)},expression:"detailData.receiver.area"}})],1),e("el-form-item",{attrs:{label:"地址"}},[e("el-input",{staticStyle:{width:"550px"},attrs:{disabled:""},model:{value:t.detailData.receiver.detailAddress,callback:function(a){t.$set(t.detailData.receiver,"detailAddress",a)},expression:"detailData.receiver.detailAddress"}})],1)],1)],1),e("div",[e("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 统计信息 ")]),e("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),e("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[e("el-form-item",{attrs:{label:"总行数"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalLine,callback:function(a){t.$set(t.detailData.statistics,"totalLine",a)},expression:"detailData.statistics.totalLine"}})],1),e("el-form-item",{attrs:{label:"总数量"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPlanQty,callback:function(a){t.$set(t.detailData.statistics,"totalPlanQty",a)},expression:"detailData.statistics.totalPlanQty"}})],1),e("el-form-item",{attrs:{label:"总金额"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPrice,callback:function(a){t.$set(t.detailData.statistics,"totalPrice",a)},expression:"detailData.statistics.totalPrice"}})],1),e("el-form-item",{attrs:{label:"总体积"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalVolume,callback:function(a){t.$set(t.detailData.statistics,"totalVolume",a)},expression:"detailData.statistics.totalVolume"}})],1),e("el-form-item",{attrs:{label:"总重量"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalWeight,callback:function(a){t.$set(t.detailData.statistics,"totalWeight",a)},expression:"detailData.statistics.totalWeight"}})],1),e("el-form-item",{attrs:{label:"实发数量"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualQty,callback:function(a){t.$set(t.detailData.statistics,"totalActualQty",a)},expression:"detailData.statistics.totalActualQty"}})],1),e("el-form-item",{attrs:{label:"实际体积"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualVolume,callback:function(a){t.$set(t.detailData.statistics,"totalActualVolume",a)},expression:"detailData.statistics.totalActualVolume"}})],1),e("el-form-item",{attrs:{label:"实际重量"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualWeight,callback:function(a){t.$set(t.detailData.statistics,"totalActualWeight",a)},expression:"detailData.statistics.totalActualWeight"}})],1),e("el-form-item",{attrs:{label:"商品金额"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalItemPrice,callback:function(a){t.$set(t.detailData.statistics,"totalItemPrice",a)},expression:"detailData.statistics.totalItemPrice"}})],1),e("el-form-item",{attrs:{label:"实付金额"}},[e("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPayPrice,callback:function(a){t.$set(t.detailData.statistics,"totalPayPrice",a)},expression:"detailData.statistics.totalPayPrice"}})],1)],1),e("el-table",{staticStyle:{width:"100%","overflow-y":"auto"},attrs:{data:t.detailData.items,border:"",height:"300","row-height":10}},[e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuCode",label:"商品编码"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuName",label:"商品名称"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"stockUnit",label:"单位"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuState",label:"库存状态"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"planQty",label:"请求数量"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"actualQty",label:"实发数量"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"lotNo",label:"批号"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"batchNo",label:"批次"}}),e("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"expireDate",label:"失效日期"}})],1)],1)])},i=[],s={props:{detailData:{type:Object,required:{}}},activated:function(){},mounted:function(){},methods:{}},o=s,r=(e("0c24"),e("2877")),c=Object(r["a"])(o,l,i,!1,null,null,null);a["default"]=c.exports},c4d2:function(t,a,e){}}]);