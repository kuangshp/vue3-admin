<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFromRef">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <LangSelect class="lang-select" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="请输入用户名"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="请输入密码"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('login.btn') }}</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { validatePassword } from './rule';
  import LangSelect from '@/components/LangSelect';
  import { useI18n } from 'vue-i18n';
  const loginForm = ref({
    username: 'admin',
    password: '123456',
  });

  const loading = ref(false);
  const loginFromRef = ref(null);
  const store = useStore();
  const router = useRouter();
  const passwordType = ref('password');

  // 只有在组件中才可以使用i18n实例来修改
  const i18n = useI18n();
  const loginRules = ref({
    username: [
      {
        required: true,
        trigger: 'blur',
        message: i18n.t('login.usernameError'),
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
    loginFromRef.value.validate((valid) => {
      if (!valid) return;

      // 2.触发登陆操作
      loading.value = true;
      store
        .dispatch('user/login', loginForm.value)
        .then(() => {
          loading.value = false;
          // TODO: 3.登录后操作
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    });
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
