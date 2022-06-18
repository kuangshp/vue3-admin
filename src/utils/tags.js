// 不需要被保存为tag的路由
const whiteList = ['/login', '/404', '/401'];

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export const isTags = (path) => {
  return !whiteList.includes(path);
};
