import qs from 'qs';
import { ObjectType } from './obj-type';
// eslint-disable-next-line
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: ObjectType): Record<string, unknown> => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * @Author: 水痕
 * @Date: 2021-06-29 08:09:23
 * @LastEditors: 水痕
 * @Description: 将对象转行为字符串
 * @param {object} data
 * @return {*}
 */
export const object2str = (data: ObjectType): string => {
  return qs.stringify(data);
};

/**
 * @Author: 水痕
 * @Date: 2021-06-29 08:11:30
 * @LastEditors: 水痕
 * @Description: 将对象参数转行为字符串参数
 * @param {ObjectType} data
 * @return {*}
 */
export const urlObjectParams = (data: ObjectType): string => {
  return object2str(cleanObject(data));
};
