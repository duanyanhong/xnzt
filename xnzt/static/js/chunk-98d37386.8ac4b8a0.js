(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98d37386","chunk-660d9c16"],{"06d0":function(t,e,a){"use strict";a("ed61")},"0c24":function(t,e,a){"use strict";a("c4d2")},2422:function(t,e,a){"use strict";(function(t){a("14d9"),a("e9c4"),a("b64b"),a("ac1f"),a("5319");var i=a("c303"),l=a("8643");e["a"]={name:"AllocationOut",components:{AllocationOutDetail:l["default"]},data:function(){return{searchData:{limit:20,page:1,createTime:[],outTime:[],ownerId:[],allocationOrderCode:"",outOrderCode:"",fromLogicwarehouseId:[],toLogicwarehouseId:[],outState:[],accessToken:sessionStorage.getItem("xn_token")},owners:[],logicwarehouses:[],ids:[],pageSizes:[20,50,100],dataList:[],total:0,searchIsshow:!1,searchContent:"",titlesContent:"",searchType:"",loading:!1,formDetailIsshow:!1,detailData:{},jsHeight:500}},mounted:function(){this.searchData.createTime=this.$commonApi.calculateTimeRange("pastWeek"),this.loadData()},activated:function(){var t=this;this.$nextTick((function(){t.$refs.plTable.doLayout()}))},methods:{loadData:function(){var e=this;this.loading=!0,Object(i["a"])(this.searchData).then((function(a){a&&(e.loading=!1,e.dataList=a.msgData.list.items,e.total=a.msgData.list.total,e.owners=a.msgData.owners,e.logicwarehouses=a.msgData.logicwarehouses,e.jsHeight=window.innerHeight-t(".head-container").outerHeight()-t(".crud-opts").outerHeight()-180)}))},handleSelectionChange:function(t){this.ids=[];for(var e=0;e<t.length;e++)this.ids.push(t[e].id)},search:function(){this.page=1,this.loadData()},downMyOrder:function(){var t=this;this.loading=!0,Object(i["b"])(this.searchData).then((function(e){t.loading=!1,e&&(t.$modal.notifySuccess(e.errMsg),void 0!==e.msgData.downloadUrl&&""!==e.msgData.downloadUrl&&(window.location.href=e.msgData.downloadUrl),t.loadData())}))},searchShow:function(t,e){this.searchContent=this.searchData[t].replace(/,/g,"\n"),this.searchType=t,this.titlesContent=e,this.searchIsshow=!0},addSearchForm:function(){this.searchData[this.searchType]=this.searchContent.replace(/\n/g,",").replace("，",","),this.searchIsshow=!1},editStaff:function(t){var e=this;Object(i["c"])({id:t.id,accessToken:sessionStorage.getItem("xn_token")}).then((function(t){t&&(e.detailData=JSON.parse(JSON.stringify(t.msgData)),e.formDetailIsshow=!0)}))}}}}).call(this,a("1157"))},"2c4e":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",[a("div",{staticClass:"head-container"},[a("div",[a("span",{staticClass:"filter-item time-title"},[t._v("创建时间:")]),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important","margin-right":"10px"},attrs:{clearable:!1},model:{value:t.searchData.createTime,callback:function(e){t.$set(t.searchData,"createTime",e)},expression:"searchData.createTime"}}),a("span",{staticClass:"filter-item time-title"},[t._v("出库时间:")]),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important","margin-right":"10px"},attrs:{clearable:!0},model:{value:t.searchData.outTime,callback:function(e){t.$set(t.searchData,"outTime",e)},expression:"searchData.outTime"}}),a("div",{staticClass:"filter-item my-select"},[a("SelectToolbar",{staticStyle:{width:"180px",display:"inline-block"},attrs:{placeholder:"请选择货主",filterable:!1,isfilte:!0,fiftervalue:t.searchData.ownerId,bindId:"ownerId",bindName:"ownerName",fifteroptions:t.owners},model:{value:t.searchData.ownerId,callback:function(e){t.$set(t.searchData,"ownerId",e)},expression:"searchData.ownerId"}})],1),a("div",{staticClass:"filter-item"},[a("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"输入调拨单单号",clearable:""},model:{value:t.searchData.allocationOrderCode,callback:function(e){t.$set(t.searchData,"allocationOrderCode",e)},expression:"searchData.allocationOrderCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(e){return t.searchShow("allocationOrderCode","输入调拨单单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1),a("div",{staticClass:"filter-item"},[a("el-input",{staticStyle:{width:"180px"},attrs:{size:"small",placeholder:"输入出库单号",clearable:""},model:{value:t.searchData.outOrderCode,callback:function(e){t.$set(t.searchData,"outOrderCode",e)},expression:"searchData.outOrderCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(e){return t.searchShow("outOrderCode","输入出库单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1),a("div",{staticClass:"filter-item my-select"},[a("SelectToolbar",{staticStyle:{width:"180px",display:"inline-block"},attrs:{placeholder:"请选择逻辑仓库",filterable:!1,isfilte:!0,fiftervalue:t.searchData.fromLogicwarehouseId,bindId:"logicwarehouseId",bindName:"logicwarehouseName",fifteroptions:t.logicwarehouses},model:{value:t.searchData.fromLogicwarehouseId,callback:function(e){t.$set(t.searchData,"fromLogicwarehouseId",e)},expression:"searchData.fromLogicwarehouseId"}})],1),a("div",{staticClass:"filter-item my-select"},[a("el-select",{staticStyle:{width:"160px"},attrs:{placeholder:"请选择出库单状态",multiple:"","collapse-tags":"",clearable:""},model:{value:t.searchData.outState,callback:function(e){t.$set(t.searchData,"outState",e)},expression:"searchData.outState"}},[a("el-option",{attrs:{label:"待同步",value:"待同步"}}),a("el-option",{attrs:{label:"已同步",value:"已同步"}}),a("el-option",{attrs:{label:"出库中",value:"出库中"}}),a("el-option",{attrs:{label:"已出库",value:"已出库"}})],1)],1),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"crud-opts"},[a("span",{staticClass:"crud-opts-left"},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Stock:AllocationOut:Synch"],expression:"['Stock:AllocationOut:Synch']"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-refresh",plain:""},on:{click:t.downMyOrder}},[t._v(" 同步WMS ")])],1),a("span",{staticClass:"crud-opts-left"},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Stock:AllocationOut:Export"],expression:"['Stock:AllocationOut:Export']"}],staticClass:"filter-item",attrs:{size:"mini",type:"warning",icon:"el-icon-download",plain:""},on:{click:t.downMyOrder}},[t._v("导出")])],1)]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"plTable",attrs:{data:t.dataList,height:t.jsHeight,"use-virtual":"","row-height":50,stripe:"","header-cell-style":{background:"#f8f8f9",color:"#515a6e",fontSize:"13px",height:"45px",border:"none"},"cell-style":{border:"none"}},on:{"selection-change":t.handleSelectionChange}},[a("u-table-column",{attrs:{type:"selection",width:"55"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"outOrderCode",label:"出库单号"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"outState",label:"出库单状态"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"fromLogicwarehouseName",label:"逻辑仓库"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerName",label:"货主"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"allocationOrderCode",label:"调拨订单"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"sourcePlatformCode",label:"来源平台"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"sourceOrderCode",label:"来源订单"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"outTime",label:"出库时间"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"remark",label:"备注"}}),a("u-table-column",{attrs:{label:"操作",align:"center",width:"125"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Stock:Allocation:Preview"],expression:"['Stock:Allocation:Preview']"}],staticStyle:{width:"50px"},attrs:{size:"mini",type:"text",icon:"el-icon-view"},on:{click:function(a){return t.editStaff(e.row)}}},[t._v("详情")])]}}])})],1),a("pagination",{attrs:{limit:t.searchData.limit,page:t.searchData.page,total:t.total,"page-sizes":t.pageSizes},on:{"update:limit":function(e){return t.$set(t.searchData,"limit",e)},"update:page":function(e){return t.$set(t.searchData,"page",e)},"update:pageSizes":function(e){t.pageSizes=e},"update:page-sizes":function(e){t.pageSizes=e},pagination:t.loadData}})],1)],1),a("InputDialog",{attrs:{visible:t.searchIsshow,"search-content":t.searchContent,title:t.titlesContent},on:{"update:visible":function(e){t.searchIsshow=e},"update:searchContent":function(e){t.searchContent=e},"update:search-content":function(e){t.searchContent=e},"update:title":function(e){t.titlesContent=e},confirmed:t.addSearchForm}}),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!0,top:"8vh",visible:t.formDetailIsshow,title:"调拨出库单",width:"80%"},on:{"update:visible":function(e){t.formDetailIsshow=e}}},[a("AllocationOutDetail",{attrs:{detailData:t.detailData}})],1)],1)},l=[],s=a("2422"),o=s["a"],r=(a("06d0"),a("2877")),c=Object(r["a"])(o,i,l,!1,null,"4f90f264",null);e["default"]=c.exports},8643:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"700px","max-height":"700px","overflow-y":"auto"}},[a("div",[a("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 基础信息 ")]),a("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),a("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"出库单号"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outOrderCode,callback:function(e){t.$set(t.detailData.basics,"outOrderCode",e)},expression:"detailData.basics.outOrderCode"}})],1),a("el-form-item",{attrs:{label:"出库单状态"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outState,callback:function(e){t.$set(t.detailData.basics,"outState",e)},expression:"detailData.basics.outState"}})],1),a("el-form-item",{attrs:{label:"调拨订单"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.allocationOrderCode,callback:function(e){t.$set(t.detailData.basics,"allocationOrderCode",e)},expression:"detailData.basics.allocationOrderCode"}})],1),a("el-form-item",{attrs:{label:"逻辑仓库"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.fromLogicwarehouseName,callback:function(e){t.$set(t.detailData.basics,"fromLogicwarehouseName",e)},expression:"detailData.basics.fromLogicwarehouseName"}})],1),a("el-form-item",{attrs:{label:"货主"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.ownerName,callback:function(e){t.$set(t.detailData.basics,"ownerName",e)},expression:"detailData.basics.ownerName"}})],1),a("el-form-item",{attrs:{label:"出库时间"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.outTime,callback:function(e){t.$set(t.detailData.basics,"outTime",e)},expression:"detailData.basics.outTime"}})],1),a("el-form-item",{attrs:{label:"来源平台"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.sourcePlatformCode,callback:function(e){t.$set(t.detailData.basics,"sourcePlatformCode",e)},expression:"detailData.basics.sourcePlatformCode"}})],1),a("el-form-item",{attrs:{label:"来源订单"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.sourceOrderCode,callback:function(e){t.$set(t.detailData.basics,"sourceOrderCode",e)},expression:"detailData.basics.sourceOrderCode"}})],1),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.basics.remark,callback:function(e){t.$set(t.detailData.basics,"remark",e)},expression:"detailData.basics.remark"}})],1)],1)],1),a("div",[a("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 发货信息 ")]),a("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),a("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"发货人"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.contactName,callback:function(e){t.$set(t.detailData.sender,"contactName",e)},expression:"detailData.sender.contactName"}})],1),a("el-form-item",{attrs:{label:"手机"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.contactMobile,callback:function(e){t.$set(t.detailData.sender,"contactMobile",e)},expression:"detailData.sender.contactMobile"}})],1),a("el-form-item",{attrs:{label:"省"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.province,callback:function(e){t.$set(t.detailData.sender,"province",e)},expression:"detailData.sender.province"}})],1),a("el-form-item",{attrs:{label:"市"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.city,callback:function(e){t.$set(t.detailData.sender,"city",e)},expression:"detailData.sender.city"}})],1),a("el-form-item",{attrs:{label:"区"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.sender.area,callback:function(e){t.$set(t.detailData.sender,"area",e)},expression:"detailData.sender.area"}})],1),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{staticStyle:{width:"550px"},attrs:{disabled:""},model:{value:t.detailData.sender.detailAddress,callback:function(e){t.$set(t.detailData.sender,"detailAddress",e)},expression:"detailData.sender.detailAddress"}})],1)],1)],1),a("div",[a("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 收货信息 ")]),a("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),a("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"收货人"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.contactName,callback:function(e){t.$set(t.detailData.receiver,"contactName",e)},expression:"detailData.receiver.contactName"}})],1),a("el-form-item",{attrs:{label:"手机"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.contactMobile,callback:function(e){t.$set(t.detailData.receiver,"contactMobile",e)},expression:"detailData.receiver.contactMobile"}})],1),a("el-form-item",{attrs:{label:"省"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.province,callback:function(e){t.$set(t.detailData.receiver,"province",e)},expression:"detailData.receiver.province"}})],1),a("el-form-item",{attrs:{label:"市"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.city,callback:function(e){t.$set(t.detailData.receiver,"city",e)},expression:"detailData.receiver.city"}})],1),a("el-form-item",{attrs:{label:"区"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.receiver.area,callback:function(e){t.$set(t.detailData.receiver,"area",e)},expression:"detailData.receiver.area"}})],1),a("el-form-item",{attrs:{label:"地址"}},[a("el-input",{staticStyle:{width:"550px"},attrs:{disabled:""},model:{value:t.detailData.receiver.detailAddress,callback:function(e){t.$set(t.detailData.receiver,"detailAddress",e)},expression:"detailData.receiver.detailAddress"}})],1)],1)],1),a("div",[a("div",{staticStyle:{"font-weight":"bold","font-size":"15pt",height:"40px","line-height":"40px"}},[t._v(" 统计信息 ")]),a("div",{staticStyle:{"border-bottom":"1px solid #ccc","margin-bottom":"10px"}}),a("el-form",{ref:"formData",attrs:{inline:!0,size:"small","label-width":"100px"}},[a("el-form-item",{attrs:{label:"总行数"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalLine,callback:function(e){t.$set(t.detailData.statistics,"totalLine",e)},expression:"detailData.statistics.totalLine"}})],1),a("el-form-item",{attrs:{label:"总数量"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPlanQty,callback:function(e){t.$set(t.detailData.statistics,"totalPlanQty",e)},expression:"detailData.statistics.totalPlanQty"}})],1),a("el-form-item",{attrs:{label:"总金额"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPrice,callback:function(e){t.$set(t.detailData.statistics,"totalPrice",e)},expression:"detailData.statistics.totalPrice"}})],1),a("el-form-item",{attrs:{label:"总体积"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalVolume,callback:function(e){t.$set(t.detailData.statistics,"totalVolume",e)},expression:"detailData.statistics.totalVolume"}})],1),a("el-form-item",{attrs:{label:"总重量"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalWeight,callback:function(e){t.$set(t.detailData.statistics,"totalWeight",e)},expression:"detailData.statistics.totalWeight"}})],1),a("el-form-item",{attrs:{label:"实发数量"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualQty,callback:function(e){t.$set(t.detailData.statistics,"totalActualQty",e)},expression:"detailData.statistics.totalActualQty"}})],1),a("el-form-item",{attrs:{label:"实际体积"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualVolume,callback:function(e){t.$set(t.detailData.statistics,"totalActualVolume",e)},expression:"detailData.statistics.totalActualVolume"}})],1),a("el-form-item",{attrs:{label:"实际重量"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalActualWeight,callback:function(e){t.$set(t.detailData.statistics,"totalActualWeight",e)},expression:"detailData.statistics.totalActualWeight"}})],1),a("el-form-item",{attrs:{label:"商品金额"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalItemPrice,callback:function(e){t.$set(t.detailData.statistics,"totalItemPrice",e)},expression:"detailData.statistics.totalItemPrice"}})],1),a("el-form-item",{attrs:{label:"实付金额"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{disabled:""},model:{value:t.detailData.statistics.totalPayPrice,callback:function(e){t.$set(t.detailData.statistics,"totalPayPrice",e)},expression:"detailData.statistics.totalPayPrice"}})],1)],1),a("el-table",{staticStyle:{width:"100%","overflow-y":"auto"},attrs:{data:t.detailData.items,border:"",height:"300","row-height":10}},[a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuCode",label:"商品编码"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuName",label:"商品名称"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"stockUnit",label:"单位"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"skuState",label:"库存状态"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"planQty",label:"请求数量"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"actualQty",label:"实发数量"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"lotNo",label:"批号"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"batchNo",label:"批次"}}),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"expireDate",label:"失效日期"}})],1)],1)])},l=[],s={props:{detailData:{type:Object,required:{}}},activated:function(){},mounted:function(){},methods:{}},o=s,r=(a("0c24"),a("2877")),c=Object(r["a"])(o,i,l,!1,null,null,null);e["default"]=c.exports},c303:function(t,e,a){"use strict";a.d(e,"a",(function(){return l})),a.d(e,"c",(function(){return s})),a.d(e,"b",(function(){return o}));var i=a("b775");function l(t){return Object(i["a"])({url:"xnkj/stock/allocationout/allocationOutList",method:"post",data:t})}function s(t){return Object(i["a"])({url:"xnkj/stock/allocationout/getAllocationOutDetail",method:"post",data:t})}function o(t){return Object(i["a"])({url:"xnkj/stock/allocationout/exportAllocationOutDetail",method:"post",data:t})}},c4d2:function(t,e,a){},ed61:function(t,e,a){}}]);