import * as types from '../mutation-types';
import { storage } from '@/utils';
import { authToken } from '@/constants';
// import router from '@/router';
export default {
  namespaced: true, // 命名模块
  state: () => ({
    token: storage.getItem(authToken) || '',
    userInfo: {},
  }),
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token;
      // 存储到本地
      storage.setItem(authToken, token);
    },
    [types.SET_USER_INFO](state, info) {
      state.userInfo = info;
    },
  },
  // 处理异步操作
  actions: {},
};
