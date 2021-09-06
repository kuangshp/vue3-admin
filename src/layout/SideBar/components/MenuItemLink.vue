<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isExternal } from '@/utils';

// 针对路径是外链 就渲染为a标签 如果是正常路由路径 就渲染为 router-link
// el-menu组件的router属性去掉了  不开启路由模式
export default defineComponent({
  name: 'MenuItemLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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

    return {
      type,
      linkProps,
    };
  },
});
</script>
