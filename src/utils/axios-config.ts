/*
 * @Description:对axios请求的封装
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-08-16 16:57:42
 * @LastEditors: 水痕
 * @LastEditTime: 2019-08-21 10:21:16
 */

import axios from 'axios';
import { storage } from './storage';
import { prefix, iamPrefix } from '@/api';
import { authMobile, authToken } from '@/config';

export const axiosConfig = (): void => {
  // 判断是不是正常的网站
  function isHttpUrl(input: string) {
    return /^https?:\/\//.test(input);
  }
  // 判断是不是图片请求
  function isIamUrl(input: string) {
    return /^(sso|iam|iam-.*)\//.test(input);
  }

  function isPlainRequest(input: string) {
    return /\.(html?|xml|txt)$/.test(input);
  }

  function useOrigin(res: any) {
    return res.config.useOrigin;
  }

  /********************************封装请求的 start********************************/
  function request(config: { [propsName: string]: any }) {
    // 配置请求头
    config.headers['X-Origin'] = 'admin-web';
    config.headers[authToken] = storage.getItem(authToken);
    config.headers[authMobile] = storage.getItem(authMobile);

    // 处理请求地址
    const input = config.url;
    if (isHttpUrl(input)) {
      config.url = input;
    } else if (isIamUrl(input)) {
      config.url = `${iamPrefix}${input}`;
    } else {
      config.url = `${prefix}${input}`;
    }
    return config;
  }
  function requestError(rejection: { data: any }) {
    return useOrigin(rejection)
      ? Promise.reject(rejection)
      : Promise.reject(rejection.data);
  }
  /********************************封装请求的 end********************************/

  /********************************请求响应的 start********************************/
  function response(res: any) {
    return isPlainRequest(res.config.url) || useOrigin(res) ? res : res.data;
  }
  function responseError(error: any) {
    return Promise.reject(error);
  }
  /********************************请求响应的 end********************************/
  axios.defaults.timeout = 60 * 1000;
  // 拦截请求的
  axios.interceptors.request.use(request, requestError);
  // 拦截响应
  axios.interceptors.response.use(response, responseError);
};

// class AxiosRequest {
//   private baseUrl: string;
//   private timeout: number;
//   constructor(baseUrl: string = prefix, timeout: number = 60 * 1000) {
//     this.baseUrl = baseUrl;
//     this.timeout = timeout;
//   }

//   public request(config: { [propsName: string]: any }) {
//     const instance = axios.create({
//       baseURL: this.baseUrl,
//       timeout: this.timeout,
//     });
//     /********************************设置请求拦截 start********************************/
//     instance.interceptors.request.use(this.requestSuccess, this.requestError);
//     /********************************设置请求拦截 end********************************/
//     /********************************设置响应拦截 start********************************/
//     instance.interceptors.response.use(
//       this.responseSuccess,
//       this.responseError,
//     );
//     /********************************设置响应拦截 end********************************/
//     return instance(config);
//   }

//   private requestSuccess(config: { [propsName: string]: any }) {
//     config.headers['X-Origin'] = 'admin-web';
//     config.headers[authToken] = storage.getItem(authToken);
//     config.headers[authMobile] = storage.getItem(authMobile);
//     return config;
//   }

//   private requestError(rejection: { data: any }) {
//     return this.useOrigin(rejection)
//       ? Promise.reject(rejection)
//       : Promise.reject(rejection.data);
//   }

//   private responseSuccess(res: any): any {
//     return this.isPlainRequest(res.config.url) || this.useOrigin(res)
//       ? res
//       : res.data;
//   }

//   private responseError(error: any) {
//     return Promise.reject(error);
//   }

//   private useOrigin(res: any) {
//     return res.config.useOrigin;
//   }

//   private isPlainRequest(input: string) {
//     return /\.(html?|xml|txt)$/.test(input);
//   }
// }

// export const axiosConfig = new AxiosRequest();
