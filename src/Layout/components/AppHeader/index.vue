<template>
  <div class="navbar">
    <!-- 左侧折叠 -->
    <Hamburger class="hamburger-container" />
    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu" style="margin-top: 7px">
      <!-- 全屏组件 -->
      <Screenfull class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <el-avatar shape="square" :size="40"></el-avatar> -->
          <!-- <i class="el-icon-s-tools"></i> -->
          <div>{{ appStore.globalUserInfo.userName ?? '管理员账号' }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item @click="modifyUserInfoHandler">个人信息</el-dropdown-item>
            <el-dropdown-item divided @click="modifyPasswordHandler">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 修改密码弹框 -->
      <ModifyDialog ref="modifyDialogRef"></ModifyDialog>
      <!-- 个人信息 -->
      <ModifyUserInfoDialog ref="modifyUserInfoDialogRef"></ModifyUserInfoDialog>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import Hamburger from './components/Hamburger/index.vue';
  import Breadcrumb from './components/Breadcrumb/index.vue';
  import Screenfull from './components/Screenfull/index.vue';
  import ModifyDialog from './components/ModifyDialog.vue';
  import ModifyUserInfoDialog from './components/ModifyUserInfoDialog.vue';
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore();
  const router = useRouter();
  const logout = async () => {
    // await AccountService.logoutApi();
    appStore.clearGlobalToken();
    window.localStorage.clear();
    router.push('/login');
  };

  // 修改密码
  const modifyDialogRef = ref(null);
  const modifyPasswordHandler = () => {
    modifyDialogRef.value.openDialog();
  };

  // 修改个人信息
  const modifyUserInfoDialogRef = ref();
  const modifyUserInfoHandler = () => {
    modifyUserInfoDialogRef.value.openDialog();
  };
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      // hover 动画
      transition: background 0.5s;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .right-menu {
      display: flex;
      align-items: center;
      float: right;
      padding-right: 16px;

      :deep(.avatar-container) {
        cursor: pointer;
        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          .el-avatar {
            margin-right: 12px;
          }
        }
      }
      :deep(.right-menu-item) {
        display: inline-block;
        padding: 0 18px 0 0;
        font-size: 24px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
        }
      }
    }
  }
</style>

