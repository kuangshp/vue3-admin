<template>
  <div class="sidebar">
    <h1>导航</h1>
    <SidebarMenu />
  </div>
</template>

<script setup>
import SidebarMenu from './components/SidebarMenu';
import { useRouter } from 'vue-router';
const router = useRouter();
// 获取到全部的路由
console.log(router.getRoutes());
</script>

<style lang="scss" scoped></style>
