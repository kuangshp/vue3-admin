<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="login-logo"></div>
      <div class="login-form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginFromRef">
          <div class="title-container">
            <h3 class="title">管理系统</h3>
          </div>
          <div class="input-row">
            <i class="icon icon-user"></i>
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                name="username"
                type="text"
                v-model.trim="loginForm.username"
              />
            </el-form-item>
          </div>

          <div class="input-row">
            <i class="icon icon-password"></i>
            <el-form-item prop="password">
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
          </div>
          <div class="input-row">
            <i class="icon icon-code"></i>
            <el-form-item prop="code" style="width: 70%">
              <el-input
                placeholder="请输入验证码"
                name="code"
                v-model.trim="loginForm.code"
                @keyup.enter="handleLogin"
              ></el-input>
            </el-form-item>
            <img src="@/assets/images/check-code.png" class="code" />
          </div>
          <el-button
            type="primary"
            style="width: 100%; margin-bottom: 30px; margin-top: 30px; height: 40px"
            :loading="loading"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/stores/app';
  import { AUTH_Token_NAME } from '@/constant';
  import { validatePassword } from './rule';
  // import { LoginService } from '@/services';
  import { useTagsViewStore } from '@/stores/tagsView';
  const tagsViewStore = useTagsViewStore();
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
      // const result = await LoginService.loginApi(loginForm.value);
      // console.log(result, '登录返回数据');
      // 2.触发登陆操作
      loading.value = true;
      window.localStorage.setItem(AUTH_Token_NAME, 'test');
      appStore.setGlobalToken('test1');
      appStore.setGlobalUserInfo({ username: 'admin' });
      appStore.getMenusApi();
      // 全部关闭
      tagsViewStore.delAllView();
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
  .login-container {
    background-image: url('@/assets/images/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .login-panel {
      max-width: 1000px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
      position: fixed;
      top: 50%;
      left: 50%;
      width: 92%;
      height: auto;
      transform: translateX(-50%) translateY(-50%);
      display: flex;
      flex-direction: row;
      .login-logo {
        background-image: url('@/assets/images/ad.png');
        background-repeat: no-repeat;
        background-size: cover;
        flex-basis: 60%;
      }
      .login-form {
        padding: 30px 20px;
        flex-basis: 40%;
        box-sizing: border-box;
        .title {
          font-size: 26px;
          color: #409eff;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
        .input-row {
          width: 100%;
          border-bottom: 1px solid #cccccc;
          background: #fff;
          margin-bottom: 8px;
          margin-top: 20px;
          display: flex;
          align-items: center;
        }
        .icon {
          width: 20px;
          height: 20px;
          display: block;
          border: none;
          background-size: 20px;
          background-repeat: no-repeat;
          margin-right: 10px;
          &.icon-user {
            background-image: url('@/assets/images/icon-user.png');
          }
          &.icon-password {
            background-image: url('@/assets/images/icon-password.png');
          }
          &.icon-code {
            background-image: url('@/assets/images/icon-code.png');
          }
        }
        .show-pwd,
        .code {
          cursor: pointer;
          user-select: none;
        }

        ::v-deep {
          .el-input {
            width: 95%;
            border: none;
          }
          .el-form-item {
            width: 100%;
            margin-bottom: 0 !important;
          }
          .el-input__wrapper {
            border: none;
            box-shadow: none;
          }
        }
      }
    }
  }
</style>
