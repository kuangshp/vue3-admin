import axios, { type ApiResponse } from '@/utils/httpRequest';
import { objCleanEmpty, objValueTrim } from '@/utils';

export default class BaseService {
  // 提供get请求方法
  static async get(
    url: string,
    params: Record<string, any> = {},
    clearEmptyParams = true
  ): Promise<ApiResponse> {
    params = clearEmptyParams ? objCleanEmpty(objValueTrim(params)) : params;
    return axios.request({
      method: 'GET',
      url,
      params,
    });
  }

  // 提供post请求
  static async post(
    url: string,
    postData: Record<string, any>,
    clearEmptyData = true
  ): Promise<ApiResponse> {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axios.post(url, postData);
  }

  // 提供patch请求
  static async patch(
    url: string,
    postData: Record<string, any> = {},
    clearEmptyData = true
  ): Promise<ApiResponse> {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axios.patch(url, objValueTrim(postData ?? {}));
  }

  // 提供put方法
  static async put(
    url: string,
    postData: Record<string, any> = {},
    clearEmptyData = true
  ): Promise<ApiResponse> {
    postData = clearEmptyData ? objCleanEmpty(objValueTrim(postData)) : objValueTrim(postData);
    return axios.put(url, postData);
  }

  // 提供delete请求
  static async delete(url: string): Promise<ApiResponse> {
    return axios.delete(`${url}`);
  }
}
