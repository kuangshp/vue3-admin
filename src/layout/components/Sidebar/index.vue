<template>
  <div class="side-bar">
    <div class="logo-container">侧边导航</div>
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue';
</script>

<style lang="scss" scoped></style>
