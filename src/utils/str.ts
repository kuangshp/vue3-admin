/**
 * @param {type}
 * @return:
 * @Description:英文单词首字母大写
 * @Author: 水痕
 * @LastEditors: 水痕
 * @Date: 2019-08-16 13:32:30
 */
export const replaceFirstUper = (str: string): string => {
  str = str.toLowerCase();
  return str.replace(/\b(\w)|\s(\w)/g, (m) => m.toUpperCase());
};
