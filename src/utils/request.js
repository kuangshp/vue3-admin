import axios from 'axios';
import { ElMessage } from 'element-plus';
import { isCheckTimeout } from '@/utils';
import store from '@/store';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 判断token是否超时
      if (isCheckTimeout()) {
        // 登出操作
        store.dispatch('user/logout');
        return Promise.reject(new Error('token 失效'));
      }
      // 如果token存在 注入token
      // config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config; // 必须返回配置
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { code, message, data } = response.data;
    //   要根据success的成功与否决定下面的操作
    if (Object.is(code, 0)) {
      // 成功返回解析后的数据
      return data;
    } else {
      // 失败(请求成功，业务失败)，消息提示
      ElMessage.error(message); // 提示错误消息
      return Promise.reject(new Error(message));
    }
  },
  // 请求失败
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      // token超时
      // store.dispatch('user/logout');
    }
    ElMessage.error(error.message); // 提示错误信息
    return Promise.reject(error);
  },
);

export default service;
