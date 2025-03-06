import { axiosInstance } from '@/utils';
import { objCleanEmpty, objValueTrim } from '@/utils';

export default class BaseService {
  // 提供get请求方法
  static async get(url, params = {}, clearEmptyParams = true) {
    params = clearEmptyParams ? objCleanEmpty(objValueTrim(params)) : params;
    return axiosInstance.request({
      method: 'GET',
      url,
      params,
    });
  }

  // 提供post请求
  static async post(url, postData, clearEmptyData = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axiosInstance.post(url, postData);
  }

  // 提供patch请求
  static async patch(url, postData = {}, clearEmptyData = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axiosInstance.patch(url, objValueTrim(postData ?? {}));
  }

  // 提供put方法
  static async put(url, postData = {}, clearEmptyData = true) {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axiosInstance.put(url, postData);
  }

  // 提供delete请求
  static async delete(url, postData = []) {
    return axiosInstance.delete(`${url}`, { body: postData });
  }
}
