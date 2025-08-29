<template>
  <div @click="onToggle" id="guide-full">
    <SvgIcon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import screenfull from 'screenfull';

  // 是否全屏
  const isFullscreen = ref<boolean>(false);

  // 监听变化
  const change = (): void => {
    isFullscreen.value = screenfull.isFullscreen;
  };

  // 切换事件
  const onToggle = (): void => {
    screenfull.toggle();
  };

  // 设置侦听器
  onMounted((): void => {
    screenfull.on('change', change);
  });

  // 删除侦听器
  onUnmounted((): void => {
    screenfull.off('change', change);
  });
</script>

<style lang="scss" scoped></style>

