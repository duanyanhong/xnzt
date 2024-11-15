<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="login" style="margin-right: 5px;" />登录账号
                <div class="pull-right">{{ user.userAccount }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user1" style="margin-right: 5px;" />用户姓名
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" style="margin-right: 5px;" />手机号码
                <div class="pull-right">{{ user.mobileNo }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="dept" style="margin-right: 5px;" />公司名称
                <div class="pull-right">{{ user.companyName }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
            <el-tab-pane label="操作日志" name="operateLogs">
              <operateLogs/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import operateLogs from "./operateLogs";
import { getUserProfile  } from "@/api/system/user";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd ,operateLogs},
  data() {
    return {
      user: {},
      activeTab: "userinfo",
      detailInfo:[]
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.msgData.user;
      });
    },
  
  }
};
</script>
