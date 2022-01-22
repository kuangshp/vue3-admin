<template>
  <template v-if="isExternalRouter">
    <MenuItemLink :route="route" />
  </template>
  <template v-else>
    <!-- 有children节点的时候 -->
    <el-sub-menu v-if="isChildrenMenu" :index="route.path">
      <template #title>
        <MenuItem :title="route.title" :icon="route.icon" />
      </template>
      <!-- 递归渲染子菜单 -->
      <SidebarItem v-for="item in route.children" :key="item.path" :route="item"></SidebarItem>
    </el-sub-menu>
    <!-- 没有children节点的时候 -->
    <el-menu-item v-else :index="route.path">
      <MenuItem :title="route.title" :icon="route.icon"> </MenuItem>
    </el-menu-item>
  </template>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import MenuItem from './MenuItem';
import MenuItemLink from './MenuItemLink';
import { isExternal as external } from '@/utils';

const props = defineProps({
  route: {
    // 当前路由（此时的父路由）
    type: Object,
    required: true,
  },
});
const isChildrenMenu = computed(() => {
  return props.route.children && props.route.children.length;
});
// 是否为外部路由
const isExternalRouter = computed(() => {
  return external(props.route.path);
});
</script>

<style lang="scss" scoped></style>
