<template>
  <div>
    <div>账号中心</div>
    <el-button @click="goDetail">点击到详情</el-button>
    <input placeholder="请输入" />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const goDetail = () => {
    router.push({ name: 'accountDetail' });
  };
</script>

<style lang="scss" scoped></style>
