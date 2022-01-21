import axios from 'axios';
// import axiosRetry from 'axios-retry';
import { storage } from './storage';
import { authToken } from '../constants';
import { ElMessage } from 'element-plus';
const prefix = process.env.VUE_APP_API_URL;
console.log(process.env, '当前环境', prefix);
class Request {
  constructor() {
    // 基础的配置
    axios.defaults = {
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
      timeout: 60000,
      transformRequest: [
        (data) => {
          // 对 data 进行任意转换处理
          let ret = '';
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          ret = ret.substr(0, ret.length - 1);
          return ret;
        },
      ],
    };
    // 拦截请求的
    axios.interceptors.request.use(
      (config) => this.request(config),
      (rejection) => this.requestError(rejection),
    );
    // 拦截响应
    axios.interceptors.response.use(
      (res) => this.response(res),
      (error) => this.responseError(error),
    );
  }
  /**
   * 成功请求的方法
   * @param config
   */
  request(config) {
    // 配置请求头
    config.headers['X-Origin'] = 'admin-web';
    config.headers[authToken] = storage.getItem(authToken);
    // 处理请求地址
    const input = config.url;
    config.url = `${prefix}${input}`;
    // 处理缓存
    config = this.delBrowserCache(config);
    return config;
  }

  /**
   * 失败请求的方法
   * @param rejection
   */
  requestError(rejection) {
    return Promise.reject(rejection.data);
  }

  /**
   * 成功响应的方法
   * @param response
   */
  response(response) {
    const status = response.status;
    const { url, method, data } = response.config;
    if ((status >= 200 && status < 300) || status === 304) {
      if (response?.data) {
        const { code, message, result } = response.data;
        if (Object.is(code, 0)) {
          return Promise.resolve(result);
        } else {
          ElMessage.error(message);
          // 将失败的接口打印到控制台上
          this.printPanel('后端返回失败', { method, url, data });
          return Promise.reject(message);
        }
      } else {
        // 将失败的接口打印到控制台上
        this.printPanel('请求没data', { method, url, data });
        return Promise.reject(response);
      }
    } else {
      // 将失败的接口打印到控制台上
      this.printPanel('http请求失败', { method, url, data });
      return Promise.reject(response);
    }
  }

  /**
   * 响应失败的方法(根据自己的业务逻辑写)
   * @param error
   */
  responseError(error) {
    if (error.response && error.response.status) {
      let $path = '';
      let $errorInfo = '';
      if (error.response.data) {
        const { path, data } = error.response.data;
        $path = path;
        $errorInfo = Array.isArray(data.error) ? data.error.join(',') : data.error;
      }
      switch (error.response.status) {
        case 400:
          console.log(`错误的请求:${$path}-${$errorInfo}`);
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        case 401:
          console.log('你没有登录,请先登录');
          window.location.reload();
          break;
        // 跳转登录页面
        case 403:
          console.log('登录过期，请重新登录');
          // 清除全部的缓存数据
          window.localStorage.clear();
          window.location.reload();
          break;

        // 404请求不存在
        case 404:
          console.log('网络请求不存在');
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log('我也不知道是什么错误');
          break;
      }
    }
    return error.response ? Promise.reject(error.response) : Promise.reject(error);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-05-21 15:50:15
   * @LastEditors: 水痕
   * @Description: 将错误打印在控制台上
   * @param {*}
   * @return {*}
   */
  printPanel(type, params) {
    const str = `
    ==================${type}=======================>
    请求方式: ${params?.method} \n
    请求的url: ${params?.url} \n
    请求体: ${params?.data}
    <=========================================
    `;
    console.log(str);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-11-19 20:33:42
   * @LastEditors: 水痕
   * @Description: 生成随机字符串
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  delBrowserCache(config) {
    if (config.method) {
      // IE上的同一个url请求会走cache
      if (config.method.toLowerCase() === 'post' && config.url) {
        config.url = config.url.indexOf('?') > -1 ? config.url + '&t=' + this.generateNumber : config.url + '?t=' + this.generateNumber;
      } else if (config.method.toLowerCase() === 'get') {
        config.params = {
          t: this.generateNumber,
          ...config.params,
        };
      }
    }
    return config;
  }

  get generateNumber() {
    return Number.parseInt(String(Math.random() * 10000000000));
  }
}

export const request = new Request();
