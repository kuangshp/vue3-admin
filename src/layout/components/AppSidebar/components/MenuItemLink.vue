<template>
  <el-menu-item :index="route.path" @click="openLink">
    <MenuItem :title="route.title" :icon="route.icon" />
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue';
import MenuItem from './MenuItem';

const props = defineProps({
  route: {
    // 当前路由（此时的父路由）
    type: Object,
    required: true,
  },
});
const openLink = () => {
  console.log('点击了');
  window.open(props.route.path, '_blank');
};
</script>
