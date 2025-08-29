import type { ValidatorFunction } from '../types';

/**
 * 验证是否为1-99999之间的整数
 */
export const validateCoupon: ValidatorFunction = (rule, value, callback) => {
  if (/^\d+$/.test(value) && value <= 99999) {
    callback();
  } else {
    callback(new Error('必须是1-99999的整数'));
  }
};
