import { ElMessage } from 'element-plus';

/**
 * 复制文本到剪贴板的Hook
 * @param text 要复制的文本内容
 */
export const useCopy = (text: string): void => {
  // 创建输入框
  const input: HTMLInputElement = document.createElement('input');
  // 给输入框value赋值
  input.value = text;
  // 追加到body里面去
  document.body.appendChild(input);
  // 选择输入框的操作
  input.select();
  // 执行复制操作
  document.execCommand('Copy');
  // 删除加入的输入框
  document.body.removeChild(input);
  // 提示用户
  ElMessage.success('复制成功');
};
