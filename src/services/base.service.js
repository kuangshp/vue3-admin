import axios from 'axios';
import { Cacheables } from 'cacheables';
import { MAX_AGE } from '@/constants';
import { objCleanEmpty, objValueTrim } from '../utils';

const cache = new Cacheables({
  logTiming: false,
  log: false,
});

export default class BaseService {
  // 提供get请求方法
  static async get(url, params = {}, clearEmptyParams = true, isCache = true) {
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
  static async post(url, postData, clearEmptyData = true, isCache = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.post(url, postData), BaseService.cacheKey('POST', url), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供patch请求
  static async patch(url, id, postData = {}, clearEmptyData = true, isCache = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.patch(`${url}/${id}`, objValueTrim(postData ?? {})), BaseService.cacheKey('PATCH', `${url}/${id}`), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供put方法
  static async put(url, id, postData = {}, clearEmptyData = true, isCache = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return cache.cacheable(() => axios.put(`${url}/${id}`, objValueTrim(postData)), BaseService.cacheKey('PUT', `${url}/${id}`), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  // 提供delete请求
  static async delete(url, id, isCache = true) {
    return cache.cacheable(() => axios.delete(`${url}/${id}`), BaseService.cacheKey('DELETE', `${url}/${id}`), {
      cachePolicy: 'max-age',
      maxAge: isCache ? MAX_AGE : 0,
    });
  }

  static cacheKey(method, url) {
    return `${method}_${url}`;
  }
}
