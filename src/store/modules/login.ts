import LoginService from '@/servers/Login';
import { errorCaptured } from '@/utils';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // 登录的接口
    async loginApi(_: any, postData: { name: string, password: string }) {
      return await errorCaptured(LoginService.login)(postData);
    },
  },
};
