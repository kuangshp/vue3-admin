<template>
  <el-scrollbar wrap-class="scroll-wrapper">
    <slot />
  </el-scrollbar>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ScrollPanel',
});
</script>

<style lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
}
</style>
