import { ElLoading } from 'element-plus';

/**
 * 全局加载中方法
 * @param {*} text
 * @returns
 */
export const fullLoading = (text = '') => {
  return ElLoading.service({
    lock: true,
    text: text || '加载中',
    spinner: 'el-icon-loading',
    customClass: 'loading-warp',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};
