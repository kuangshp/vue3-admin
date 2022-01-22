import { storage } from '@/utils';
import { authToken } from '@/constants';
import { LoginService } from '@/services';
// import router from '@/router';
export default {
  namespaced: true, // 命名模块
  state: () => ({
    token: storage.getItem(authToken) || '',
    userInfo: {},
  }),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      // 存储到本地
      storage.setItem(authToken, token);
    },
    SET_USER_INFO(state, info) {
      state.userInfo = info;
    },
  },
  // 处理异步操作
  actions: {
    loginApi({ commit }, postData) {
      return new Promise((resolve, reject) => {
        LoginService.loginApi(postData)
          .then((res) => {
            commit('SET_TOKEN', res.token);
            commit('SET_USER_INFO', res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
