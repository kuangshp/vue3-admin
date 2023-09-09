<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import { aesDecrypt } from '@/utils';
  console.log(
    aesDecrypt('ytCfMOa5qUknEuEBS5qrUIYtVmM5xz6MwdIMYyFoyv4=', 'lmd87x8qz4gbw51a'),
    '解密'
  );
</script>

<style scoped lang="scss"></style>
