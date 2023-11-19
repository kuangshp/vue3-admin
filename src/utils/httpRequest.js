import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import {
  AUTH_TOKEN_NAME,
  AUTH_REFRESH_TOKEN_NAME,
  LOGOUT_CODE,
  REFRESH_LOGOUT_CODE,
} from '@/constant';
import { fullLoading } from './fullLoading';
import { useAppStore } from '@/stores/app';

const prefix = import.meta.env.VITE_BASE_API;
console.log('当前环境地址', prefix);

let theFullLoading = null;
const showLoading = () => {
  theFullLoading = fullLoading('数据加载中...');
};
const clearLoading = () => {
  theFullLoading && theFullLoading.close();
};
// 刷新token避免重复请求
let refreshing = false;
const queue = [];

const printPanel = (type, params) => {
  const str = `
    ==================${type}=======================>
    请求方式: ${params?.method} \n
    请求的url: ${params?.url} \n
    请求体: ${params?.data}
    <=========================================
    `;
  console.log(str);
};

const generateNumber = () => {
  return Number.parseInt(String(Math.random() * 10000000000));
};

const delBrowserCache = (config) => {
  if (config.method) {
    // IE上的同一个url请求会走cache
    if (config.method.toLowerCase() === 'post' && config.url) {
      config.url =
        config.url.indexOf('?') > -1
          ? config.url + '&t=' + generateNumber()
          : config.url + '?t=' + generateNumber();
    } else if (config.method.toLowerCase() === 'get') {
      config.params = {
        t: generateNumber(),
        ...config.params,
      };
    }
  }
  return config;
};

export const axiosInstance = axios.create({
  baseURL: prefix,
  timeout: 3000,
});

// 请求的时候拦截器
axiosInstance.interceptors.request.use(function (config) {
  showLoading();
  const appStore = useAppStore();
  const token = appStore.globalToken;
  if (token) {
    config.headers[AUTH_TOKEN_NAME] = token;
  }
  // 配置请求头
  if (!config.headers['Content-Type']) {
    if (typeof config.data == 'string') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
  }
  return delBrowserCache(config);
});

// 响应的时候拦截器
axiosInstance.interceptors.response.use(
  async (response) => {
    const status = response.status;
    clearLoading(); // 隐藏加载中
    const { url, method, data } = response.config;
    if ((status >= 200 && status < 300) || status === 304) {
      if (response?.data) {
        // TODO 特殊处理图形验证码
        if (response.headers['content-type'].startsWith('image/svg+xml')) {
          return Promise.resolve(response.data);
        }
        const { code, message, result } = response.data;
        if (Object.is(code, 0)) {
          return Promise.resolve({ code, message, result });
        } else {
          console.log(response.status, '??11');
          if (code === LOGOUT_CODE) {
            const config = response.config;
            if (refreshing) {
              return new Promise((resolve) => {
                queue.push({
                  config,
                  resolve,
                });
              });
            }
            if (!config.url.includes('/refresh')) {
              // 刷新token
              refreshing = true;
              const { code } = await refreshToken();
              refreshing = false;
              if (code === 0) {
                queue.forEach(({ config, resolve }) => {
                  resolve(axiosInstance(config));
                });
                return axiosInstance(config);
              } else {
                ElMessage.warning('登录过期，请重新登录');
                const appStore = useAppStore();
                // 退出登录
                appStore.logout();
              }
            }
          } else if (code == REFRESH_LOGOUT_CODE) {
            const appStore = useAppStore();
            // 退出登录
            appStore.logout();
          } else {
            ElMessage.error(message);
            // 将失败的接口打印到控制台上
            printPanel('后端返回失败', { method, url, data });
            return Promise.reject(message);
          }
        }
      } else {
        ElNotification.error({
          title: '错误提示',
          message: data.message,
        });
        // 将失败的接口打印到控制台上
        printPanel('请求没data', { method, url, data });
        return Promise.reject(response);
      }
    } else {
      ElNotification.error({
        title: '错误提示',
        message: data.message,
      });
      // 将失败的接口打印到控制台上
      printPanel('http请求失败', { method, url, data });
      return Promise.reject(response);
    }
  },
  async (error) => {
    clearLoading(); // 隐藏加载中

    return error.response;
  }
);

// 刷新token
const refreshToken = async () => {
  const appStore = useAppStore();
  const result = await axiosInstance.get('/admin/refresh', {
    params: {
      token: appStore.globalRefreshToken,
    },
  });
  console.log(result, '刷新token请求');
  appStore.setGlobalToken(result.result[AUTH_TOKEN_NAME]);
  appStore.setGlobalRefreshToken(result.result[AUTH_REFRESH_TOKEN_NAME]);
  appStore.setGlobalUserInfo(result.result);
  return result;
};
