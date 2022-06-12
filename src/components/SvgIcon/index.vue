<template>
  <!-- 展示外部图标 -->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className" />
  <!-- 展示内部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate';
import { defineProps, computed } from 'vue';
// 定义props
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true,
  },
  // 图标类名
  className: {
    type: String,
    default: '',
  },
});

// 计算属性
/**
 * 判断是否为外部图标的计算属性
 */
const isExternal = computed(() => external(props.icon));
/**
 * 外部图标样式的计算属性
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`,
}));
/**
 * 项目内图标的计算属性
 */
const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/* 外部图标 */
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
