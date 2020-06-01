/*
 * @Description: 自定义指令:主要用于点击元素以为的区域,触发事件,使用方式 v-click-outside="close"
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @Date: 2020-06-01 08:47:09
 * @LastEditors: 水痕
 * @LastEditTime: 2020-06-01 08:48:03
 * @FilePath: /admin-web/src/directives/clickOutside.js
 */


export const clickOutside = {
  // eslint-disable-next-line no-unused-vars
  bind (el, bindings, vnode) {
    document.addEventListener('click', (e) => {
      if (e.target === el || el.contains(e.target)) {
        return;
      }
      bindings.value(); // 绑定当前的close方法
    });
  },
};
