(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05f95720"],{c47a:function(e,t,a){"use strict";a.d(t,"d",(function(){return s})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return l}));var o=a("b775");function s(e){return Object(o["a"])({url:"xnkj/base/logicwarehouse/logicwarehouseList",method:"post",data:e})}function i(e){return Object(o["a"])({url:"xnkj/base/logicwarehouse/editLogicwarehouse",method:"post",data:e})}function r(e){return Object(o["a"])({url:"xnkj/base/logicwarehouse/addLogicwarehouse",method:"post",data:e})}function l(e){return Object(o["a"])({url:"xnkj/base/logicwarehouse/disableLogicwarehouse",method:"post",data:e})}},eb0a:function(e,t,a){"use strict";(function(e){var o=a("c47a");t["a"]={name:"Logicwarehouse",data:function(){return{rules:{warehouseId:[{required:!0,message:"请选择",trigger:"change"}],logicwarehouseType:[{required:!0,message:"请选择",trigger:"change"}],logicwarehouseCode:[{required:!0,message:"请输入逻辑仓编码",trigger:"blur"}],logicwarehouseName:[{required:!0,message:"请输入逻辑仓名称",trigger:"blur"}]},searchData:{logicwarehouseCode:"",limit:20,page:1,accessToken:sessionStorage.getItem("xn_token")},pageSizes:[20,50,100],dataList:[],total:0,loading:!1,formIsshow:!1,formData:{id:"",warehouseId:"",logicwarehouseCode:"",logicwarehouseName:"",logicwarehouseType:"",accessToken:sessionStorage.getItem("xn_token")},jsHeight:500,editStatus:!1,titleContent:"管理逻辑仓库",warehouses:[]}},mounted:function(){this.loadData()},activated:function(){var e=this;this.$nextTick((function(){e.$refs.plTable.doLayout()}))},methods:{loadData:function(){var t=this;this.loading=!0,Object(o["d"])(this.searchData).then((function(a){a&&(t.loading=!1,t.dataList=a.msgData.list.items,t.total=a.msgData.list.total,t.warehouses=a.msgData.warehouses,t.jsHeight=window.innerHeight-e(".head-container").outerHeight()-e(".crud-opts").outerHeight()-180)}))},search:function(){this.page=1,this.loadData()},addShow:function(){for(var e in this.editStatus=!1,void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData)"accessToken"!=e&&(this.formData[e]="");this.formIsshow=!0},addForm:function(){var e=this;this.$refs["formData"].validate((function(t){if(!t)return!1;var a=e;a.editStatus?Object(o["c"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())})):Object(o["a"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())}))}))},editStaff:function(e){for(var t in void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData)"accessToken"!=t&&(this.formData[t]=e[t]);this.editStatus=!0,this.formIsshow=!0},editDisable:function(e){var t=this;this.$refs["popover-".concat(e.$index)].doClose();var a={id:e.row.id,accessToken:sessionStorage.getItem("xn_token")};Object(o["b"])(a).then((function(e){e&&(t.$modal.notifySuccess(e.errMsg),t.loadData())}))}}}}).call(this,a("1157"))},fbef:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",[a("div",{staticClass:"head-container"},[a("div",[a("el-input",{staticClass:"order-input",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入逻辑仓编码搜索"},model:{value:e.searchData.logicwarehouseCode,callback:function(t){e.$set(e.searchData,"logicwarehouseCode",t)},expression:"searchData.logicwarehouseCode"}}),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")])],1)]),a("div",{staticClass:"crud-opts"},[a("span",{staticClass:"crud-opts-left"},[e._t("left"),a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Logicwarehouse:Add"],expression:"['Base:Logicwarehouse:Add']"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus",plain:""},on:{click:e.addShow}},[e._v(" 新增 ")]),e._t("right")],2)]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"plTable",attrs:{data:e.dataList,height:e.jsHeight,"row-height":50,stripe:"","header-cell-style":{background:"#f8f8f9",color:"#515a6e",fontSize:"13px",height:"45px",border:"none"},"cell-style":{border:"none"}}},[a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"warehouseName",label:"物理仓"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"logicwarehouseCode",label:"逻辑仓编码"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"logicwarehouseName",label:"逻辑仓名称"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"logicwarehouseType",label:"类型"}}),a("u-table-column",{attrs:{label:"禁用",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["是"==t.row.disable?a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(t.row.disable))]):"否"==t.row.disable?a("el-tag",{attrs:{type:"success"}},[e._v(e._s(t.row.disable))]):e._e()]}}])}),a("u-table-column",{attrs:{label:"操作",align:"center",width:"185",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Logicwarehouse:Edit"],expression:"['Base:Logicwarehouse:Edit']"}],staticStyle:{width:"50px"},attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.editStaff(t.row)}}},[e._v("修改")]),"否"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Logicwarehouse:Disable"],expression:"['Base:Logicwarehouse:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定禁用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-lock",size:"mini"},slot:"reference"},[e._v("禁用")])],1):e._e(),"是"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Logicwarehouse:Disable"],expression:"['Base:Logicwarehouse:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定启用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticClass:"el-button--success",staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-unlock",size:"mini"},slot:"reference"},[e._v("启用")])],1):e._e()]}}])})],1),a("pagination",{attrs:{limit:e.searchData.limit,page:e.searchData.page,total:e.total,"page-sizes":e.pageSizes},on:{"update:limit":function(t){return e.$set(e.searchData,"limit",t)},"update:page":function(t){return e.$set(e.searchData,"page",t)},"update:pageSizes":function(t){e.pageSizes=t},"update:page-sizes":function(t){e.pageSizes=t},pagination:e.loadData}})],1)],1),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,visible:e.formIsshow,title:e.titleContent,width:"500px"},on:{"update:visible":function(t){e.formIsshow=t}}},[a("el-form",{ref:"formData",attrs:{inline:!0,model:e.formData,rules:e.rules,size:"small","label-width":"120px"}},[a("el-form-item",{attrs:{label:"物理仓",prop:"warehouseId"}},[a("el-select",{staticStyle:{width:"250px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formData.warehouseId,callback:function(t){e.$set(e.formData,"warehouseId",t)},expression:"formData.warehouseId"}},e._l(e.warehouses,(function(e){return a("el-option",{key:e.warehouseId,attrs:{label:e.warehouseName,value:e.warehouseId}})})),1)],1),a("el-form-item",{attrs:{label:"逻辑仓编码",prop:"logicwarehouseCode"}},[a("el-input",{staticStyle:{width:"250px"},attrs:{placeholder:"请输入逻辑仓编码"},model:{value:e.formData.logicwarehouseCode,callback:function(t){e.$set(e.formData,"logicwarehouseCode",t)},expression:"formData.logicwarehouseCode"}})],1),a("el-form-item",{attrs:{label:"逻辑仓名称",prop:"logicwarehouseName"}},[a("el-input",{staticStyle:{width:"250px"},attrs:{placeholder:"请输入逻辑仓名称"},model:{value:e.formData.logicwarehouseName,callback:function(t){e.$set(e.formData,"logicwarehouseName",t)},expression:"formData.logicwarehouseName"}})],1),a("el-form-item",{attrs:{label:"类型",prop:"logicwarehouseType"}},[a("el-select",{staticStyle:{width:"250px"},attrs:{placeholder:"请选择"},model:{value:e.formData.logicwarehouseType,callback:function(t){e.$set(e.formData,"logicwarehouseType",t)},expression:"formData.logicwarehouseType"}},[a("el-option",{attrs:{value:"吉客云",label:"吉客云"}}),a("el-option",{attrs:{value:"京东云",label:"京东云"}}),a("el-option",{attrs:{value:"通天晓",label:"通天晓"}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.formIsshow=!1}}},[e._v("取消")]),a("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:e.addForm,expression:"addForm"}],attrs:{type:"primary"}},[e._v("确认")])],1)],1)],1)},s=[],i=a("eb0a"),r=i["a"],l=a("2877"),n=Object(l["a"])(r,o,s,!1,null,null,null);t["default"]=n.exports}}]);