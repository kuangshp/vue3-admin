<template>
  <el-menu :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText" :active-text-color="$store.getters.cssVar.menuActiveText" :unique-opened="true" router>
    <SidebarItem v-for="item in routes" :key="item.path" :route="item"></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import { filterRoutes, generateMenus } from '@/utils';

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
