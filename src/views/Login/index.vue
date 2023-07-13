<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFromRef">
      <div class="title-container">
        <h3 class="title">管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user"></SvgIcon>
        </span>
        <el-input
          placeholder="请输入用户名"
          name="username"
          type="text"
          v-model.trim="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password"></SvgIcon>
        </span>
        <el-input
          placeholder="请输入密码"
          name="password"
          v-model.trim="loginForm.password"
          :type="passwordType"
          @keyup.enter="handleLogin"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <SvgIcon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></SvgIcon>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px; height: 40px"
        :loading="loading"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/stores/app';
  import { AUTH_Token_NAME } from '@/constant';
  import { validatePassword } from './rule';
  import { LoginService } from '@/services';
  const appStore = useAppStore();
  const loginForm = ref({
    username: 'admin',
    password: '123456',
  });

  const loading = ref(false);
  const loginFromRef = ref(null);
  const router = useRouter();
  const passwordType = ref('password');

  const loginRules = ref({
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '用户名错误',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: validatePassword(),
      },
    ],
  });

  const onChangePwdType = () => {
    // 使用 ref 声明的数据，在script中使用时，需要加value来获取具体的值，但是在template中使用时，不需要加value
    if (passwordType.value === 'password') {
      passwordType.value = 'text';
    } else {
      passwordType.value = 'password';
    }
  };
  // 登录操作
  const handleLogin = () => {
    // 1.进行表单验证
    loginFromRef.value.validate(async (valid) => {
      if (!valid) return;
      const result = await LoginService.loginApi(loginForm.value);
      console.log(result, '登录返回数据');
      // 2.触发登陆操作
      loading.value = true;
      window.localStorage.setItem(AUTH_Token_NAME, 'test');
      appStore.setGlobalToken('test1');
      appStore.setGlobalUserInfo({ username: 'admin' });
      router.push('/');
      // store
      //   .dispatch('user/login', loginForm.value)
      //   .then(() => {
      //     loading.value = false;
      //     // TODO: 3.登录后操作
      //     router.push('/');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     loading.value = false;
      //   });
    });
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
