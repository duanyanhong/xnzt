<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="姓名" prop="userName">
      <el-input v-model="form.userName" maxlength="30" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="form.nickName" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号" prop="mobileNo">
      <el-input v-model="form.mobileNo" maxlength="11" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  watch: {
    user: {
      handler(user) {
        if (user) {
          this.form = { nickName: user.nickName, userName: user.userName, mobileNo: user.mobileNo};
        }
      }
    }
  },
  methods: {
    submit() {
        const data = {
          userName: this.form.userName,
          nickName: this.form.nickName,
          mobileNo: this.form.mobileNo,
          accessToken: sessionStorage.getItem('xn_token')
        }
        updateUserProfile(data).then(res => {
          if(res){
            this.$modal.notifySuccess("修改成功");
            this.user.userName = this.form.userName;
            this.user.nickName = this.form.nickName;
            this.user.mobileNo = this.form.mobileNo;
          }
        });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>
