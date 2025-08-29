import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ElMessage, ElNotification } from 'element-plus';
import { AUTH_TOKEN_NAME, LOGOUT_CODE } from '@/constant';
import { fullLoading } from './fullLoading';
import { useAppStore } from '@/stores/app';

// 定义API响应接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  result: T;
}

// 扩展Axios原生类型
declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean; // 是否显示加载状态
    showError?: boolean; // 是否显示错误提示
    retry?: boolean; // 是否自动重试
  }
}

// 创建自定义Axios实例
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 30000, // 30秒超时
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });

  let loadingInstance: ReturnType<typeof fullLoading> | null = null;
  const isRefreshing = false;
  const requestQueue: Array<() => void> = [];

  // 显示加载状态
  const showLoading = () => {
    if (!loadingInstance) {
      loadingInstance = fullLoading('数据加载中...');
    }
  };

  // 隐藏加载状态
  const hideLoading = () => {
    loadingInstance?.close();
    loadingInstance = null;
  };

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const appStore = useAppStore();
      const token = appStore.globalToken || localStorage.getItem(AUTH_TOKEN_NAME);

      // 添加token到请求头
      if (token && config.headers) {
        config.headers[AUTH_TOKEN_NAME] = token;
      }

      // 显示加载状态
      if (config.showLoading !== false) {
        showLoading();
      }

      // 防止GET请求缓存
      if (config.method?.toLowerCase() === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
      }

      return config;
    },
    (error: AxiosError) => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      hideLoading();
      if (response.headers['content-type'].startsWith('image/png')) {
        return Promise.resolve(response.data);
      }
      const { data, config } = response;
      const { code, message } = data;
      // 成功响应
      if (code === 0) {
        return data;
      }

      // 登录过期处理
      if (code === LOGOUT_CODE) {
        const appStore = useAppStore();
        appStore.logout();
        ElMessage.warning('登录过期，请重新登录');
        return Promise.reject(new Error(message));
      }

      // 其他错误处理
      if (config.showError !== false) {
        ElMessage.error(message || '请求失败');
      }

      return Promise.reject(new Error(message || '请求失败'));
    },
    (error: AxiosError) => {
      hideLoading();

      const status = error.response?.status;

      // 登录过期
      if (status === 401) {
        const appStore = useAppStore();
        appStore.logout();
        ElMessage.warning('登录过期，请重新登录');
        return Promise.reject(error);
      }

      // 服务器错误
      if (status && status >= 500) {
        ElNotification.error({
          title: '错误提示',
          message: '服务器错误，请稍后再试',
        });
        return Promise.reject(error);
      }

      // 网络错误
      if (!error.response) {
        ElNotification.error({
          title: '错误提示',
          message: '网络错误，请检查网络连接',
        });
        return Promise.reject(error);
      }

      // 其他错误
      ElNotification.error({
        title: '错误提示',
        message: error.message || '未知错误',
      });

      return Promise.reject(error);
    }
  );

  return instance;
};

// 创建实例
const baseURL = import.meta.env.VITE_BASE_API;
console.log('当前环境地址', baseURL);

const http = createAxiosInstance(baseURL);

// 封装常用请求方法
export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.get(url, config);
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return http.post(url, data, config);
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return http.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return http.delete(url, config);
  },
};

export default http;
