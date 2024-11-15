<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPass">
      <el-input v-model="user.oldPass" placeholder="请输入旧密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="user.newPass" placeholder="请输入新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPass">
      <el-input v-model="user.confirmPass" placeholder="请确认新密码" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
    const confirmPass = (rule, value, callback) => {
      if (value) {
        if (this.user.newPass !== value) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码'))
      }
    }
    return {
      user: {
        oldPass: undefined,
        newPass: undefined,
        confirmPass: undefined
      },
      // 表单校验
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: confirmPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            const data = {
              oldPwd: this.user.oldPass,
              newPwd: this.user.newPass,
              confirmPwd: this.user.confirmPass,
              accessToken: sessionStorage.getItem('xn_token')
            }
            updateUserPwd(data).then(res => {
              if(res){
                this.$modal.notifySuccess("修改成功");
                this.user.oldPass=''
                this.user.newPass=''
                this.user.confirmPass=''
              }
            });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>
