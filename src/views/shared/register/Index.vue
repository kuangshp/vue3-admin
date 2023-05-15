<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">基于区块链的数据交易平台</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </div>
      </el-form>
      <router-link to="/login" class="register">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import { authToken } from '@/config';
import { storage } from '@/utils';
import { mapMutations, mapActions } from 'vuex';
import * as types from '@/store/mutation-types';
import LoginService from '@/services/login';
export default {
  data: function() {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  created() {
    window.localStorage.clear();
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(async (valid) => {
        if (valid) {
          const postData = this.param;
          const { code, message, result, params } = await LoginService.loginApi(postData);
          if (Object.is(code, 0)) {
            this.$message.success('登录成功');
            this.setUserInfo(result);
            storage.setItem(authToken, result.token);
            // 登录成功去获取菜单接口,请求成功的时候就调整到首页
            await this.getMenuListApi();
            this.$router.push('/');
          } else if (Object.is(code, 10024)) {
            this.$router.push(`/register?setpIndex=2&id=${params.accountId}`);
            return false;
          } else {
            this.$message.error(message);
          }
        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },
    ...mapMutations({
      setUserInfo: types.SET_CURRENT_USER_INFO,
    }),
    ...mapActions(['getMenuListApi']),
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('~@/assets/images/login.svg');
  background-size: 100%;
  background-color: #2d3a4b;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #444;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  margin: -200px 0 0 -200px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.register {
  text-decoration: none;
  margin-bottom: 20px;
  margin-right: 30px;
  float: right;
}
</style>
