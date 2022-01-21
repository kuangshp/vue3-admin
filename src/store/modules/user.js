// import { TOKEN } from '@/constant';
import * as types from '../mutation-types';
// import router from '@/router';
export default {
  namespaced: true, // 命名模块
  state: () => ({
    token: '',
    userInfo: {},
  }),
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token;
      // 存储到本地
      // setItem(TOKEN, token);
    },
    [types.SET_USER_INFO](state, info) {
      state.userInfo = info;
    },
  },
  actions: {},
};
