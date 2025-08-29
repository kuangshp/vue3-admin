import type { ValidatorFunction } from '../types';

/**
 * 验证是否为整数
 */
export const validateInt: ValidatorFunction = (rule, value, callback) => {
  if (/^\d+$/.test(value)) {
    callback();
  } else {
    callback(new Error('必须是整数'));
  }
};
