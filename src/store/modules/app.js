export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, // 左侧伸缩开关
    tagsViewList: [],
  }),
  // 同步的方法
  mutations: {
    // 切换是否隐藏
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    // 添加tags
    addTagsViewList(state, tag) {
      // 如果之前添加的就不添加了
      const isFind = state.tagsViewList.find((item) => item.path === tag.path);
      if (!isFind) {
        state.tagsViewList.push(tag);
      }
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1);
        return;
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        state.tagsViewList.splice(0, payload.index);
        return;
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        return;
      }
    },
  },
  // 异步的方法
  actions: {},
};
