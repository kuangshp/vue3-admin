import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

/**
 * 自定义指令:主要用于点击元素以为的区域,触发事件
 * 使用方式 v-click-outside="close"
 */
export const clickOutside: DirectiveOptions = {
  bind(el: HTMLElement, bindings: DirectiveBinding, vnode) {
    document.addEventListener('click', (e: any) => {
      if (e.target === el || el.contains(e.target)) {
        return;
      }
      bindings.value(); // 绑定当前的close方法
    });
  },
};
