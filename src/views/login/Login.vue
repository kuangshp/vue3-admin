<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <div class="admin-logo">
        <img class="logo" src="../../assets/logo.png" alt="logo" />
        <h1 class="name">Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          ref="usernameRef"
          placeholder="请输入用户名"
          v-model="loginForm.username"
          autocomplete="off"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          ref="passwordRef"
          :class="{
            'no-autofill-pwd': passwordType === 'password',
          }"
          placeholder="请输入密码"
          v-model="loginForm.password"
          type="text"
          autocomplete="off"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPassword">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue';
import { ElForm } from 'element-plus';
import { useRouter } from 'vue-router';
import { useRouteQuery } from '@/hooks';
import { LoginService } from '@/services';
type IElFormInstance = InstanceType<typeof ElForm>;

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    // 登录加载中
    const loading = ref(false);
    const usernameRef = ref<HTMLInputElement | null>(null);
    const passwordRef = ref<HTMLInputElement | null>(null);
    const loginFormRef = ref<IElFormInstance | null>(null);

    const loginState = reactive({
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名！',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码！',
          },
        ],
      },
      passwordType: 'password',
    });
    // 显示密码
    const showPassword = () => {
      loginState.passwordType = loginState.passwordType === 'password' ? 'text' : 'password';
    };

    // 自动获取焦点
    onMounted(() => {
      if (loginState.loginForm.username === '') {
        (usernameRef.value as HTMLInputElement).focus();
      } else if (loginState.loginForm.password === '') {
        (passwordRef.value as HTMLInputElement).focus();
      }
    });

    // 登录
    const { redirect, otherQuery } = useRouteQuery();
    const handleLogin = () => {
      (loginFormRef.value as IElFormInstance).validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const result = await LoginService.loginApi(loginState.loginForm);
            console.log(result, '========');
            if (result == null) {
              router.push({
                path: redirect.value || '/',
                query: otherQuery.value,
              });
            }
          } catch (e) {
            console.log(e);
          } finally {
            loading.value = false;
          }
        } else {
          console.log('error submit!!');
        }
      });
    };
    return {
      loading,
      loginFormRef,
      usernameRef,
      passwordRef,
      handleLogin,
      showPassword,
      ...toRefs(loginState),
    };
  },
});
</script>

<style lang="scss">
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('../../assets/images/login.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  .el-form-item {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 40px;
      }
    }
  }
  .no-autofill-pwd {
    // 解决自动填充问题
    .el-input__inner {
      // 模仿密码框原点
      -webkit-text-security: disc !important;
    }
  }
  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 140px 35px 0;
    overflow: hidden;
    box-sizing: border-box;
    .svg-container {
      padding: 0 10px;
    }
    .show-pwd {
      font-size: 16px;
      cursor: pointer;
      margin-left: 7px;
    }
    .admin-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .logo {
        width: 60px;
        height: 60px;
      }
      .name {
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
}
</style>
