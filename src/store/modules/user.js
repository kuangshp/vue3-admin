import { setTimeStamp } from '@/utils/auth';
import { LoginService } from '@/services';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    // token：初次获取本地token实现自动登录效果，获取不到才赋值为空字符串
    token: '',
    userInfo: {},
  }),
  mutations: {
    // 保存token：保存在vuex和本地localStorage
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 登录逻辑
    login(context, userInfo) {
      const { commit } = context;
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        LoginService.loginApi({
          username,
          password,
        })
          .then((data) => {
            const { result } = data;
            commit('setToken', result.token);
            commit('setUserInfo', result);
            // 保存登录时间(用于做主动退出)
            setTimeStamp();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 退出登录逻辑
    logout({ commit }) {
      // 清除token
      commit('setToken', '');
      commit('setUserInfo', {});
      // 清楚本地所有缓存数据
      window.localStorage.clear();
      window.sessionStorage.clear();
      // 退回到登录页面
      router.push('/login');
    },
  },
};
