/**
 * 判断是否为外部资源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}
