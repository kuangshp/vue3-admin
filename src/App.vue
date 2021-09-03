<template>
  <img src="./assets/logo.png" />
  <el-button type="primary">按钮</el-button>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
