/**
 * 错误捕获的方法
 * @param func
 */
export const errorCaptured = async (func: () => void) => {
  try {
    const result = await func();
    return [null, result];
  } catch (e) {
    return [e, null];
  }
};
