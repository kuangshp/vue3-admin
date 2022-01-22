<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { isExternal } from '@/utils';
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
// 判断接收的路径 是不是外链
const isExt = computed(() => isExternal(props.to));
const type = computed(() => {
  if (isExt.value) {
    return 'a';
  }
  return 'router-link';
});

const linkProps = computed(() => {
  if (isExt.value) {
    return {
      // a 标签的一些原生属性
      href: props.to,
      target: '_blank',
      rel: 'noopener',
    };
  }
  // router-link只需一个to props
  return {
    to: props.to,
  };
});
</script>
