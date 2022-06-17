<template>
  <div class="app-wrapper">
    <!-- 左边导航 -->
    <Sidebar class="sidebar-container"></Sidebar>
    <!-- 右边内容区域 -->
    <div class="main-container">
      <!-- 头部导航 -->
      <div class="fixed-header">
        <Navbar />
      </div>
      <!-- 内容区域 -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar';
import AppMain from './components/AppMain.vue';
</script>

<style lang="scss" scoped></style>
