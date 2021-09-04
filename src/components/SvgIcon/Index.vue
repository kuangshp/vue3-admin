<template>
  <!-- 如果iconClass是带协议的图标链接 则通过style属性方式渲染-->
  <div
    class="svg-icon svg-external-icon"
    v-if="isExt"
    :style="styleExternalIcon"
    v-bind="$attrs"
  ></div>
  <!-- SVG icon 通过名称使用 -->
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <!-- 
      SVG中的use元素可以调用其他SVG文件的元素，<use xlink:href="#symbolId"></use>
    -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { isExternal } from '@/utils';
import { computed, defineComponent } from 'vue';

/**
 * v-bind="$attrs" 组件$attrs属性透传绑定到元素上
 * vue3.0中$lietens已被移除 现在事件监听器是 $attrs 的一部分
 * 文档说明：
 * https://v3.cn.vuejs.org/guide/migration/listeners-removed.html#_3-x-%E8%AF%AD%E6%B3%95
 */
export default defineComponent({
  name: 'SvgIcon',
  inheritAttrs: false, // 组件上的$attrs不自动添加到组件根元素上 默认添加到组件根元素上
  props: {
    iconClass: {
      type: String,
      require: true,
    },
    className: {
      // 我们也可以自定义类名
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 是否是带协议的图片链接
    const isExt = computed(() => isExternal(props.iconClass || ''));
    // 拼接成symbolId 在loader配置中指定了symbolId格式 icon-图标名称
    const iconName = computed(() => `#icon-${props.iconClass}`);
    // 添加类名 props.className外部传入自定义类名
    const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'));
    // 如果iconClass是带协议的图标链接 则通过style css属性方式渲染
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
    }));

    return {
      isExt,
      iconName,
      svgClass,
      styleExternalIcon,
    };
  },
});
</script>

<style scoped>
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
