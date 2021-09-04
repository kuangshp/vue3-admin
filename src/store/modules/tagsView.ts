import { Module, ActionTree, MutationTree } from 'vuex';
import { RouteRecordRaw, RouteRecordNormalized, RouteRecordName } from 'vue-router';
import { IRootState } from '@/store';

// 携带fullPath
export interface RouteLocationWithFullPath extends RouteRecordNormalized {
  fullPath?: string;
}
export interface ITagsViewState {
  // 存放当前显示的tags view集合
  visitedViews: RouteLocationWithFullPath[];
  // 根据路由name缓存集合
  cachedViews: RouteRecordName[];
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
  // 如果路由meta.noCache没有 默认或为false代表进行缓存，为true不缓存
  // 默认缓存所有路由
  ADD_CACHED_VIEW(state, view) {
    // 只有路由有name才可缓存集合keep-alive inludes使用
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  DEL_VISITED_VIEW(state, view) {
    const i = state.visitedViews.indexOf(view);
    if (i > -1) {
      state.visitedViews.splice(i, 1);
    }
  },
  // 可删除指定的一个view缓存
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  // 清空可显示列表
  DEL_ALL_VISITED_VIEWS(state) {
    // 对于affix为true的路由 tag view 是不能删除的
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  // 清空缓存列表
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = [];
  },
  // 删除标签导航其他可显示tag 除了 affix为true 以及当前右键选中的view
  DEL_OTHERS_VISITED_VIEWS(state, view: RouteRecordRaw) {
    state.visitedViews = state.visitedViews.filter(
      (tag) => tag.meta.affix || tag.path === view.path
    );
  },
  // 删除缓存列表里其他tag 除了当前右键选中的view
  DEL_OTHERS_CACHED_VIEWS(state, view: RouteRecordRaw) {
    state.cachedViews = state.cachedViews.filter((name) => name !== view.name);
  },
};

// 定义actions
const actions: ActionTree<ITagsViewState, IRootState> = {
  // 添加tags view
  addView({ dispatch }, view: RouteRecordRaw) {
    // 添加tag时也要判断该tag是否需要缓存
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  // 添加可显示的tags view 添加前commit里需要进行去重过滤
  addVisitedView({ commit }, view: RouteRecordRaw) {
    commit('ADD_VISITED_VIEW', view);
  },
  // 添加可缓存的标签tag
  addCachedView({ commit }, view: RouteRecordRaw) {
    commit('ADD_CACHED_VIEW', view);
  },
  // 删除指定tags view
  delView({ dispatch }, view: RouteRecordRaw) {
    return new Promise((resolve) => {
      // 删除显示的路由tag
      dispatch('delVisitedView', view);
      // 删除缓存的路由
      dispatch('delCachedView', view);
      resolve(null);
    });
  },
  // 从可显示的集合中 删除tags view
  delVisitedView({ commit }, view: RouteRecordRaw) {
    commit('DEL_VISITED_VIEW', view);
  },
  // 从缓存列表删除指定tag view
  delCachedView({ commit }, view: RouteRecordRaw) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view);
      resolve(null);
    });
  },
  // 清空 可显示列表 和 缓存列表
  delAllView({ dispatch }) {
    return new Promise((resolve) => {
      // 删除显示的路由tag
      dispatch('delAllVisitedView');
      // 删除缓存的路由
      dispatch('delAllCachedViews');
      resolve(null);
    });
  },
  // 清空可显示列表
  delAllVisitedView({ commit }) {
    commit('DEL_ALL_VISITED_VIEWS');
  },
  // 清空缓存列表
  delAllCachedViews({ commit }) {
    commit('DEL_ALL_CACHED_VIEWS');
  },
  // 关闭其他tag
  delOthersViews({ dispatch }, view: RouteRecordRaw) {
    dispatch('delOthersVisitedViews', view);
    dispatch('delOthersCachedViews', view);
  },
  delOthersVisitedViews({ commit }, view: RouteRecordRaw) {
    commit('DEL_OTHERS_VISITED_VIEWS', view);
  },
  delOthersCachedViews({ commit }, view: RouteRecordRaw) {
    commit('DEL_OTHERS_CACHED_VIEWS', view);
  },
};

const tagsView: Module<ITagsViewState, IRootState> = {
  namespaced: true,
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations,
  actions,
};

export default tagsView;
