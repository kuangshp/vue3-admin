import qs from 'qs';

/**
 * 判断值是否为 falsy
 * 特殊处理：0 不被视为 falsy
 * @param value 要检查的值
 * @returns 是否为 falsy
 */
export const isFalsy = (value: any): boolean => {
  return value === 0 ? false : !value;
};

/**
 * 清除对象中值为 falsy 的属性
 * 在一个函数里，改变传入的对象本身是不好的
 * @param object 要清理的对象
 * @returns 清理后的新对象
 */
export const cleanObject = <T extends Record<string, any>>(object: T): Partial<T> => {
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
 * @param data 要转换的对象
 * @return 转换后的字符串
 */
export const object2str = (data: Record<string, any>): string => {
  return qs.stringify(data);
};

/**
 * @Author: 水痕
 * @Date: 2021-06-29 08:11:30
 * @LastEditors: 水痕
 * @Description: 将对象参数转行为字符串参数
 * @param data 要转换的对象
 * @return 转换后的查询字符串
 */
export const urlObjectParams = (data: Record<string, any>): string => {
  return object2str(cleanObject(data));
};

/**
 * @Author: 水痕
 * @Date: 2021-08-11 12:45:40
 * @LastEditors: 水痕
 * @Description: 去除参数中的空格字符比如"xxx   " --> "xxx"
 * @param obj 要处理的对象或数组
 * @return 处理后的新对象或数组
 */
export const objValueTrim = <T extends Record<string, any> | any[]>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj;
  }
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      newObj[key] = obj[key];
    } else {
      // Number.isFinite(obj[key])如果是数字的话就转换字符串去重空格
      newObj[key] = Number.isFinite(obj[key])
        ? +obj[key].toString().trim()
        : obj[key]
          ? obj[key].toString().trim()
          : '';
    }
  }
  return newObj as T;
};

/**
 * 过滤数据中的空
 * @param obj 要过滤的对象或数组
 * @return 过滤后的新对象或数组
 */
export const objCleanEmpty = <T extends Record<string, any> | any[]>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj;
  }
  const newParams: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (element !== null && element !== '') {
        newParams[key] = element;
      }
    }
  }
  return newParams as T;
};
