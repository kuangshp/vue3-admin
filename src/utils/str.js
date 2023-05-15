/**
 * @Author: 水痕
 * @Date: 2020-06-01 16:32:50
 * @LastEditors: 水痕
 * @Description: 如果是英文首字母大写
 * @param {type} 
 * @return: 
 */
export const replaceFirstUpperCase = (str) => {
  str = str.toLowerCase();
  return str.replace(/\b(\w)|\s(\w)/g, (m) => m.toUpperCase());
};
