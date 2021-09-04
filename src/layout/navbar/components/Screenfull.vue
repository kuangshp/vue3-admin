<template>
  <div style="border: 1px solid #f00">
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue';
import screenfull, { Screenfull } from 'screenfull';

/**
 * screenful 文档说明
 * https://www.npmjs.com/package/screenfull
 */
export default defineComponent({
  name: 'ScreenFull',
  setup() {
    const { proxy } = getCurrentInstance()!;
    const isFullscreen = ref(false);
    const handleClick = () => {
      if (screenfull.isEnabled) {
        // 浏览器是否允许全屏模式
        screenfull.toggle();
        return;
      }
      return proxy?.$message({
        message: 'you browser can not work',
        type: 'warning',
      });
    };

    const change = () => {
      // 更新当前全屏状态 根据状态切换对应图标
      isFullscreen.value = (screenfull as Screenfull).isFullscreen;
    };

    const init = () => {
      //
      if (screenfull.isEnabled) {
        // 浏览器是否允许全屏模式
        // 监听全屏切换状态
        screenfull.on('change', change);
      }
    };

    onMounted(() => {
      init();
    });

    return {
      isFullscreen,
      handleClick,
    };
  },
});
</script>
