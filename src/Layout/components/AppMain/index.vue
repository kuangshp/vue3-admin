<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具备组件缓存 -->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="10" :include="includes">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { useTagsViewStore } from '@/stores/tagsView';

  const tagsViewStore = useTagsViewStore();
  const includes = computed(() => tagsViewStore.cachedViews);
  console.log(includes.value, '缓存');
</script>

<style lang="scss" scoped>
  .app-main {
    /* 浏览器可视区域的高度 100vh */
    min-height: calc(100vh - 50px - 43px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 104px 20px 20px 20px;
    box-sizing: border-box;
  }
</style>
