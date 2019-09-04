import MenusService from '@/servers/Menus';
import { errorCaptured } from '@/utils';
import { Store } from 'vuex';

export default {
  namespaced: true,
  state: {
    menus: [],
  },
  mutations: {
    sideMeun(state: any, params: Array<{ [propsName: string]: any }>) {
      state.menus = params;
    },
  },
  actions: {
    // 获取左侧菜单接口
    async sideMeunApi({ commit }: { commit: any }) {
      const { code, message, result } = await errorCaptured(MenusService.menus)();
      commit('sideMeun', result);
      return { code, message, result };
    },
  },
};
