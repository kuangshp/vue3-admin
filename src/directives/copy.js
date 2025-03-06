import { ElMessage } from 'element-plus';

/**
 * 自定义拷贝的方法,
 * 使用方式在组件上v-copy="text" text是动态要拷贝的值
 */
const copyDirective = {
  beforeMount(el, binding) {
    el.targetContent = binding.value;
    el.addEventListener('click', async () => {
      if (!el.targetContent) {
        return ElMessage.warning('没有需要复制的目标内容')
      };
      // 把目标内容复制进剪贴板
      await navigator.clipboard.writeText(el.targetContent).then(() => {
        ElMessage.success(`复制成功，剪贴板内容：${el.targetContent}`);
      });
      return el.targetContent;
    });
  },
  updated(el, binding) {
    // 实时更新最新的目标内容
    el.targetContent = binding.value;
  },
  unmounted(el) {
    el.removeEventListener('click', () => { });
  },
};

export function setupCopyDirective(app) {
  app.directive('copy', copyDirective);
}
export default copyDirective;