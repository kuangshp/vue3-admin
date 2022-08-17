<template>
  <!-- 有子路由的时候 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
    </template>
    <!-- 递归循环 -->
    <SidebarItem v-for="item in route.children" :key="item.path" :route="item"></SidebarItem>
  </el-submenu>
  <!-- 没有子路由的时候 -->
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
  </el-menu-item>
</template>

<script setup>
  import { defineProps } from 'vue';
  import MenuItem from './MenuItem.vue';
  defineProps({
    route: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped></style>
