(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fa3f242"],{"423e":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[e._v(" 选择条件： "),a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:e.getSearch},model:{value:e.selectName,callback:function(t){e.selectName=t},expression:"selectName"}},e._l(e.dataTypeList,(function(e){return a("el-option",{key:e.englishName,attrs:{label:e.chineseName,value:e.englishName}})})),1),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:e.addSearch}},[e._v("新增")])],1),a("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{data:e.searchContentList,border:"",height:"480","row-height":30,"highlight-current-row":""},on:{"row-click":e.handleCurrentChange}},[a("el-table-column",{attrs:{label:"筛选条件"},scopedSlots:e._u([{key:"default",fn:function(t){return["soCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入销售单号",clearable:""},model:{value:e.searchData.soCode,callback:function(t){e.$set(e.searchData,"soCode",t)},expression:"searchData.soCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("soCode","输入销售单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"shCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入销售出库单号",clearable:""},model:{value:e.searchData.shCode,callback:function(t){e.$set(e.searchData,"shCode",t)},expression:"searchData.shCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("shCode","输入销售出库单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"ownerId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.ownerId,callback:function(t){e.$set(e.searchData,"ownerId",t)},expression:"searchData.ownerId"}},e._l(e.optionArr.owners,(function(e){return a("el-option",{key:e.ownerId,attrs:{label:e.ownerName,value:e.ownerId}})})),1)],1):e._e(),"shopId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.shopId,callback:function(t){e.$set(e.searchData,"shopId",t)},expression:"searchData.shopId"}},e._l(e.optionArr.shops,(function(e){return a("el-option",{key:e.shopId,attrs:{label:e.shopName,value:e.shopId}})})),1)],1):e._e(),"deliveryOrderCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入出库单号",clearable:""},model:{value:e.searchData.deliveryOrderCode,callback:function(t){e.$set(e.searchData,"deliveryOrderCode",t)},expression:"searchData.deliveryOrderCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("deliveryOrderCode","输入出库单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"preDeliveryOrderCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入ERP原出库单号",clearable:""},model:{value:e.searchData.preDeliveryOrderCode,callback:function(t){e.$set(e.searchData,"preDeliveryOrderCode",t)},expression:"searchData.preDeliveryOrderCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("preDeliveryOrderCode","输入ERP原出库单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"preDeliveryOrderId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入WMS原出库单号",clearable:""},model:{value:e.searchData.preDeliveryOrderId,callback:function(t){e.$set(e.searchData,"preDeliveryOrderId",t)},expression:"searchData.preDeliveryOrderId"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("preDeliveryOrderId","输入WMS原出库单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"orderType"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.orderType,callback:function(t){e.$set(e.searchData,"orderType",t)},expression:"searchData.orderType"}},e._l(e.optionArr.ordersType,(function(e){return a("el-option",{key:e.orderType,attrs:{label:e.typeName,value:e.orderType}})})),1)],1):e._e(),"warehouseId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.warehouseId,callback:function(t){e.$set(e.searchData,"warehouseId",t)},expression:"searchData.warehouseId"}},e._l(e.optionArr.warehouses,(function(e){return a("el-option",{key:e.warehouseId,attrs:{label:e.warehouseName,value:e.warehouseId}})})),1)],1):e._e(),"logicwarehouseId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.logicwarehouseId,callback:function(t){e.$set(e.searchData,"logicwarehouseId",t)},expression:"searchData.logicwarehouseId"}},e._l(e.optionArr.logicwarehouses,(function(e){return a("el-option",{key:e.logicwarehouseId,attrs:{label:e.logicwarehouseName,value:e.logicwarehouseId}})})),1)],1):e._e(),"sourcePlatformCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.sourcePlatformCode,callback:function(t){e.$set(e.searchData,"sourcePlatformCode",t)},expression:"searchData.sourcePlatformCode"}},e._l(e.optionArr.sourcePlatforms,(function(e){return a("el-option",{key:e.sourcePlatformCode,attrs:{label:e.sourcePlatformName,value:e.sourcePlatformCode}})})),1)],1):e._e(),"createTime"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important"},attrs:{disabled:"",clearable:!1},model:{value:e.searchData.createTime,callback:function(t){e.$set(e.searchData,"createTime",t)},expression:"searchData.createTime"}})],1):e._e(),"placeOrderTime"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important"},attrs:{disabled:"",clearable:!1},model:{value:e.searchData.placeOrderTime,callback:function(t){e.$set(e.searchData,"placeOrderTime",t)},expression:"searchData.placeOrderTime"}})],1):e._e(),"payTime"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important"},attrs:{disabled:"",clearable:!1},model:{value:e.searchData.payTime,callback:function(t){e.$set(e.searchData,"payTime",t)},expression:"searchData.payTime"}})],1):e._e(),"sellerNick"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入卖家名称",clearable:""},model:{value:e.searchData.sellerNick,callback:function(t){e.$set(e.searchData,"sellerNick",t)},expression:"searchData.sellerNick"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("sellerNick","输入卖家名称")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"buyerNick"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入买家昵称",clearable:""},model:{value:e.searchData.buyerNick,callback:function(t){e.$set(e.searchData,"buyerNick",t)},expression:"searchData.buyerNick"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("buyerNick","输入买家昵称")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"vestNo"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入主运单号",clearable:""},model:{value:e.searchData.vestNo,callback:function(t){e.$set(e.searchData,"vestNo",t)},expression:"searchData.vestNo"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("vestNo","输入主运单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"logisticsCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.logisticsCode,callback:function(t){e.$set(e.searchData,"logisticsCode",t)},expression:"searchData.logisticsCode"}},e._l(e.optionArr.logistics,(function(e){return a("el-option",{key:e.logisticsCode,attrs:{label:e.logisticsName,value:e.logisticsCode}})})),1)],1):e._e(),"expressCode"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-input",{staticStyle:{width:"350px"},attrs:{size:"small",placeholder:"输入配运单号",clearable:""},model:{value:e.searchData.expressCode,callback:function(t){e.$set(e.searchData,"expressCode",t)},expression:"searchData.expressCode"}},[a("el-button",{attrs:{slot:"suffix",type:"text"},on:{click:function(t){return e.searchShow("expressCode","输入配运单号")}},slot:"suffix"},[a("svg-icon",{staticStyle:{background:"#fff","vertical-align":"0"},attrs:{"icon-class":"plus"}})],1)],1)],1):e._e(),"expressName"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.expressName,callback:function(t){e.$set(e.searchData,"expressName",t)},expression:"searchData.expressName"}},e._l(e.optionArr.expresses,(function(e){return a("el-option",{key:e.expressName,attrs:{label:e.expressName,value:e.expressName}})})),1)],1):e._e(),"provinceId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.provinceId,callback:function(t){e.$set(e.searchData,"provinceId",t)},expression:"searchData.provinceId"}},e._l(e.optionArr.provinces,(function(e){return a("el-option",{key:e.provinceId,attrs:{label:e.provinceName,value:e.provinceId}})})),1)],1):e._e(),"cityId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.cityId,callback:function(t){e.$set(e.searchData,"cityId",t)},expression:"searchData.cityId"}},e._l(e.optionArr.cities,(function(e){return a("el-option",{key:e.cityId,attrs:{label:e.cityName,value:e.cityId}})})),1)],1):e._e(),"areaId"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.areaId,callback:function(t){e.$set(e.searchData,"areaId",t)},expression:"searchData.areaId"}},e._l(e.optionArr.areas,(function(e){return a("el-option",{key:e.areaId,attrs:{label:e.areaName,value:e.areaId}})})),1)],1):e._e(),"orderState"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("el-select",{staticStyle:{width:"350px"},attrs:{placeholder:"请选择",multiple:"","collapse-tags":""},model:{value:e.searchData.orderState,callback:function(t){e.$set(e.searchData,"orderState",t)},expression:"searchData.orderState"}},e._l(e.optionArr.ordersState,(function(e){return a("el-option",{key:e.orderState,attrs:{label:e.orderState,value:e.orderState}})})),1)],1):e._e(),"examineTime"==t.row.englishName?a("div",{staticClass:"search-input"},[e._v(" "+e._s(t.row.chineseName)+"： "),a("date-range-picker",{staticClass:"date-item",staticStyle:{width:"350px !important"},attrs:{disabled:"",clearable:!1},model:{value:e.searchData.examineTime,callback:function(t){e.$set(e.searchData,"examineTime",t)},expression:"searchData.examineTime"}})],1):e._e()]}}])}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"text",icon:"el-icon-remove-outline"},on:{click:function(a){return e.addDel(t.$index)}}},[e._v("移除")])]}}])})],1),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",icon:"el-icon-top"},on:{click:function(t){return e.moveUp()}}},[e._v(" 上移 ")]),a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",icon:"el-icon-bottom"},on:{click:function(t){return e.moveDown()}}},[e._v(" 下移 ")]),a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",icon:"el-icon-s-promotion"},on:{click:function(t){return e.moveTo()}}},[e._v(" 移动至 ")]),a("el-input",{staticStyle:{width:"80px","margin-right":"10px","margin-left":"3px"},attrs:{clearable:"",size:"mini"},model:{value:e.toNumber,callback:function(t){e.toNumber=t},expression:"toNumber"}}),a("el-button",{staticStyle:{width:"100px"},attrs:{size:"mini",icon:"el-icon-refresh"},on:{click:e.reset}},[e._v(" 重置 ")])],1),a("InputDialog",{attrs:{visible:e.searchIsshow,"search-content":e.searchContent,title:e.titlesContent},on:{"update:visible":function(t){e.searchIsshow=t},"update:searchContent":function(t){e.searchContent=t},"update:search-content":function(t){e.searchContent=t},"update:title":function(t){e.titlesContent=t},confirmed:e.addSearchForm}})],1)},i=[],r=(a("c740"),a("14d9"),a("a434"),a("e9c4"),a("b64b"),a("ac1f"),a("5319"),{props:{searchTypeList:{type:Array,required:[]},searchContentList:{type:Array,required:[]},optionArr:{type:Object,required:{}}},watch:{searchContentList:{handler:function(e){this.searchContentList=e}}},data:function(){return{searchData:{soCode:"",shCode:"",ownerId:[],shopId:[],deliveryOrderCode:"",preDeliveryOrderCode:"",preDeliveryOrderId:"",orderType:[],warehouseId:[],logicwarehouseId:[],sourcePlatformCode:[],createTime:[],placeOrderTime:[],payTime:[],sellerNick:"",buyerNick:"",vestNo:"",logisticsCode:[],expressCode:"",expressName:"",provinceId:[],cityId:[],areaId:[],orderState:[],examineTime:[]},searchIsshow:!1,searchContent:"",titlesContent:"",searchType:"",dataTypeList:this.searchTypeList,selectName:"",selectArr:[],selectIndex:"",toNumber:""}},mounted:function(){this.selectName="",this.selectArr=[]},methods:{addSearch:function(){var e=this;""!=this.selectName?-1===this.searchContentList.findIndex((function(t){return t.englishName===e.selectName}))?this.searchContentList.push(this.selectArr):this.$modal.notifyWarning("该条件已添加！"):this.$modal.notifyWarning("请选择筛选条件！")},addDel:function(e){this.selectIndex="",this.searchContentList.splice(e,1)},getSearch:function(e){for(var t=0;t<this.searchTypeList.length;t++)e==this.searchTypeList[t].englishName&&(this.selectArr=this.searchTypeList[t])},handleCurrentChange:function(e){var t=this.searchContentList.indexOf(e);this.selectIndex=t},searchShow:function(e,t){this.searchContent=this.searchData[e].replace(/,/g,"\n"),this.searchType=e,this.titlesContent=t,this.searchIsshow=!0},addSearchForm:function(){this.searchData[this.searchType]=this.searchContent.replace(/\n/g,",").replace("，",","),this.searchIsshow=!1},moveUp:function(){if(""!==this.selectIndex)if(this.selectIndex>0){var e=this.searchContentList[this.selectIndex-1];this.searchContentList.splice(this.selectIndex-1,1),this.searchContentList.splice(this.selectIndex,0,e),this.selectIndex=this.selectIndex-1}else this.$modal.notifyWarning("已经是第一条，不可上移！");else this.$modal.notifyWarning("请选择一行！")},moveDown:function(){if(""!==this.selectIndex)if(this.selectIndex+1===this.searchContentList.length)this.$modal.notifyWarning("已经是最后一条，不可下移！");else{var e=this.searchContentList[this.selectIndex+1];this.searchContentList.splice(this.selectIndex+1,1),this.searchContentList.splice(this.selectIndex,0,e),this.selectIndex=this.selectIndex+1}else this.$modal.notifyWarning("请选择一行！")},moveTo:function(){if(""!==this.selectIndex)if(this.toNumber<1||this.toNumber>this.searchContentList.length)this.$modal.notifyWarning("请输入正确的位置移动！");else{var e=this.searchContentList[this.selectIndex];this.searchContentList.splice(this.selectIndex,1),this.searchContentList.splice(this.toNumber-1,0,e),this.selectIndex=this.toNumber-1}else this.$modal.notifyWarning("请选择一行！")},reset:function(){this.selectIndex="",this.$emit("update:searchContentList",JSON.parse(JSON.stringify(this.searchTypeList)))}}}),l=r,c=(a("7165"),a("2877")),o=Object(c["a"])(l,s,i,!1,null,"7d546aec",null);t["default"]=o.exports},7165:function(e,t,a){"use strict";a("9008")},9008:function(e,t,a){}}]);