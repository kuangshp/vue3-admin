import { MenusService } from '@/services';

export default {
  namespaced: true,
  state: () => ({
    menusList: [],
  }),

  mutations: {
    SET_MENUS(state, menusList) {
      state.menusList = menusList;
    },
  },
  // 异步的方法
  actions: {
    menusApi({ commit }, postData) {
      return new Promise((resolve, reject) => {
        MenusService.menusApi(postData)
          .then((res) => {
            commit('SET_MENUS', res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
