import { ElLoading } from 'element-plus';

/**
 * 全局加载中方法
 * @param text 加载文本
 * @returns ElLoadingInstance 实例，可调用 close() 方法关闭加载
 */
export const fullLoading = (text: string = ''): ReturnType<typeof ElLoading.service> => {
  return ElLoading.service({
    lock: true,
    text: text || '加载中',
    spinner: 'el-icon-loading',
    customClass: 'loading-warp',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};
