import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant';
import { storage } from './storage';
/**
 * 获取时间戳
 */
export const getTimeStamp = () => {
  return storage.getItem(TIME_STAMP);
};

/**
 * 设置时间戳
 */
export const setTimeStamp = () => {
  storage.setItem(TIME_STAMP, Date.now());
};

/**
 * 检查是否超时
 */
export const isCheckTimeout = () => {
  // 当前时间戳
  var currentTime = Date.now();
  // 缓存时间戳
  var timeStamp = getTimeStamp();
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE;
};
