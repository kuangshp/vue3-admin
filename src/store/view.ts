/*
 * @Description:定义项目中需要使用到的store
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-08-16 15:38:58
 * @LastEditors: 水痕
 * @LastEditTime: 2019-08-16 15:50:54
 */
import { MutationTree, ActionTree } from 'vuex';

export interface IViewState {
  sidebarOpened: boolean;
  title: string;
}

const state: IViewState = {
  sidebarOpened: true,
  title: '主页',
};

export interface RootState {
  viewStore: IViewState;
}

export enum TYPES {
  OPEN_SIDEBAR = 'OPEN_SIDEBAR', // 打开侧边栏
  CLOSE_SIDEBAR = 'CLOSE_SIDEBAR', // 关闭侧边栏
  SET_TITLE = 'SET_TITLE',
}

const mutations: MutationTree<IViewState> = {
  [TYPES.OPEN_SIDEBAR](s: IViewState) {
    s.sidebarOpened = true;
  },
  [TYPES.CLOSE_SIDEBAR](s: IViewState) {
    s.sidebarOpened = false;
  },
  [TYPES.SET_TITLE](s: IViewState, title: string) {
    s.title = title;
  },
};

const actions: ActionTree<IViewState, RootState> = {
  // tslint:disable-next-line:no-shadowed-variable
  toogleSidebar({ state, commit }) {
    state.sidebarOpened
      ? commit(TYPES.CLOSE_SIDEBAR)
      : commit(TYPES.OPEN_SIDEBAR);
  },

  setTitle({ commit }, params) {
    commit(TYPES.SET_TITLE, params);
  },
};

export const viewStore = {
  namespaced: true,
  state,
  mutations,
  actions,
};
