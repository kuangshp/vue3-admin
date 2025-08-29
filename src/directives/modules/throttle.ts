import type { App, DirectiveBinding } from 'vue';
import type { ThrottleOptions } from '../types';

// 需求：一段时间内首次触发时立即执行，此时间段内再次触发不再执行。
// 思路：
// 1、记录上次触发事件,每次触发与指定的时间段比较。
// 2、将事件绑定在 click 方法上。
const throttleDirective = {
  mounted(el: HTMLElement & { preTime?: number }, binding: DirectiveBinding<ThrottleOptions>) {
    const { callback, time } = binding.value;
    el.addEventListener('click', () => {
      const nowTime = new Date().getTime();
      if (!el.preTime || nowTime - el.preTime > time) {
        el.preTime = nowTime;
        callback();
      }
    });
  },
};

export function setupThrottleDirective(app: App) {
  app.directive('throttle', throttleDirective);
}

export default throttleDirective;
