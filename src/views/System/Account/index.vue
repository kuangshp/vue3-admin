<template>
  <div>
    账号管理
    <el-button @click="goDetailHandler">到详情</el-button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

const goDetailHandler = () => {
  router.push({path:'/system/accountDetail'})
}
</script>

<style lang="scss" scoped></style>