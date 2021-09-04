import { ActionTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../index'; // 全局状态 root state 从src/store/index.ts里定义导出

// 定义app里state类型
export interface IAppState {
  sidebar: {
    // 定义sidebar相关状态
    opened: boolean; // 菜单导航展开时true 收缩时false
  };
}

// 定义mutations
const mutations: MutationTree<IAppState> = {
  TOGGLE_SIDEBAR(state) {
    // 这块儿就会有类型提示 写state.sidebar 都会提示
    state.sidebar.opened = !state.sidebar.opened;
  },
};

// 定义actions
const actions: ActionTree<IAppState, IRootState> = {
  toggleSidebar({ commit }) {
    // 切换sidebar 收缩状态
    commit('TOGGLE_SIDEBAR');
  },
  // test_action({ commit }, payload: string) { // action如果有payload自己定义类型就行
  // }
};

// 定义module
const app: Module<IAppState, IRootState> = {
  // 用了命名空间 store.dispatch('模块名/action函数名')
  // 获取state就要 store.state.app.sidebar (store.state.模块名.状态)
  namespaced: true,
  state: {
    sidebar: {
      // 定义sidebar相关状态
      opened: true, // 菜单导航展开时true 收缩时false
    },
  },
  mutations,
  actions,
};

export default app;
