<template>
  <div>
    用户
    <input v-model="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'User',
  setup() {
    const name = ref('');
    return {
      name,
    };
  },
});
</script>

<style lang="scss"></style>
