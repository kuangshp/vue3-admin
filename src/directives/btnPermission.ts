/*
 * @Description:自定义指令用来根据服务器端传递过来的按钮权限,显示与隐藏
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-08-22 17:27:15
 * @LastEditors: 水痕
 * @LastEditTime: 2019-08-22 17:29:41
 */
import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

export const btnPermission: DirectiveOptions = {
  inserted(el: HTMLElement, bindings: DirectiveBinding, vnode: VNode) {
    // 从当前的状态机中获取到该按钮的状态
    const flag = vnode.context!.$store.state.btnPermission[bindings.value];
    // 如果当前元素存在,且当前从状态机中取出来的是!false=true，且当前父节点是存在的,那么就从当前父节点移除改节点
    // tslint:disable-next-line:no-unused-expression
    el && !flag && el.parentNode && el.parentNode.removeChild(el);
  },
};
