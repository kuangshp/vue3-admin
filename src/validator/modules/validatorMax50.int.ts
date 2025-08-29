import type { ValidatorFunction } from '../types';

/**
 * 验证是否为1-50之间的整数
 */
export const validateMax50Int: ValidatorFunction = (rule, value, callback) => {
  if (Number.isInteger(value) && value > 0 && value <= 50) {
    callback();
  } else {
    callback(new Error('必须是1-50的整数'));
  }
};
