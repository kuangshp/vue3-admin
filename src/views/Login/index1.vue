<template>
  <div>登录页面</div>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary" @click="loginHandler">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script setup>
  import { getCurrentInstance } from 'vue';
  const { proxy } = getCurrentInstance();
  console.log(proxy);
  const loginHandler = () => {
    proxy.$message.success('成功');
  };
</script>

<style lang="scss" scoped></style>
