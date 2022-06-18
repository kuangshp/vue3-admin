<template>
  <div class="sidebar">
    <h1>导航</h1>
    <!-- 加上有滚动条 -->
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './components/SidebarMenu';
</script>

<style lang="scss" scoped></style>
