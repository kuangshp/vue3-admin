<template>
  <div class="navbar">
    <!-- 左侧折叠 -->
    <Hamburger class="hamburger-container" />
    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 全屏组件 -->
      <Screenfull class="right-menu-item hover-effect" />
      <!-- 切换主题 -->
      <ThemeSelect class="right-menu-item hover-effect" />
      <!-- 切换国际化语言 -->
      <LangSelect class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40"></el-avatar>
          <!-- <i class="el-icon-s-tools"></i> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger';
import Breadcrumb from '@/components/Breadcrumb';
import LangSelect from '@/components/LangSelect';
import ThemeSelect from '@/components/ThemeSelect';
import Screenfull from '@/components/Screenfull';
const store = useStore();
const logout = () => {
  store.dispatch('app/clearTagsView');
  store.dispatch('user/logout');
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
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
    ::v-deep .right-menu-item {
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
