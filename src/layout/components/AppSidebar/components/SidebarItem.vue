<template>
  <el-sub-menu>
    <template #title>
      <MenuItem :title="route.title" :icon="route.icon" />
    </template>
    <!-- 递归渲染子菜单 -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item"></SidebarItem>
  </el-sub-menu>
</template>

<script setup>
import { defineProps } from 'vue';
import MenuItem from './MenuItem';

defineProps({
  route: {
    // 当前路由（此时的父路由）
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
