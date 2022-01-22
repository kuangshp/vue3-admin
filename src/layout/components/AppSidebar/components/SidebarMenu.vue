<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409EFF"
    :collapse="isCollapse"
    :collapse-transition="true"
  >
    <!-- 循环导航菜单 -->
    <menu-item v-for="route in menuRoutes" :key="route.path" :item="route" :base-path="route.path" />
  </el-menu>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import MenuItem from './MenuItem';
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
