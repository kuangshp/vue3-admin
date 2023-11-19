<template>
  <div style="background: #fff; padding: 20px">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="Demo演示" name="first">
        <Demo></Demo>
      </el-tab-pane>
      <el-tab-pane label="对接后端" name="second">
        <Demo1></Demo1>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import Demo from './components/Demo.vue';
  import Demo1 from './components/Demo1.vue';
  const activeName = ref('first');
</script>

<style lang="scss" scoped></style>
