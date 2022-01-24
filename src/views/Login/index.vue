<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFromRef">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input placeholder="username" name="username" type="text" v-model="loginForm.username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input placeholder="password" name="password" :type="passwordType" v-model="loginForm.password" />
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>

      <el-button type="primary" style="width: 100%; margin-bottom: 30px" @click="submitClick" :loading="isLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
// 导入效验规则
import { validatePassword } from './rules';

// 导入router
import router from '@/router';

const store = useStore();

const loginForm = ref({
  username: 'admin',
  password: '123456',
});

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
});

// 处理密码文本显示
const passwordType = ref('password');
const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};

// 登录
const loginFromRef = ref(null);
const isLogin = ref(false);
const submitClick = () => {
  isLogin.value = true;
  loginFromRef.value.validate(async (v) => {
    if (v) {
      // TODO这里不做接口请求，直接跳转到首页
      const result = await store.dispatch('user/loginApi', loginForm.value);
      // 获取菜单
      await store.dispatch('menus/menusApi');
      console.log(result, '登录结果');
      router.push('/');
      isLogin.value = false;
    } else {
      isLogin.value = false;
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('../../assets/images/login.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
