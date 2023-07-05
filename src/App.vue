<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<style scoped lang="scss"></style>
