<template>
  <div @click="handleClick">
    <img class="icon" src="@/assets/images/reduce-icon.png" v-if="isFullscreen" />
    <img class="icon" src="@/assets/images/expanded-icon.png" v-else />
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
