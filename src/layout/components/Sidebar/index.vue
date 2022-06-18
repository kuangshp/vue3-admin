<template>
  <div class="sidebar">
    <h1>导航</h1>
    <SidebarMenu />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import SidebarMenu from './components/SidebarMenu';
import { filterRoutes, generateMenus } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
// 获取到全部的路由
// console.log(router.getRoutes());
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});

console.log(JSON.stringify(routes.value));
</script>

<style lang="scss" scoped></style>
