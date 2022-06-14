import { setItem, getItem, removeAllItem } from '@/utils';
import { TOKEN } from '@/constant';
import { setTimeStamp } from '@/utils/auth';
import { LoginService } from '@/services';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    // token：初次获取本地token实现自动登录效果，获取不到才赋值为空字符串
    token: getItem(TOKEN) || '',
    // 用户信息
    userInfo: {},
  }),
  mutations: {
    // 保存token：保存在vuex和本地localStorage
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    // 保存用户信息
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
            // this.commit('user/setToken', data.token)
            commit('setToken', data.token);
            // 保存登录时间
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
      // 可以使用this进行调用其他模块的action
      // this.commit('user/setToken', '')
      // this.commit('user/setUserInfo', {})
      // 清除token
      commit('setToken', '');
      // 清除用户信息
      commit('setUserInfo', {});
      // 清楚本地所有缓存数据
      removeAllItem();
      // 退回到登录页面
      router.push('/login');
    },
  },
};
