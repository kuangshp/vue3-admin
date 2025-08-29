/**
 * 判断是否为外部资源
 * @param path 要检查的路径
 * @returns 是否为外部资源
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 判断是否为 HTTP 或 HTTPS URL
 * @param url 要检查的 URL
 * @returns 是否为 HTTP 或 HTTPS URL
 */
export function isHttp(url: string): boolean {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1;
}
