/**
 * 如果是英文首字母大写
 * @param str 字符串
 * @returns String
 */
export const replaceFirstUpperCase = (str: string): string => {
  str = str.toLowerCase();
  return str.replace(/\b(\w)|\s(\w)/g, (m: string) => m.toUpperCase());
};
