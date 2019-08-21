/*
 * @Description:封装数据请求返回的格式
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-08-21 13:04:57
 * @LastEditors: 水痕
 * @LastEditTime: 2019-08-21 13:22:22
 */

/**
 * @param result 返回数据结果
 * @param code 返回的code
 * @param message 返回的消息
 * @param isObj 是否要以对象返回
 */
export const axiosResult = (
  result: any,
  code: number,
  message: string,
  isObj: boolean = false,
): Promise<any> =>
  new Promise((resolve, reject) => {
    if (Object.is(code, 0)) {
      if (result) {
        isObj ? resolve({ result }) : resolve(result);
      } else {
        isObj ? resolve({ message }) : resolve(message);
      }
    } else {
      reject(message);
    }
  });
