(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-901922c8"],{"414c":function(e,t,a){"use strict";a.d(t,"f",(function(){return r})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return l})),a.d(t,"b",(function(){return n})),a.d(t,"e",(function(){return i})),a.d(t,"g",(function(){return c})),a.d(t,"d",(function(){return p}));var o=a("b775");function r(e){return Object(o["a"])({url:"xnkj/base/shop/shopList",method:"post",data:e})}function s(e){return Object(o["a"])({url:"xnkj/base/shop/editShop",method:"post",data:e})}function l(e){return Object(o["a"])({url:"xnkj/base/shop/addShop",method:"post",data:e})}function n(e){return Object(o["a"])({url:"xnkj/base/shop/disableShop",method:"post",data:e})}function i(e){return Object(o["a"])({url:"xnkj/base/shop/getDepartment",method:"post",data:e})}function c(e){return Object(o["a"])({url:"xnkj/base/shop/importShop",headers:{"Content-Type":"multipart/form-data"},method:"post",data:e})}function p(e){return Object(o["a"])({url:"xnkj/base/shop/exportShop",method:"post",data:e})}},"4f06":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",[a("div",{staticClass:"head-container"},[a("div",[a("el-input",{staticClass:"order-input",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入店铺编码搜索"},model:{value:e.searchData.shopCode,callback:function(t){e.$set(e.searchData,"shopCode",t)},expression:"searchData.shopCode"}}),a("el-input",{staticClass:"order-input",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入店铺名称搜索"},model:{value:e.searchData.shopName,callback:function(t){e.$set(e.searchData,"shopName",t)},expression:"searchData.shopName"}}),a("el-select",{staticClass:"order-input",staticStyle:{width:"350px"},attrs:{clearable:"",size:"small",placeholder:"货主",multiple:"","collapse-tags":"",filterable:""},model:{value:e.searchData.ownerId,callback:function(t){e.$set(e.searchData,"ownerId",t)},expression:"searchData.ownerId"}},e._l(e.owner,(function(e,t){return a("el-option",{key:e.ownerId,attrs:{label:e.ownerName,value:e.ownerId}})})),1),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:e.search}},[e._v("搜索")])],1)]),a("div",{staticClass:"crud-opts"},[a("span",{staticClass:"crud-opts-left"},[e._t("left"),a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Add"],expression:"['Base:Shop:Add']"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus",plain:""},on:{click:e.addShow}},[e._v(" 新增 ")]),e._t("right")],2),a("span",{staticClass:"crud-opts-left"},[e._t("left"),a("el-upload",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Import"],expression:"['Base:Shop:Import']"}],staticClass:"inline-block",attrs:{"show-file-list":!1,"http-request":e.uploadSuccess,accept:".xlsx,.xls,.csv",action:"#"}},[a("el-button",{attrs:{type:"success",plain:"",icon:"el-icon-upload2",size:"mini"}},[e._v("导入")])],1)],2),a("span",{staticClass:"crud-opts-left"},[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Export"],expression:"['Base:Shop:Export']"}],staticClass:"filter-item",attrs:{size:"mini",type:"warning",icon:"el-icon-download",plain:""},on:{click:e.downMyOrder}},[e._v("导出")])],1)]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"plTable",attrs:{data:e.dataList,height:e.jsHeight,"use-virtual":"","row-height":50,stripe:"","header-cell-style":{background:"#f8f8f9",color:"#515a6e",fontSize:"13px",height:"45px",border:"none"},"cell-style":{border:"none"}}},[a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ownerName",label:"货主"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"companyName",label:"公司"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"departmentName",label:"部门"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"platformName",label:"销售平台"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"shopCode",label:"店铺编码"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"shopName",label:"店铺名称"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"shopType",label:"店铺类型"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"channelType",label:"渠道分类"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"settlementType",label:"结算方式"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"contactName",label:"负责人"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"contactMobile",label:"手机号"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"returnType",label:"回传方式"}}),a("u-table-column",{attrs:{label:"禁用",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return["是"==t.row.disable?a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(t.row.disable))]):"否"==t.row.disable?a("el-tag",{attrs:{type:"success"}},[e._v(e._s(t.row.disable))]):e._e()]}}])}),a("u-table-column",{attrs:{label:"操作",width:"185",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Edit"],expression:"['Base:Shop:Edit']"}],staticStyle:{width:"50px"},attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(a){return e.editStaff(t.row)}}},[e._v("修改")]),"否"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Disable"],expression:"['Base:Shop:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定禁用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-lock",size:"mini"},slot:"reference"},[e._v("禁用")])],1):e._e(),"是"==t.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["Base:Shop:Disable"],expression:"['Base:Shop:Disable']"}],ref:"popover-"+t.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),e._v(" 确定启用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){e.$refs["popover-"+t.$index].doClose()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.editDisable(t)}}},[e._v("确定")])],1),a("el-button",{staticClass:"el-button--success",staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-unlock",size:"mini"},slot:"reference"},[e._v("启用")])],1):e._e()]}}])})],1),a("pagination",{attrs:{limit:e.searchData.limit,page:e.searchData.page,total:e.total,"page-sizes":e.pageSizes},on:{"update:limit":function(t){return e.$set(e.searchData,"limit",t)},"update:page":function(t){return e.$set(e.searchData,"page",t)},"update:pageSizes":function(t){e.pageSizes=t},"update:page-sizes":function(t){e.pageSizes=t},pagination:e.loadData}})],1)],1),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,visible:e.formIsshow,title:e.titleContent,width:"720px"},on:{"update:visible":function(t){e.formIsshow=t}}},[a("el-form",{ref:"formData",attrs:{inline:!0,model:e.formData,rules:e.rules,size:"small","label-width":"120px"}},[a("el-form-item",{attrs:{label:"货主",prop:"ownerId"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.ownerId,callback:function(t){e.$set(e.formData,"ownerId",t)},expression:"formData.ownerId"}},e._l(e.owner,(function(e){return a("el-option",{key:e.ownerId,attrs:{label:e.ownerName,value:e.ownerId}})})),1)],1),a("el-form-item",{attrs:{label:"公司",prop:"companyId"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},on:{change:e.getDepartment},model:{value:e.formData.companyId,callback:function(t){e.$set(e.formData,"companyId",t)},expression:"formData.companyId"}},e._l(e.company,(function(e){return a("el-option",{key:e.companyId,attrs:{label:e.companyName,value:e.companyId}})})),1)],1),a("el-form-item",{attrs:{label:"部门",prop:"departmentId"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.departmentId,callback:function(t){e.$set(e.formData,"departmentId",t)},expression:"formData.departmentId"}},e._l(e.department,(function(e){return a("el-option",{key:e.departmentId,attrs:{label:e.departmentName,value:e.departmentId}})})),1)],1),a("el-form-item",{attrs:{label:"销售平台",prop:"platformId"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.platformId,callback:function(t){e.$set(e.formData,"platformId",t)},expression:"formData.platformId"}},e._l(e.platform,(function(e){return a("el-option",{key:e.platformId,attrs:{label:e.platformName,value:e.platformId}})})),1)],1),a("el-form-item",{attrs:{label:"店铺编码",prop:"shopCode"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入店铺编码"},model:{value:e.formData.shopCode,callback:function(t){e.$set(e.formData,"shopCode",t)},expression:"formData.shopCode"}})],1),a("el-form-item",{attrs:{label:"店铺名称",prop:"shopName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入店铺名称"},model:{value:e.formData.shopName,callback:function(t){e.$set(e.formData,"shopName",t)},expression:"formData.shopName"}})],1),a("el-form-item",{attrs:{label:"店铺类型",prop:"shopType"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.shopType,callback:function(t){e.$set(e.formData,"shopType",t)},expression:"formData.shopType"}},[a("el-option",{attrs:{value:"直营网店",label:"直营网店"}}),a("el-option",{attrs:{value:"虚拟网店",label:"虚拟网店"}})],1)],1),a("el-form-item",{attrs:{label:"渠道分类",prop:"channelType"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入渠道分类"},model:{value:e.formData.channelType,callback:function(t){e.$set(e.formData,"channelType",t)},expression:"formData.channelType"}})],1),a("el-form-item",{attrs:{label:"结算方式",prop:"settlementType"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.settlementType,callback:function(t){e.$set(e.formData,"settlementType",t)},expression:"formData.settlementType"}},[a("el-option",{attrs:{value:"日结付款",label:"日结付款"}}),a("el-option",{attrs:{value:"周结付款",label:"周结付款"}}),a("el-option",{attrs:{value:"月结付款",label:"月结付款"}})],1)],1),a("el-form-item",{attrs:{label:"回传方式",prop:"returnType"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:e.formData.returnType,callback:function(t){e.$set(e.formData,"returnType",t)},expression:"formData.returnType"}},[a("el-option",{attrs:{value:"不回传",label:"不回传"}}),a("el-option",{attrs:{value:"整单发货回传",label:"整单发货回传"}}),a("el-option",{attrs:{value:"部分发货回传",label:"部分发货回传"}})],1)],1),a("el-form-item",{attrs:{label:"负责人",prop:"contactName"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入负责人"},model:{value:e.formData.contactName,callback:function(t){e.$set(e.formData,"contactName",t)},expression:"formData.contactName"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"contactMobile"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入手机号"},model:{value:e.formData.contactMobile,callback:function(t){e.$set(e.formData,"contactMobile",t)},expression:"formData.contactMobile"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.formIsshow=!1}}},[e._v("取消")]),a("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:e.addForm,expression:"addForm"}],attrs:{type:"primary"}},[e._v("确认")])],1)],1)],1)},r=[],s=a("8930"),l=s["a"],n=a("2877"),i=Object(n["a"])(l,o,r,!1,null,null,null);t["default"]=i.exports},8930:function(e,t,a){"use strict";(function(e){var o=a("414c");t["a"]={name:"Shop",data:function(){return{rules:{ownerId:[{required:!0,message:"请选择",trigger:"change"}],departmentId:[{required:!0,message:"请选择",trigger:"change"}],companyId:[{required:!0,message:"请选择",trigger:"change"}],shopType:[{required:!0,message:"请选择",trigger:"change"}],settlementType:[{required:!0,message:"请选择",trigger:"change"}],platformId:[{required:!0,message:"请选择",trigger:"change"}],shopCode:[{required:!0,message:"请输入店铺编码",trigger:"blur"}],shopName:[{required:!0,message:"请输入店铺名称",trigger:"blur"}],returnType:[{required:!0,message:"请选择",trigger:"change"}],channelType:[{required:!0,trigger:"blur",message:"请输入渠道分类"}],contactName:[{required:!0,message:"请输入负责人",trigger:"blur"}],contactMobile:[{required:!0,message:"请输入手机号",trigger:"blur"}]},searchData:{shopCode:"",shopName:"",ownerId:[],limit:20,page:1,accessToken:sessionStorage.getItem("xn_token")},pageSizes:[20,50,100],dataList:[],total:0,loading:!1,formIsshow:!1,formData:{id:"",ownerId:"",departmentId:"",companyId:"",shopCode:"",shopName:"",returnType:"",shopType:"",channelType:"",settlementType:"",contactName:"",contactMobile:"",platformId:"",accessToken:sessionStorage.getItem("xn_token")},jsHeight:500,editStatus:!1,titleContent:"管理店铺",owner:[],company:[],department:[],platform:[]}},mounted:function(){this.loadData()},activated:function(){var e=this;this.$nextTick((function(){e.$refs.plTable.doLayout()}))},methods:{loadData:function(){var t=this;this.loading=!0,Object(o["f"])(this.searchData).then((function(a){a&&(t.loading=!1,t.dataList=a.msgData.list.items,t.total=a.msgData.list.total,t.owner=a.msgData.owners,t.company=a.msgData.companies,t.platform=a.msgData.platforms,t.jsHeight=window.innerHeight-e(".head-container").outerHeight()-e(".crud-opts").outerHeight()-180)}))},search:function(){this.page=1,this.loadData()},addShow:function(){for(var e in this.editStatus=!1,void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData)"accessToken"!=e&&(this.formData[e]="");this.department=[],this.formIsshow=!0},addForm:function(){var e=this;this.$refs["formData"].validate((function(t){if(!t)return!1;var a=e;a.editStatus?Object(o["c"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())})):Object(o["a"])(a.formData).then((function(e){e&&(a.formIsshow=!1,a.$modal.notifySuccess(e.errMsg),a.loadData())}))}))},editStaff:function(e){var t=this;void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields();var a={companyId:e.companyId,accessToken:sessionStorage.getItem("xn_token")};Object(o["e"])(a).then((function(a){if(a){for(var o in t.department=a.msgData.departments,t.formData)"accessToken"!=o&&(t.formData[o]=e[o]);t.editStatus=!0,t.formIsshow=!0}}))},editDisable:function(e){var t=this;this.$refs["popover-".concat(e.$index)].doClose();var a={id:e.row.id,accessToken:sessionStorage.getItem("xn_token")};Object(o["b"])(a).then((function(e){e&&(t.$modal.notifySuccess(e.errMsg),t.loadData())}))},uploadSuccess:function(e){var t=this;this.loading=!0;var a=new FormData;a.append("file",e.file),a.append("accessToken",sessionStorage.getItem("xn_token")),Object(o["g"])(a).then((function(e){t.loading=!1,e&&(t.$modal.notifySuccess(e.errMsg),void 0!==e.msgData.downloadUrl&&""!==e.msgData.downloadUrl&&(window.location.href=e.msgData.downloadUrl),t.loadData())}))},downMyOrder:function(){var e=this;this.loading=!0,Object(o["d"])(this.searchData).then((function(t){e.loading=!1,t&&(e.$modal.notifySuccess(t.errMsg),void 0!==t.msgData.downloadUrl&&""!==t.msgData.downloadUrl&&(window.location.href=t.msgData.downloadUrl),e.loadData())}))},getDepartment:function(){var e=this,t={companyId:this.formData.companyId,accessToken:sessionStorage.getItem("xn_token")};Object(o["e"])(t).then((function(t){t&&(e.formData.departmentId="",e.department=t.msgData.departments)}))}}}}).call(this,a("1157"))}}]);