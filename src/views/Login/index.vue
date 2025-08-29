<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="login-form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginFromRef">
          <!-- <div class="nav">
            <div class="nav-item">账号密码登录</div>
          </div> -->
          <div class="header">
            <div class="title">您好!</div>
            <div class="sub-title">欢迎来到管理系统</div>
          </div>
          <div class="input-row">
            <i class="icon icon-user"></i>
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名/手机号码/邮箱"
                name="username"
                type="text"
                size="large"
                v-model.trim="loginForm.username"
              />
            </el-form-item>
          </div>

          <div class="input-row password">
            <i class="icon icon-password"></i>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                name="password"
                size="large"
                autocomplete="new-password"
                show-password
                v-model.trim="loginForm.password"
                :type="passwordType"
                @keyup.enter="handleLogin"
              ></el-input>
            </el-form-item>
          </div>
          <el-row :gutter="10">
            <el-col :span="16">
              <div class="input-row">
                <i class="icon icon-code"></i>
                <el-form-item prop="captchaValue">
                  <el-input
                    placeholder="请输入验证码"
                    name="captchaValue"
                    size="large"
                    v-model.trim="loginForm.captchaValue"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <img v-if="captchaImg" :src="captchaImg" alt="" class="captcha" @click="getCaptcha" />
              <img
                v-else
                src="@/assets/images/check-code.png"
                alt=""
                class="captcha"
                @click="getCaptcha"
              />
            </el-col>
          </el-row>
          <div class="info">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
          </div>
          <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Cookies from 'js-cookie';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/stores/app';
  import { encrypt, decrypt } from '@/utils';
  import { AuthService, MenusService } from '@/api';
  import { useTagsViewStore } from '@/stores/tagsView';
  import { ElMessage } from 'element-plus';
  import { AUTH_TOKEN_NAME } from '@/constant';
  import type { ElForm } from 'element-plus';
  import type { UserInfo } from '@/types';
  import type { LoginFormType } from './types';

  const tagsViewStore = useTagsViewStore();
  const appStore = useAppStore();
  const router = useRouter();

  // 定义表单规则类型
  interface LoginRulesType {
    username: Array<{
      required: boolean;
      trigger: string;
      message: string;
    }>;
    password: Array<{
      required: boolean;
      trigger: string;
      message: string;
    }>;
    captchaValue: Array<{
      required: boolean;
      trigger: string;
      message: string;
    }>;
  }

  const loginForm = ref<LoginFormType>({
    username: '',
    password: '',
    captchaValue: '',
    captchaId: '',
    rememberMe: false,
  });

  const loading = ref<boolean>(false);
  const loginFromRef = ref<InstanceType<typeof ElForm> | null>(null);
  const passwordType = ref<string>('password');
  const captchaImg = ref<string>('');

  const loginRules = ref<LoginRulesType>({
    username: [{ required: true, trigger: 'blur', message: '用户名必填' }],
    password: [{ required: true, trigger: 'blur', message: '密码必填' }],
    captchaValue: [{ required: true, trigger: 'blur', message: '验证码必填' }],
  });

  const LOGIN_NAME = 'yoooxia_name';
  const LOGIN_PASSWORD = 'yoooxia_password';
  const LOGIN_REMEMBER_ME = 'yoooxia_rememberMe';

  // 获取图形验证码
  const getCaptcha = async (): Promise<void> => {
    const { result } = await AuthService.getCaptchaIdApi();
    loginForm.value.captchaId = result;
    const captcha = await AuthService.getCaptchaApi(result);
    const blob = new Blob([captcha as any], { type: 'image/png' }); // 或 'image/jpeg'，根据后端实际返回
    captchaImg.value = URL.createObjectURL(blob);
  };

  // 登录操作
  const handleLogin = (): void => {
    // 1.进行表单验证
    loginFromRef.value?.validate(async (valid) => {
      if (!valid) return;
      loading.value = true;
      try {
        // 记住密码处理逻辑
        if (loginForm.value.rememberMe) {
          Cookies.set(LOGIN_NAME, loginForm.value.username, { expires: 10 });
          Cookies.set(LOGIN_REMEMBER_ME, String(loginForm.value.rememberMe), { expires: 10 });
          const enPwd = encrypt(loginForm.value.password);
          if (enPwd) {
            Cookies.set(LOGIN_PASSWORD, enPwd, { expires: 10 });
          }
        } else {
          // 否则移除
          Cookies.remove(LOGIN_NAME);
          Cookies.remove(LOGIN_PASSWORD);
          Cookies.remove(LOGIN_REMEMBER_ME);
        }
        const { result } = await AuthService.loginApi(loginForm.value);
        console.log(result, '登录数据');
        ElMessage.success('登录成功');
        loading.value = false;
        window.localStorage.setItem(AUTH_TOKEN_NAME, result.token);
        appStore.setGlobalToken(result.token);
        appStore.setGlobalUserInfo(result as UserInfo);
        if (appStore.menuFromServer) {
          const menusData = await MenusService.getMenuApi();
          // 获取菜单
          appStore.setServerMenu(menusData.result);
        }
        // 全部关闭
        tagsViewStore.delAllView();
        router.push({ path: '/home' });
      } catch (e) {
        loginForm.value.captchaValue = '';
        getCaptcha();
        console.log(e);
      } finally {
        loading.value = false;
      }
    });
  };

  // 获取cookie反填到输入框上
  const getCookie = (): void => {
    const username = Cookies.get(LOGIN_NAME);
    const password = Cookies.get(LOGIN_PASSWORD);
    const rememberMe = Cookies.get(LOGIN_REMEMBER_ME);
    loginForm.value = {
      username: username === undefined ? loginForm.value.username : username,
      password: password === undefined ? loginForm.value.password : decrypt(password) || '',
      rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      captchaValue: loginForm.value.captchaValue,
      captchaId: loginForm.value.captchaId,
    };
  };

  onMounted(() => {
    appStore.clearGlobalToken();
    window.localStorage.clear();
    getCookie();
    getCaptcha();
  });
