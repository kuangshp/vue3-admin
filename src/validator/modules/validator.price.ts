import type { ValidatorFunction } from '../types';

/**
 * 验证是否为最多两位小数的数字
 */
export const validatePrice: ValidatorFunction = (rule, value, callback) => {
  if (value) {
    if (/^\d+([.]\d{0,2})?$/.test(value)) {
      callback();
    } else {
      callback(new Error('必须是两位小数'));
    }
  } else {
    callback();
  }
};
