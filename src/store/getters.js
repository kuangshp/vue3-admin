const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  sidebarOpened: (state) => state.app.sidebarOpened,
};

export default getters;
