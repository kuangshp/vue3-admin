<template>
  <h1>用户管理</h1>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
console.log(store.getters.token, '本地token');
</script>

<style lang="scss" scoped></style>
