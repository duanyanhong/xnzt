(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d63c2a2"],{"46bc":function(e,t,a){"use strict";a.d(t,"d",(function(){return r})),a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}));var o=a("b775");function r(e){return Object(o["a"])({url:"xnkj/base/owner/ownerList",method:"post",data:e})}function l(e){return Object(o["a"])({url:"xnkj/base/owner/editOwner",method:"post",data:e})}function s(e){return Object(o["a"])({url:"xnkj/base/owner/addOwner",method:"post",data:e})}function i(e){return Object(o["a"])({url:"xnkj/base/owner/disableOwner",method:"post",data:e})}},bb5b:function(e,t,a){"use strict";(function(e){var o=a("46bc");t["a"]={name:"Owner",data:function(){return{rules:{ownerCode:[{required:!0,message:"请输入货主编码",trigger:"blur"}],ownerName:[{required:!0,message:"请输入货主名称",trigger:"blur"}],aliasName:[{required:!0,message:"请输入货主别名",trigger:"blur"}],contactName:[{required:!0,trigger:"blur",message:"请输入联系人"}],contactPhone:[{required:!0,message:"请输入联系人电话号码",trigger:"blur"}],contactMobile:[{required:!0,message:"请输入联系人手机号码",trigger:"blur"}],sendAddress:[{required:!0,message:"请输入发货地址",trigger:"blur"}],erpBatch:[{required:!0,message:"请选择",trigger:"change"}],wmsBatch:[{required:!0,message:"请选择",trigger:"change"}],timeConvert:[{required:!0,message:"请输入时间转换率",trigger:"blur"}],volumeConvert:[{required:!0,message:"请输入体积转换率",trigger:"blur"}],weightConvert:[{required:!0,message:"请输入重量转换率",trigger:"blur"}],sizeConvert:[{required:!0,message:"请输入尺寸(长宽高)转换率",trigger:"blur"}],examineId:[{required:!0,message:"请选择",trigger:"change"}],ownerSource:[{required:!0,message:"请选择",trigger:"change"}],ownerSystem:[{required:!0,message:"请选择",trigger:"change"}],stocktakingNotice:[{required:!0,message:"请选择",trigger:"change"}]},searchData:{ownerCode:"",ownerName:"",limit:20,page:1,accessToken:sessionStorage.getItem("xn_token")},pageSizes:[20,50,100],dataList:[],total:0,loading:!1,formIsshow:!1,formData:{id:"",ownerCode:"",ownerName:"",aliasName:"",contactName:"",contactPhone:"",contactMobile:"",sendAddress:"",erpBatch:"",wmsBatch:"",timeConvert:"",volumeConvert:"",weightConvert:"",sizeConvert:"",examineId:"",ownerSource:"",ownerSystem:"",stocktakingNotice:"",appkey:"",accessToken:sessionStorage.getItem("xn_token")},jsHeight:500,editStatus:!1,titleContent:"管理货主",examines:[]}},mounted:function(){this.loadData()},activated:function(){var e=this;this.$nextTick((function(){e.$refs.plTable.doLayout()}))},methods:{loadData:function(){var t=this;this.loading=!0,Object(o["d"])(this.searchData).then((function(a){a&&(t.loading=!1,t.dataList=a.msgData.list.items,t.total=a.msgData.list.total,t.examines=a.msgData.examines,t.jsHeight=window.innerHeight-e(".head-container").outerHeight()-e(".crud-opts").outerHeight()-180)}))},search:function(){this.page=1,this.loadData()},addShow:function(){for(var e in this.editStatus=!1,void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData)"accessToken"!=e&&(this.formData[e]="");this.formIsshow=!0},addForm:function(){var e=this;this.$refs["formData"].validate((function(t){if(!t)return!1;var a=e;a.editStatus?Object(o["c"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())})):Object(o["a"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())}))}))},editStaff:function(e){for(var t in void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData)"accessToken"!=t&&(this.formData[t]=e[t]);this.editStatus=!0,this.formIsshow=!0},editDisable:function(e){var t=this;this.$refs["popover-".concat(e.$index)].doClose();var a={id:e.row.id,accessToken:sessionStorage.getItem("xn_token")};Object(o["b"])(a).then((function(e){e&&(t.$modal.notifySuccess(e.errMsg),t.loadData())}))}}}}).call(this,a("1157"))},c526:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",[a("div",{staticClass:"head-container"},[a("div",[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入货主编码搜索"},model:{value:e.searchData.ownerCode,callback:function(t){e.$set(e.searchData,"ownerCode",t)},expression:"searchData.ownerCode"}}),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入货主名称搜索"},model:{value:e.searchData.ownerName,callback:function(t){e.$set(e.searchData,"ownerName",t)},expression:"searchData.ownerName"}}),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")])],1)]),a("div",{staticClass:"crud-opts"},[a("span",{staticClass:"crud-opts-left"},[e._t("left"),a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Owner:Add"],expression:"['Base:Owner:Add']"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus",plain:""},on:{click:e.addShow}},[e._v(" 新增 ")]),e._t("right")],2)]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"plTable",attrs:{data:e.dataList,height:e.jsHeight,"use-virtual":"","row-height":50,stripe:"","header-cell-style":{background:"#f8f8f9",color:"#515a6e",fontSize:"13px",height:"45px",border:"none"},"cell-style":{border:"none"}}},[a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerCode",label:"货主编码"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerName",label:"货主名称"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"aliasName",label:"货主别名"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"contactName",label:"联系人"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"contactPhone",label:"电话号码"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"contactMobile",label:"手机号码"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"sendAddress",label:"发货地址"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"erpBatch",label:"ERP批次"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"wmsBatch",label:"WMS批次"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"stocktakingNotice",label:"盘点通知"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"timeConvert",width:"100",label:"时间转换率"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"volumeConvert",width:"100",label:"体积转换率"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"weightConvert",width:"100",label:"重量转换率"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"sizeConvert",width:"100",label:"长宽高转换率"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"examineName",label:"审单流程"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerSource",label:"货主来源"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerSystem",label:"系统类别"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"appkey",label:"appkey"}}),a("u-table-column",{attrs:{label:"禁用",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["是"==t.row.disable?a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(t.row.disable))]):"否"==t.row.disable?a("el-tag",{attrs:{type:"success"}},[e._v(e._s(t.row.disable))]):e._e()]}}])}),a("u-table-column",{attrs:{label:"操作",width:"185",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Owner:Edit"],expression:"['Base:Owner:Edit']"}],staticStyle:{width:"50px"},attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.editStaff(t.row)}}},[e._v("修改")]),"否"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Owner:Disable"],expression:"['Base:Owner:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定禁用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-lock",size:"mini"},slot:"reference"},[e._v("禁用")])],1):e._e(),"是"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Owner:Disable"],expression:"['Base:Owner:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定启用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticClass:"el-button--success",staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-unlock",size:"mini"},slot:"reference"},[e._v("启用")])],1):e._e()]}}])})],1),a("pagination",{attrs:{limit:e.searchData.limit,page:e.searchData.page,total:e.total,"page-sizes":e.pageSizes},on:{"update:limit":function(t){return e.$set(e.searchData,"limit",t)},"update:page":function(t){return e.$set(e.searchData,"page",t)},"update:pageSizes":function(t){e.pageSizes=t},"update:page-sizes":function(t){e.pageSizes=t},pagination:e.loadData}})],1)],1),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,visible:e.formIsshow,title:e.titleContent,width:"700px"},on:{"update:visible":function(t){e.formIsshow=t}}},[a("el-form",{ref:"formData",attrs:{inline:!0,model:e.formData,rules:e.rules,size:"small","label-width":"120px"}},[a("el-form-item",{attrs:{label:"货主编码",prop:"ownerCode"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入货主编码"},model:{value:e.formData.ownerCode,callback:function(t){e.$set(e.formData,"ownerCode",t)},expression:"formData.ownerCode"}})],1),a("el-form-item",{attrs:{label:"货主名称",prop:"ownerName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入货主名称"},model:{value:e.formData.ownerName,callback:function(t){e.$set(e.formData,"ownerName",t)},expression:"formData.ownerName"}})],1),a("el-form-item",{attrs:{label:"货主别名",prop:"aliasName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入货主别名"},model:{value:e.formData.aliasName,callback:function(t){e.$set(e.formData,"aliasName",t)},expression:"formData.aliasName"}})],1),a("el-form-item",{attrs:{label:"联系人",prop:"contactName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入联系人"},model:{value:e.formData.contactName,callback:function(t){e.$set(e.formData,"contactName",t)},expression:"formData.contactName"}})],1),a("el-form-item",{attrs:{label:"电话号码",prop:"contactPhone"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入电话号码"},model:{value:e.formData.contactPhone,callback:function(t){e.$set(e.formData,"contactPhone",t)},expression:"formData.contactPhone"}})],1),a("el-form-item",{attrs:{label:"手机号码",prop:"contactMobile"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入手机号码"},model:{value:e.formData.contactMobile,callback:function(t){e.$set(e.formData,"contactMobile",t)},expression:"formData.contactMobile"}})],1),a("el-form-item",{attrs:{label:"发货地址",prop:"sendAddress"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入发货地址"},model:{value:e.formData.sendAddress,callback:function(t){e.$set(e.formData,"sendAddress",t)},expression:"formData.sendAddress"}})],1),a("el-form-item",{attrs:{label:"ERP批次",prop:"erpBatch"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.erpBatch,callback:function(t){e.$set(e.formData,"erpBatch",t)},expression:"formData.erpBatch"}},[a("el-option",{attrs:{value:"是",label:"是"}}),a("el-option",{attrs:{value:"否",label:"否"}})],1)],1),a("el-form-item",{attrs:{label:"WMS批次",prop:"wmsBatch"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.wmsBatch,callback:function(t){e.$set(e.formData,"wmsBatch",t)},expression:"formData.wmsBatch"}},[a("el-option",{attrs:{value:"是",label:"是"}}),a("el-option",{attrs:{value:"否",label:"否"}})],1)],1),a("el-form-item",{attrs:{label:"盘点通知",prop:"stocktakingNotice"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.stocktakingNotice,callback:function(t){e.$set(e.formData,"stocktakingNotice",t)},expression:"formData.stocktakingNotice"}},[a("el-option",{attrs:{value:"是",label:"是"}}),a("el-option",{attrs:{value:"否",label:"否"}})],1)],1),a("el-form-item",{attrs:{label:"时间转换率",prop:"timeConvert"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入时间转换率"},model:{value:e.formData.timeConvert,callback:function(t){e.$set(e.formData,"timeConvert",t)},expression:"formData.timeConvert"}})],1),a("el-form-item",{attrs:{label:"体积转换率",prop:"volumeConvert"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入体积转换率"},model:{value:e.formData.volumeConvert,callback:function(t){e.$set(e.formData,"volumeConvert",t)},expression:"formData.volumeConvert"}})],1),a("el-form-item",{attrs:{label:"重量转换率",prop:"weightConvert"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入重量转换率"},model:{value:e.formData.weightConvert,callback:function(t){e.$set(e.formData,"weightConvert",t)},expression:"formData.weightConvert"}})],1),a("el-form-item",{attrs:{label:"长宽高转换率",prop:"sizeConvert"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入长宽高转换率"},model:{value:e.formData.sizeConvert,callback:function(t){e.$set(e.formData,"sizeConvert",t)},expression:"formData.sizeConvert"}})],1),a("el-form-item",{attrs:{label:"审单流程",prop:"examineId"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.examineId,callback:function(t){e.$set(e.formData,"examineId",t)},expression:"formData.examineId"}},e._l(e.examines,(function(e){return a("el-option",{key:e.examineId,attrs:{label:e.examineName,value:e.examineId}})})),1)],1),a("el-form-item",{attrs:{label:"货主来源",prop:"ownerSource"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.ownerSource,callback:function(t){e.$set(e.formData,"ownerSource",t)},expression:"formData.ownerSource"}},[a("el-option",{attrs:{value:"奇门",label:"奇门"}}),a("el-option",{attrs:{value:"网关",label:"网关"}})],1)],1),a("el-form-item",{attrs:{label:"货主系统类别",prop:"ownerSystem"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.ownerSystem,callback:function(t){e.$set(e.formData,"ownerSystem",t)},expression:"formData.ownerSystem"}},[a("el-option",{attrs:{value:"E店宝",label:"E店宝"}}),a("el-option",{attrs:{value:"网店管家",label:"网店管家"}}),a("el-option",{attrs:{value:"吉客云",label:"吉客云"}}),a("el-option",{attrs:{value:"其它",label:"其它"}})],1)],1),a("el-form-item",{attrs:{label:"appkey",prop:"appkey"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入appkey"},model:{value:e.formData.appkey,callback:function(t){e.$set(e.formData,"appkey",t)},expression:"formData.appkey"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.formIsshow=!1}}},[e._v("取消")]),a("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:e.addForm,expression:"addForm"}],attrs:{type:"primary"}},[e._v("确认")])],1)],1)],1)},r=[],l=a("bb5b"),s=l["a"],i=a("2877"),n=Object(i["a"])(s,o,r,!1,null,null,null);t["default"]=n.exports}}]);