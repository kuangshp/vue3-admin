/**
 * 限制输入框输入数据格式化,比如当前输入框只能输入数字,金额
 * 使用方式:v-number-only="'number'"
 */
// 派发自定义事件
const triggerEvent = (el, type) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
};

const numberOnlyDirective = {
  mounted(el, binding) {
    // 对于 Element Plus 的 el-input，直接操作 el 通常是 input 本身
    el.$handler = el => {
      const inputElement = el.querySelector('input') || el;
      const types = ['number', 'decimal', 'decimal_2'];
      if (!binding.value || !types.includes(binding.value)) {
        console.warning(
          `使用v-number-only指令需要选择特定功能：v-number-only="type";  type = ${types.join('/')}其中一个`,
        );
        return
      }
      switch (binding.value) {
        // 数字
        case 'number':
          inputElement.value = inputElement.value?.replace(/[^\d]/, '');
          break;
        // 数字+小数
        case 'decimal':
          inputElement.value = inputElement.value.replace(/[^\d.]/g, ''); // 清除数字和'.'以外的字符
          inputElement.value = inputElement.value.replace(/\.{2,}/g, '.'); // 连续两个'.', 只保留第一个'.'
          inputElement.value = inputElement.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.'); // 隔着字符, 也保证只有一个'.'
          !inputElement.value.includes('.') && inputElement.value !== '' && (inputElement.value = Number.parseFloat(inputElement.value)); // 保证不会出现重复的: 00, 01, 02 ...
          inputElement.value.includes('.') && inputElement.value.length === 1 && (inputElement.value = ''); // 第一位不能以'.'开头
          break;
        // 数字+两位小数
        case 'decimal_2':
          inputElement.value = inputElement.value.replace(/[^\d.]/g, '');
          inputElement.value = inputElement.value.replace(/\.{2,}/g, '.');
          inputElement.value = inputElement.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
          inputElement.value = inputElement.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两位小数
          !inputElement.value.includes('.') && inputElement.value !== '' && (inputElement.value = Number.parseFloat(inputElement.value));
          inputElement.value.includes('.') && inputElement.value.length === 1 && (inputElement.value = '');
          break;
        default:
          return;
      }
      triggerEvent(el, 'input');
    };
    el.$handler(el);
    return true;
  },
  updated(el) {
    el.$handler && el.$handler(el);
  },
};
export function setupNumberOnlyDirective(app) {
  app.directive('number-only', numberOnlyDirective);
}
export default numberOnlyDirective;
