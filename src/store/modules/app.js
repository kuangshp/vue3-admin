export default {
  namespaced: true,
  state: () => ({
    // 左侧是否折叠
    sidebarOpened: true,
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
  },
  actions: {},
};
