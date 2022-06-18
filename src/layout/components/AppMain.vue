<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.app-main {
  /* 浏览器可视区域的高度 100vh */
  /* min-height: calc(100vh - 50px); */
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /* padding: 61px 20px 20px 20px; */
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
