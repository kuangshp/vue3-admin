import type { App, DirectiveBinding } from 'vue';
import type { DebounceOptions } from '../types';

/**
 * 防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次。
 * 1、定义一个延迟执行的方法，如果在延迟时间内再调用该方法，则重新计算执行时间。
 * 2、将事件绑定在 click 方法上。
 * 使用方式,在组件上v-debounce="{ callback: 函数, time: 1000 }"
 */
const debounceDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<DebounceOptions>) {
    const { callback, time } = binding.value;
    let timer: number | null = null;
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = window.setTimeout(() => {
        callback();
      }, time);
    });
  },
};

export function setupDebounceDirective(app: App) {
  app.directive('debounce', debounceDirective);
}

export default debounceDirective;
