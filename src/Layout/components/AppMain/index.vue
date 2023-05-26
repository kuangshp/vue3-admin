<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具备组件缓存 -->
    <router-view v-slot="{ Component }" :key="route.path">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  const route = useRoute();
</script>

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
