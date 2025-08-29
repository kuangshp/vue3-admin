import { storage } from './storage';
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant';

/**
 * 获取时间戳
 */
export const getTimeStamp = (): number | null => {
  return storage.getItem(TIME_STAMP);
};

/**
 * 设置时间戳
 */
export const setTimeStamp = (): void => {
  storage.setItem(TIME_STAMP, Date.now());
};

/**
 * 检查是否超时
 */
export const isCheckTimeout = (): boolean => {
  // 当前时间戳
  const currentTime = Date.now();
  // 缓存时间戳
  const timeStamp = getTimeStamp();
  return timeStamp !== null && currentTime - timeStamp > TOKEN_TIMEOUT_VALUE;
};
