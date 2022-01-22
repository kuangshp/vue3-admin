<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    router
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409EFF"
    :unique-opened="true"
    :collapse="!$store.getters.sidebarOpened"
    :collapse-transition="true"
    :default-active="activeMenu"
  >
    <!-- 循环导航菜单 -->
    <SidebarItem v-for="item in menuRoutes" :key="item.path" :route="item" />
  </el-menu>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import SidebarItem from './SidebarItem';
import { getTreeList } from '@/utils';
import { menusList } from './../menus';

// 根据后端返回的菜单树遍历处理
const menuRoutes = computed(() => {
  return getTreeList(menusList);
});
// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>
