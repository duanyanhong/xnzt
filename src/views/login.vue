<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="content-right">
        <img src="../assets/img/logo.png" style="height:100%;width:100%;" alt="">
      </div>
      <div v-if="loginForm===true" class="content-left">
        <div class="container">
          <div class="headline">
            <span style="font-size: 30px;font-weight: bold;">新鸟中台</span>
          </div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px" class="login-form">
            <div class="loginname">
              <span>用户账号</span>
              <input v-model="ruleForm.username" type="text" class="text" tabindex="1" placeholder="请输入用户账号" @keyup.enter="submitForm('ruleForm')">
            </div>
            <div class="loginpwd">
              <span>账号密码</span>
              <input v-model="ruleForm.password" type="password" class="text" tabindex="2" placeholder="请输入账号密码" @keyup.enter="submitForm('ruleForm')">
            </div>
            <div class="loginlzm">
              <span>验证码</span>
              <div class="input-group">
                <input v-model="ruleForm.captcha_code" type="text" class="text" tabindex="3" placeholder="请输入验证码" @keyup.enter="submitForm('ruleForm')">
                <div ref="" class="input-group-addon padding-0 reload-vify">
                  <img id="validateCodeImg" ref="code" :src="codeUrl" style="width:100%;height:100%;" @click="getCode()">
                </div>
              </div>
            </div>
            <div>
              <el-button type="primary" class="loginbtn1 submit-button" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div v-if="loginFormxg===true" class="content-left">
        <div class="container">
          <div class="headline">
            <img src="../assets/img/text_title.jpg" alt="">
          </div>
          <el-form ref="pwdForms" :model="pwdForms" :rules="prules" label-width="0px" class="login-form">
            <div class="old_pwd">
              <span>原密码</span>
              <input v-model="pwdForms.old_pwd" type="password" class="text" tabindex="1" placeholder="请输入原密码" @keyup.enter="pwdForm('pwdForms')">
            </div>
            <div class="user_pwd">
              <span>新密码</span>
              <input v-model="pwdForms.user_pwd" type="password" class="text" tabindex="2" placeholder="请输入新密码" @keyup.enter="pwdForm('pwdForms')">
            </div>
            <div class="confirm_pwd">
              <span>确认密码</span>
              <input v-model="pwdForms.confirm_pwd" type="password" class="text" tabindex="3" placeholder="请输入确认密码" @keyup.enter="pwdForm('pwdForms')">
            </div>
            <el-button type="primary" class="loginbtn submit-button" @click="pwdForm('pwdForms')">提交</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCodeImg } from '@/api/login'
  import qs from 'qs'
  export default {
    name: 'Login',
    data() {
      return {
        rules: {

        },
        ruleForm: {
          username: '',
          password: '',
          key_head: '',
          key_foot: '',
          loginKey: '',
          loginIv: '',
          captcha_code: '',
          loginId: ''
        },
        loginForm: true,
        loginFormnb: false,
        loginFormxg: false,
        redirect: undefined,
        codeUrl: '',
        sfimId: '',
        timer1: null,
        timer2: null
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const data = route.query
          if (data && data.redirect) {
            this.redirect = data.redirect
            delete data.redirect
            if (JSON.stringify(data) !== '{}') {
              this.redirect = this.redirect + '&' + qs.stringify(data, { indices: false })
            }
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.getCode()
      this.ruleForm.username = localStorage.getItem('username')
      this.ruleForm.password = localStorage.getItem('password')
    },
    methods: {
      getCode() {
        getCodeImg().then(res => {
          if(res){
            this.codeUrl = res.msgData.verifyCode
            this.ruleForm.loginId = res.msgData.loginId
            this.ruleForm.loginIv = res.msgData.loginIv
            this.ruleForm.loginKey = res.msgData.loginKey
          }
        })
      },
      submitForm() {
        var _this = this
        if (this.ruleForm.password === '' || this.ruleForm.username === '' || this.ruleForm.password === null || this.ruleForm.username === null) {
          this.$notify.error({
            title: '错误',
            message: '账号或密码不能为空',
            duration: 3000
          })
          return
        }
        if (this.ruleForm.captcha_code === '' || this.ruleForm.captcha_code === null) {
          this.$notify.error({
            title: '错误',
            message: '验证码不能为空',
            duration: 3000
          })
          return
        }
        localStorage.setItem('username', _this.ruleForm.username)
        localStorage.setItem('password', _this.ruleForm.password)
        let upwd = _this.ruleForm.password
        upwd=base64_encode(transferEncrypt(upwd,this.ruleForm.loginKey,this.ruleForm.loginIv));//eslint-disable-line
        let uid=base64_encode(transferEncrypt(_this.ruleForm.username,this.ruleForm.loginKey,this.ruleForm.loginIv));//eslint-disable-line
        const user = {
          username: uid,
          password: upwd,
          verifyCode: this.ruleForm.captcha_code,
          loginId: this.ruleForm.loginId
        }
        _this.$store.dispatch('Login', user).then(res => {
          if(!res){
            this.getCode()
            return
          }else{
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-wrap{
    width:100%;
    height:100%;
    background-image: url(../assets/img/bg.jpeg);
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  /* 登陆页面大盒子 */
  .login{
    width:100%;
    height: 100%;
  }
  /* content中间盒子*/
  .login-content{
    width: 1366px;
    height: 768px;
    background-color: #ffffff;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  /* 中间盒子右半form表单部分 */
  .content-left{
    float: left;
    width: 606px;
    height:768px ;
    background: #fff;
  }
  .container{
    margin: 0 auto;
    width: 360px;
    padding-top: 150px;
    border: 0;
  }
  /* 标题 */
  .content-left .headline{
    width: 100%;
  }
  /* 登陆名和密码 */
  .login-form{
    margin-top: 40px;
  }
  .login-form span{
    height: 16px;
    font-size: 14px;
    line-height: 16px;
    color: #333;
  }

  /* 登陆输入表单框 */
  .login-form .text{
    width: 360px;
    border: 0;
    border-bottom: solid 1px #ebebeb;
    font-size: 14px;
    padding:14px 0 12px ;
    margin-bottom: 34px;
    outline: none;
  }
  .text::-webkit-input-placeholder{
    color: #c6c6c6;
  }
  .input-group{
    position: relative;
  }
  .input-group-addon:last-child{
    position: absolute;
    right: 0;
    top: 0;
    width: 140px;
    height: 40px;
  }
  /* 登陆按钮 */
  .loginbtn{
    width: 360px;
    height: 48px;
    border-radius: 48px;
    background: linear-gradient( #febf32 , #fe8862);
    color: #fff !important;
    border: 0;
    font-size: 15px;
    letter-spacing: 5px;
    margin: 15px 0 35px;
    font-weight:900;
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, sans-serif;
    cursor:pointer;
  }
  .loginbtn1{
    width: 350px;
    height: 48px;
    border-radius: 48px;
    background: linear-gradient( #febf32 , #fe8862);
    color: #fff;
    border: 0;
    font-size: 15px;
    letter-spacing: 5px;
    margin: 15px 0 35px;
    font-weight:900;
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, sans-serif;
    cursor:pointer;
    margin-left: 20px;
  }
  .loginbtn1:hover{
    background: linear-gradient(#febf32, #fe8862);
  }
  .loginbtn1:focus{
    background: linear-gradient(#febf32, #fe8862);
  }
  .loginbtn1 span{
    color: #fff !important;
  }
  .loginbtn:hover{
    background: linear-gradient(#febf32, #fe8862);
  }
  .loginbtn:focus{
    background: linear-gradient(#febf32, #fe8862);
  }
  .loginbtn span{
    color: #fff !important;
  }
  /* 中间盒子左半图片部分 */
  .content-right{
    float: left;
    width: 760px;
    height: 768px;
  }
  .content-right img{
    display: block;
    width: 100%;
    height: 100%;
  }
  @media (max-width:1366px){

  }
</style>
