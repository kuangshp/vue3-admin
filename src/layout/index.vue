<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <Sidebar id="guide-sidebar" class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />

        <TagsView id="guide-tags" />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TagsView from './components/TagsView';
import AppMain from './components/AppMain';
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    transition: width 0.28s;
    width: 210px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #f00;
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - 210px);
      transition: width 0.28s;
    }
    .app-main {
      min-height: calc(100vh - 50px - 43px);
      width: 100%;
      position: relative;
      overflow: hidden;
      padding: 104px 20px 20px 20px;
      box-sizing: border-box;
    }
  }
}
</style>
