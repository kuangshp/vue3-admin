<template>
  <router-view />
</template>

<script setup>
  import { aesDecrypt } from '@/utils';
  console.log(
    aesDecrypt('ytCfMOa5qUknEuEBS5qrUIYtVmM5xz6MwdIMYyFoyv4=', 'lmd87x8qz4gbw51a'),
    '解密'
  );
</script>

<style scoped lang="scss"></style>