</script>

<style lang="scss" scoped>
  .login-container {
    background-image: url('@/assets/images/login_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .login-panel {
      margin: 0 auto;
      position: fixed;
      top: 50%;
      right: 9%;
      height: auto;
      transform: translateY(-50%);
      display: flex;
      flex-direction: row;
      .login-form {
        width: 530px;
        height: 550px;
        // background: rgba(255, 255, 255, 0.59);
        background-image: url('@/assets/images/form_bg.png');
        background-size: 100% 100%;
        border-radius: 12px;
        padding: 56px 48px;
        padding-top: 20px;
        box-sizing: border-box;
        box-shadow:
          0px 12px 32px 4px rgba(0, 0, 0, 0.04),
          0px 8px 20px rgba(0, 0, 0, 0.08);
        .header {
          .title {
            font-size: 30px;
            color: #fff;
          }
          .sub-title {
            font-size: 20px;
            color: #fff;
            margin-bottom: 20px;
          }
        }
        .nav {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-bottom: 30px;
          .nav-item {
            font-weight: bold;
            font-size: 20px;
            color: #000000;
            position: relative;
            cursor: pointer;
            &:first-child {
              margin-right: 30px;
            }
            &.active {
              &::before {
                content: '';
                position: absolute;
                bottom: -8px;
                background-color: #409eff;
                width: 88px;
                left: 50%;
                height: 0;
                margin-left: -44px;
                border: 2px solid #5496fb;
              }
            }
          }
        }
        .input-row {
          width: 100%;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          height: 61px;
          background: #ffffff;
          border-radius: 8px 8px 8px 8px;
          border: 1px solid #dcdfe6;
        }
        .icon {
          width: 22px;
          height: 22px;
          display: block;
          border: none;
          background-size: 20px;
          background-repeat: no-repeat;
          margin-right: 10px;
          margin-left: 10px;
          &.icon-user {
            background-image: url('@/assets/images/user.png');
          }
          &.icon-password {
            background-image: url('@/assets/images/password.png');
          }
          &.icon-code {
            background-image: url('@/assets/images/message.png');
          }
        }
        .show-pwd,
        .code-img {
          cursor: pointer;
          user-select: none;
        }
        .show-pwd {
          margin-right: 10px;
        }
        .code-img {
          width: 105px;
          height: 35px;
        }
        :deep(.el-input) {
          width: 100%;
          border: none;
        }
        :deep(.el-form-item) {
          width: 100%;
          height: 61px;
          margin-bottom: 0 !important;
        }
        :deep(.el-input__inner) {
          --el-input-inner-height: 57px;
        }
        :deep(.el-input__wrapper) {
          border: none;
          box-shadow: none;
          padding-left: 0;
        }
        :deep(.el-form-item__error) {
          font-size: 16px;
          margin-top: 2px;
        }
        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          :deep(.el-checkbox__input),
          :deep(.el-checkbox__inner) {
            width: 27px;
            height: 27px;
            border-radius: 4px;
            text-align: center;
            line-height: 27px;
            &::after {
              height: 15px;
              // left: 8px;
              width: 7px;
              border-width: 2px;
            }
          }
          :deep(.el-checkbox__label) {
            font-weight: 400;
            font-size: 20px;
            color: #fff;
          }
          .forget-password {
            font-weight: 400;
            font-size: 20px;
            color: #218dff;
          }
        }
        .captcha {
          width: 100%;
          height: 60px;
          cursor: pointer;
          background-color: #fff;
          border-radius: 5px;
        }
        .login-btn {
          width: 100%;
          margin-bottom: 30px;
          margin-top: 36px;
          height: 61px;
          background: #65a1fc;
          border-radius: 8px;
          font-weight: bold;
          font-size: 20px;
          color: #ffffff;
        }
        .copy {
          font-weight: bold;
          font-size: 12px;
          color: #bcbcbc;
          margin-top: 100px;
          text-align: center;
        }
      }
    }
    .fixed_box {
      position: fixed;
      bottom: 10px;
      left: 50%;
      text-align: center;
      translate: -50%;
      .company {
        margin-bottom: 10px;
        color: #4f5759;
      }
      .record {
        color: #809296;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

