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
      console.log('进来了', tag);
      // 如果之前添加的就不添加了
      const isFind = state.tagsViewList.find((item) => item.path === tag.path);
      if (!isFind) {
        state.tagsViewList.push(tag);
      }
    },
  },
  // 异步的方法
  actions: {},
};
