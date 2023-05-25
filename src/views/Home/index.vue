<template>
  <div>首页</div>
  <SvgIcon icon="password" />
  <el-button @click="sayHi">按钮</el-button>
</template>

<script setup>
  const { proxy } = getCurrentInstance();
  const sayHi = () => {
    proxy?.$message.success('恭喜你，这是一条成功消息');
  };
</script>

<style lang="scss" scoped></style>
