(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a08d90c"],{"1e8b":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"姓名",prop:"userName"}},[o("el-input",{attrs:{maxlength:"30"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),o("el-form-item",{attrs:{label:"昵称",prop:"nickName"}},[o("el-input",{attrs:{maxlength:"30"},model:{value:e.form.nickName,callback:function(t){e.$set(e.form,"nickName",t)},expression:"form.nickName"}})],1),o("el-form-item",{attrs:{label:"手机号",prop:"mobileNo"}},[o("el-input",{attrs:{maxlength:"11"},model:{value:e.form.mobileNo,callback:function(t){e.$set(e.form,"mobileNo",t)},expression:"form.mobileNo"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.submit}},[e._v("保存")]),o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.close}},[e._v("关闭")])],1)],1)},r=[],a=o("c0c7"),i={props:{user:{type:Object}},data:function(){return{form:{},rules:{}}},watch:{user:{handler:function(e){e&&(this.form={nickName:e.nickName,userName:e.userName,mobileNo:e.mobileNo})}}},methods:{submit:function(){var e=this,t={userName:this.form.userName,nickName:this.form.nickName,mobileNo:this.form.mobileNo,accessToken:sessionStorage.getItem("xn_token")};Object(a["b"])(t).then((function(t){t&&(e.$modal.notifySuccess("修改成功"),e.user.userName=e.form.userName,e.user.nickName=e.form.nickName,e.user.mobileNo=e.form.mobileNo)}))},close:function(){this.$tab.closePage()}}},m=i,s=o("2877"),l=Object(s["a"])(m,n,r,!1,null,null,null);t["default"]=l.exports},c0c7:function(e,t,o){"use strict";o.d(t,"a",(function(){return r})),o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return i}));var n=o("b775");function r(){var e=sessionStorage.getItem("xn_token");return Object(n["a"])({url:"xnkj/login/login/refreshRole",method:"post",data:{accessToken:e}})}function a(e){return Object(n["a"])({url:"xnkj/login/login/updateInfo",method:"post",data:e})}function i(e){return Object(n["a"])({url:"xnkj/login/login/updatePwd",method:"post",data:e})}}}]);