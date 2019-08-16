import { MutationTree, ActionTree } from 'vuex';

export interface IHomeState {
  title: string;
}

const state: IHomeState = {
  title: '主页',
};

export interface RootState {
  homeStore: IHomeState;
}

export enum TYPES {
  SET_TITLE = 'SET_TITLE',
}

const mutations: MutationTree<IHomeState> = {
  [TYPES.SET_TITLE](s: IHomeState, title: string) {
    s.title = title;
  },
};

const actions: ActionTree<IHomeState, RootState> = {
  setTitle({ commit }, params) {
    commit(TYPES.SET_TITLE, params);
  },
};

export const homeStore = {
  namespaced: true,
  state,
  mutations,
  actions,
};
