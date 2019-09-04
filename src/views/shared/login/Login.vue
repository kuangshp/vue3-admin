<template>
  <div class="login">
    <div class="login-panel">
      <div class="log-img">admin管理平台</div>
      <el-form
        :model="loginForm"
        ref="loginForm"
        class="demo-dynamic"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]"
        >
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="login-btn"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { authToken, currentUser } from '@/config';
import { Action } from 'vuex-class';
import { storage } from '@/utils';

@Component({})
export default class Login extends Vue {
  @Action('login/loginApi') private loginApi!: (postData: { name: string, password: string }) => Promise<any>;

  private loginForm: { [propsName: string]: any } = {
    email: '',
    password: '',
  };
  private submitForm(formType: string): void {
    (this.$refs[formType] as any).validate(async (valid: boolean) => {
      if (valid) {
        const postData = { name: this.loginForm.email, password: this.loginForm.password };
        const { code, result: { data: { token } }, message } = await this.loginApi(postData);
        if (code === 0) {
          // 设置本地存储
          storage.setItem(authToken, token);
          storage.setItem(currentUser, this.loginForm.email);
          if (this.$route.query.backUrl) {
            this.$router.push((this.$route.query as any).backUrl);
          } else {
            this.$router.push('/');
          }
        } else {
          console.log(message);
        }
      } else {
        return false;
      }
    });
  }
}
</script>
<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  background: #2680ca;
}
.login-panel {
  width: 350px;
  height: 330px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 20px;
  position: absolute;
  background: #fff;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .log-img {
    width: inherit;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
    // background: cyan;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
