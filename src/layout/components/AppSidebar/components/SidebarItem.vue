<template>
  <el-submenu>
    <template #title>
      <MenuItem :title="route.title" :icon="route.icon" />
    </template>
  </el-submenu>
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
