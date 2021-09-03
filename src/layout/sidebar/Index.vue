<template>
  <div>
    <h5 @click="isCollapse = !isCollapse">展收测试</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Sidebar',
  setup() {
    const isCollapse = ref(true);
    return {
      isCollapse,
    };
  },
});
</script>

<style></style>
