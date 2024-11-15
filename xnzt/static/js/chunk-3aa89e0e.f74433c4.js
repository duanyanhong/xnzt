(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3aa89e0e"],{"266d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",[a("div",{staticClass:"head-container"},[a("div",[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",size:"small",placeholder:"输入部门名称搜索"},model:{value:t.searchData.departmentName,callback:function(e){t.$set(t.searchData,"departmentName",e)},expression:"searchData.departmentName"}}),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"success",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1)]),a("div",{staticClass:"crud-opts"},[a("span",{staticClass:"crud-opts-left"},[t._t("left"),a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["User:Department:Add"],expression:"['User:Department:Add']"}],staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus",plain:""},on:{click:t.addShow}},[t._v(" 新增 ")]),t._t("right")],2)]),a("u-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"plTable",attrs:{data:t.dataList,height:t.jsHeight,"use-virtual":"","row-height":50,stripe:"","header-cell-style":{background:"#f8f8f9",color:"#515a6e",fontSize:"13px",height:"45px",border:"none"},"cell-style":{border:"none"}}},[a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"companyName",label:"公司"}}),a("u-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"departmentName",label:"部门"}}),a("u-table-column",{attrs:{label:"禁用",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["是"==e.row.disable?a("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.row.disable))]):"否"==e.row.disable?a("el-tag",{attrs:{type:"success"}},[t._v(t._s(e.row.disable))]):t._e()]}}])}),a("u-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["User:Department:Edit"],expression:"['User:Department:Edit']"}],staticStyle:{width:"50px"},attrs:{size:"mini",type:"text",icon:"el-icon-edit"},on:{click:function(a){return t.editStaff(e.row)}}},[t._v("修改")]),"否"==e.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["User:Department:Disable"],expression:"['User:Department:Disable']"}],ref:"popover-"+e.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),t._v(" 确定禁用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.$refs["popover-"+e.$index].doClose()}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.editDisable(e)}}},[t._v("确定")])],1),a("el-button",{staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-lock",size:"mini"},slot:"reference"},[t._v("禁用")])],1):t._e(),"是"==e.row.disable?a("el-popover",{directives:[{name:"hasPermi",rawName:"v-hasPermi",value:["User:Department:Disable"],expression:"['User:Department:Disable']"}],ref:"popover-"+e.$index,attrs:{placement:"top",width:"200"}},[a("p",{staticStyle:{"line-height":"40px"}},[a("i",{staticClass:"el-icon-info",staticStyle:{color:"rgb(255,153,0)"}}),t._v(" 确定启用吗？")]),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(a){t.$refs["popover-"+e.$index].doClose()}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.editDisable(e)}}},[t._v("确定")])],1),a("el-button",{staticClass:"el-button--success",staticStyle:{width:"50px"},attrs:{slot:"reference",type:"text",icon:"el-icon-unlock",size:"mini"},slot:"reference"},[t._v("启用")])],1):t._e()]}}])})],1),a("pagination",{attrs:{limit:t.searchData.limit,page:t.searchData.page,total:t.total,"page-sizes":t.pageSizes},on:{"update:limit":function(e){return t.$set(t.searchData,"limit",e)},"update:page":function(e){return t.$set(t.searchData,"page",e)},"update:pageSizes":function(e){t.pageSizes=e},"update:page-sizes":function(e){t.pageSizes=e},pagination:t.loadData}})],1)],1),a("el-dialog",{attrs:{"append-to-body":"","close-on-click-modal":!1,visible:t.formIsshow,title:t.titleContent,width:"450px"},on:{"update:visible":function(e){t.formIsshow=e}}},[a("el-form",{ref:"formData",attrs:{inline:!0,model:t.formData,rules:t.rules,size:"small","label-width":"80px"}},[a("el-form-item",{attrs:{label:"公司",prop:"companyId"}},[a("el-select",{staticStyle:{width:"300px"},attrs:{placeholder:"请选择"},model:{value:t.formData.companyId,callback:function(e){t.$set(t.formData,"companyId",e)},expression:"formData.companyId"}},t._l(t.companies,(function(t){return a("el-option",{key:t.companyId,attrs:{label:t.companyName,value:t.companyId}})})),1)],1),a("el-form-item",{attrs:{label:"部门名称",prop:"departmentName"}},[a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入部门名称"},model:{value:t.formData.departmentName,callback:function(e){t.$set(t.formData,"departmentName",e)},expression:"formData.departmentName"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"text"},on:{click:function(e){t.formIsshow=!1}}},[t._v("取消")]),a("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:t.addForm,expression:"addForm"}],attrs:{type:"primary"}},[t._v("确认")])],1)],1)],1)},s=[],n=a("e353"),r=n["a"],o=a("2877"),l=Object(o["a"])(r,i,s,!1,null,null,null);e["default"]=l.exports},a4cb:function(t,e,a){"use strict";a.d(e,"d",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return o}));var i=a("b775");function s(t){return Object(i["a"])({url:"xnkj/user/department/departmentList",method:"post",data:t})}function n(t){return Object(i["a"])({url:"xnkj/user/department/editDepartment",method:"post",data:t})}function r(t){return Object(i["a"])({url:"xnkj/user/department/addDepartment",method:"post",data:t})}function o(t){return Object(i["a"])({url:"xnkj/user/department/disableDepartment",method:"post",data:t})}},e353:function(t,e,a){"use strict";(function(t){var i=a("a4cb");e["a"]={name:"Department",data:function(){return{rules:{companyId:[{required:!0,message:"请选择公司",trigger:"change"}],departmentName:[{required:!0,message:"请输入部门名称",trigger:"blur"}]},searchData:{departmentName:"",limit:20,page:1,accessToken:sessionStorage.getItem("xn_token")},pageSizes:[20,50,100],dataList:[],total:0,loading:!1,formIsshow:!1,formData:{id:"",companyId:"",departmentName:"",accessToken:sessionStorage.getItem("xn_token")},jsHeight:500,editStatus:!1,titleContent:"管理部门",companies:[]}},mounted:function(){this.loadData()},activated:function(){var t=this;this.$nextTick((function(){t.$refs.plTable.doLayout()}))},methods:{loadData:function(){var e=this;this.loading=!0,Object(i["d"])(this.searchData).then((function(a){a&&(e.loading=!1,e.dataList=a.msgData.list.items,e.total=a.msgData.list.total,e.companies=a.msgData.companies,e.jsHeight=window.innerHeight-t(".head-container").outerHeight()-t(".crud-opts").outerHeight()-180)}))},search:function(){this.page=1,this.loadData()},addShow:function(){this.editStatus=!1,void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData.companyId="",this.formData.departmentName="",this.formIsshow=!0},addForm:function(){var t=this;this.$refs["formData"].validate((function(e){if(!e)return!1;var a=t;a.editStatus?Object(i["c"])(a.formData).then((function(t){t&&(a.formIsshow=!1,a.$modal.notifySuccess(t.errMsg),a.loadData())})):Object(i["a"])(a.formData).then((function(t){t&&(a.formIsshow=!1,a.$modal.notifySuccess(t.errMsg),a.loadData())}))}))},editStaff:function(t){void 0!==this.$refs["formData"]&&this.$refs["formData"].resetFields(),this.formData.id=t.id,this.formData.companyId=t.companyId,this.formData.departmentName=t.departmentName,this.editStatus=!0,this.formIsshow=!0},editDisable:function(t){var e=this;this.$refs["popover-".concat(t.$index)].doClose();var a={id:t.row.id,accessToken:sessionStorage.getItem("xn_token")};Object(i["b"])(a).then((function(t){t&&(e.$modal.notifySuccess(t.errMsg),e.loadData())}))}}}}).call(this,a("1157"))}}]);