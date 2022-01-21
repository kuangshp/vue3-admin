<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className" />
  <!-- 自己使用svg的图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils';
import { defineProps, computed } from 'vue';
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

// 判断是不是elementUi外部的图标
const isExternal = computed(() => external(props.icon));

/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}));
/**
 * 项目内图标
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
