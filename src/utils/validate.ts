// 判断路径是不是带协议的外链
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
