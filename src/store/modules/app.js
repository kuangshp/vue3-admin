export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true, // 左侧伸缩开关
  }),
  // 同步的方法
  mutations: {
    // 切换是否隐藏
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
  },
  // 异步的方法
  actions: {},
};
