import Vue from 'vue';
import { authToken } from '@/config';
import { storage } from './storage';

export const auth = (
  to: any,
  from: any,
  next: (arg0: { name: string; query: { backUrl: any } }) => void,
) => {
  // 如果是要授权登录的且当前本地存储中不存在用户邮箱的跳转到登录页面
  if (!to.meta.unauth && !storage.getItem(authToken)) {
    Vue.prototype.$notify({
      title: '退出提示',
      message: '登录超时',
    });
    next({ name: 'login', query: { backUrl: to.fullPath } });
  }
};
