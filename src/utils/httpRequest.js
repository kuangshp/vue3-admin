import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import { isCheckTimeout } from './auth';
import { AUTH_Token_NAME, LOGOUT_CODE, APP_NAME } from '@/constant';
import { fullLoading } from './fullLoading';
import { useAppStore } from '@/stores/app';

const prefix = import.meta.env.VITE_BASE_API;
console.log('当前环境地址', prefix);

let theFullLoading = null;
let loadingIndex = 0;

const showLoading = () => {
  theFullLoading = fullLoading('数据加载中...');
};
const clearLoading = () => {
  loadingIndex > 0 && loadingIndex--;
  if (loadingIndex <= 0) {
    theFullLoading && theFullLoading.close();
  }
};

class HttpRequest {
  constructor() {
    // 基础的配置
    axios.defaults = {
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
      timeout: 20 * 1000, // 请求超时时间
      withCredentials: true, // 设置跨域
      // 数据转换
      transformRequest: [
        (data) => {
          // 对 data 进行任意转换处理
          let ret = '';
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          ret = ret.substring(0, ret.length - 1);
          return ret;
        },
      ],
    };
    // 拦截请求的
    axios.interceptors.request.use(
      (config) => this.request(config),
      (error) => this.requestError(error)
    );
    // 拦截响应
    axios.interceptors.response.use(
      (res) => this.response(res),
      (error) => this.responseError(error)
    );
  }
  /**
   * 成功请求的方法
   * @param config
   */
  request(config) {
    const appStore = useAppStore();
    const token = appStore.globalToken;
    if (token) {
      // 判断token是否超时
      if (isCheckTimeout()) {
        // 退出登录
        appStore.logout();
        return Promise.reject(new Error('token 失效'));
      }
      config.headers[AUTH_Token_NAME] = token;
    }
    // 配置请求头
    config.headers['X-Origin'] = APP_NAME;
    if (!config.headers['Content-Type']) {
      if (typeof config.data == 'string') {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      }
    }
    // 处理请求地址
    const input = config.url;
    config.url = `${prefix}${input}`;
    // 处理缓存
    config = this.delBrowserCache(config);
    // 判断加载中
    if (!loadingIndex) {
      showLoading();
    }
    loadingIndex++;
    return config;
  }

  /**
   * 成功响应的方法
   * @param response
   */
  response(response) {
    const status = response.status;
    clearLoading(); // 隐藏加载中
    const { url, method, data } = response.config;
    if ((status >= 200 && status < 300) || status === 304) {
      // 单独处理文件下载开始
      if (/application\/x-msdownload/.test(response.headers['content-type'])) {
        // 文件下载
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', decodeURIComponent(response.headers['download'])); // 文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      } else if (response.headers['content-type'] === 'application/zip') {
        // 文件流下载
        const url = window.URL.createObjectURL(new Blob([data], { type: 'application/zip;' }));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute(
          'download',
          decodeURIComponent(response.headers['content-disposition']).match(/filename=(.*\.zip)/)[1]
        ); // 文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      } else if (/ms-excel/.test(response.headers['content-type'])) {
        // excel文件下载
        const url = window.URL.createObjectURL(
          new Blob([data], { type: 'application/vnd.ms-excel;' })
        );
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute(
          'download',
          decodeURIComponent(response.headers['content-disposition']).match(
            /filename=(.*\.xlsx)/
          )[1]
        ); // 文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      } else if (/application\/octet-stream/.test(response.headers['content-type'])) {
        // octet-stream文件下载
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        const disposition = decodeURIComponent(response.headers['content-disposition']);
        link.setAttribute('download', disposition.split('=')[1]); // 文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(url); // 释放掉blob对象
      }
      // 单独处理文件下载结束
      if (response?.data) {
        const { code, message, result } = response.data;
        if (Object.is(code, 0)) {
          // ElMessage.success(message);
          return Promise.resolve({ code, message, result });
        } else {
          if (code === LOGOUT_CODE) {
            const appStore = useAppStore();
            // 退出登录
            appStore.logout();
          } else {
            ElMessage.error(message);
            // 将失败的接口打印到控制台上
            this.printPanel('后端返回失败', { method, url, data });
            return Promise.reject(message);
          }
        }
      } else {
        ElNotification.error({
          title: '错误提示',
          message: data.message,
        });
        // 将失败的接口打印到控制台上
        this.printPanel('请求没data', { method, url, data });
        return Promise.reject(response);
      }
    } else {
      ElNotification.error({
        title: '错误提示',
        message: data.message,
      });
      // 将失败的接口打印到控制台上
      this.printPanel('http请求失败', { method, url, data });
      return Promise.reject(response);
    }
  }

  /**
   * 响应失败的方法(根据自己的业务逻辑写)
   * @param error
   */
  requestError(error) {
    clearLoading(); // 关闭加载中
    let errorMsgObj = {};
    if (error && error.response && error.response.status) {
      let $path = '';
      let $errorInfo = '';
      if (error.response.data) {
        const { path, data } = error.response.data;
        $path = path;
        $errorInfo = Array.isArray(data.error) ? data.error.join(',') : data.error;
      }
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          console.log(`请求错误:${$path}-${$errorInfo}`);
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        case 401:
          error.message = null;
          console.log('你没有登录,请先登录');
          window.localStorage.clear();
          window.sessionStorage.clear();
          window.location.reload();
          break;
        // 跳转登录页面
        case 403:
          error.message = '拒绝访问';
          console.log('登录过期，请重新登录');
          // 清除全部的缓存数据
          window.localStorage.clear();
          window.location.reload();
          break;
        // 404请求不存在
        case 404:
          error.message = '请求地址错误';
          console.log('网络请求不存在');
          break;
        case 408:
          error.message = '请求超时';
          console.log('请求超时');
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        // 其他错误，直接抛出错误提示
        default:
          console.log('我也不知道是什么错误');
          break;
      }
      errorMsgObj = {
        retCode: error.response.status || '',
        data: '',
        message: error.message,
      };
    } else {
      errorMsgObj = {
        message: '未知错误',
      };
    }
    // 错误提示
    errorMsgObj.message &&
      ElNotification({
        title: '错误提示',
        message: errorMsgObj.message,
      });
    return Promise.reject(errorMsgObj);
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
        config.url =
          config.url.indexOf('?') > -1
            ? config.url + '&t=' + this.generateNumber
            : config.url + '?t=' + this.generateNumber;
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

export const httpRequest = new HttpRequest();
