import { axiosResult } from './axios-result';

/**
 * 错误捕获的方法
 * @param func
 */
export const errorCaptured = (func: () => void): any => {
  return new Proxy(func, {
    async apply(target, thisBinding, args) {
      try {
        const res: any = await target.apply(thisBinding, args);
        const { code, message, result } = res;
        return [null, axiosResult(result, code, message, true)];
      } catch (e) {
        return [e, Promise.resolve('')];
      }
    },
  });
};
