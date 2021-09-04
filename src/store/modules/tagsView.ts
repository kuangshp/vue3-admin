import { Module, ActionTree, MutationTree } from 'vuex';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import { IRootState } from '@/store';

// 携带fullPath
export interface RouteLocationWithFullPath extends RouteRecordNormalized {
  fullPath?: string;
}
export interface ITagsViewState {
  // 存放当前显示的tags view集合
  visitedViews: RouteLocationWithFullPath[];
}

// 定义mutations
const mutations: MutationTree<ITagsViewState> = {
  // 添加可显示tags view
  ADD_VISITED_VIEW(state, view) {
    // 过滤去重
    if (state.visitedViews.some((v) => v.path === view.path)) return;
    // 没有titles时处理
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'tag-name',
      })
    );
  },
  DEL_VISITED_VIEW(state, view) {
    const i = state.visitedViews.indexOf(view);
    if (i > -1) {
      state.visitedViews.splice(i, 1);
    }
  },
};

// 定义actions
const actions: ActionTree<ITagsViewState, IRootState> = {
  // 添加tags view
  addView({ dispatch }, view: RouteRecordRaw) {
    dispatch('addVisitedView', view);
  },
  // 添加可显示的tags view 添加前commit里需要进行去重过滤
  addVisitedView({ commit }, view: RouteRecordRaw) {
    commit('ADD_VISITED_VIEW', view);
  },
  // 删除tags view
  delView({ dispatch }, view: RouteRecordRaw) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view);
      resolve(null);
    });
  },
  // 从可显示的集合中 删除tags view
  delVisitedView({ commit }, view: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', view);
  },
};

const tagsView: Module<ITagsViewState, IRootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
  },
  mutations,
  actions,
};

export default tagsView;
