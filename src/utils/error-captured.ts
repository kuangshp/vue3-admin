import { axiosResult } from './axios-result';

/**
 * 错误捕获的方法,使用方式errorCaptured(UserService.getAllUser)(getAllUser函数需要传递的参数)
 * @param func
 */
export const errorCaptured = (func: (_?: any) => Promise<any>) => {
  return new Proxy(func, {
    async apply(target, thisBinding, args) {
      try {
        return await target.apply(thisBinding, args);
      } catch (e) {
        const {
          data: {
            data: { error },
          },
        } = e;
        console.error(error);
      }
    },
  });
};
