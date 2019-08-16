import { appName } from '@/config';
import { replaceFirstUper } from './str';

/**
 * @param {type}
 * @return:
 * @Description: 设置标题
 * @Author: 水痕
 * @LastEditors: 水痕
 * @Date: 2019-08-16 13:32:16
 */
export const setTitle = (title: string): void => {
  title = title ? `${replaceFirstUper(title)} - ${appName}` : appName;
  window.document.title = title;
};
