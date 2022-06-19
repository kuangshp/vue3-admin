import axios from 'axios';
import { Cacheables } from 'cacheables';
import { MAX_AGE } from '@/constant';
import { objCleanEmpty, objValueTrim } from '@/utils';

const cache = new Cacheables({
  logTiming: false,
  log: false,
});

export default class BaseService {
  // 提供get请求方法
  static async get(url, params = {}, clearEmptyParams = true, isCache = false) {
    params = clearEmptyParams ? objCleanEmpty(objValueTrim(params)) : params;
    return cache.cacheable(
      () =>
        axios.request({
          method: 'GET',
          url,
          params,
        }),
      BaseService.cacheKey('GET', url),
      {
        cachePolicy: 'max-age',
        maxAge: isCache ? MAX_AGE : 0,
      },
    );
  }

  // 提供post请求
  static async post(url, postData, clearEmptyData = true, isCache = false) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.post(url, postData), BaseService.cacheKey('POST', url), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供patch请求
  static async patch(url, postData = {}, clearEmptyData = true, isCache = false) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.patch(url, objValueTrim(postData ?? {})), BaseService.cacheKey('PATCH', url), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供put方法
  static async put(url, postData = {}, clearEmptyData = true, isCache = false) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.put(url, postData), BaseService.cacheKey('PUT', url), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供delete请求
  static async delete(url, isCache = false) {
    return cache.cacheable(() => axios.delete(`${url}`), BaseService.cacheKey('DELETE', `${url}`), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  static cacheKey(method, url) {
    return `${method}_${url}`;
  }
}
