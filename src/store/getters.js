const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  sidebarOpened: (state) => state.app.sidebarOpened,
  tagsViewList: (state) => state.app.tagsViewList,
};

export default getters;
