import * as types from '../mutation-types';
const state = {
  sidebarOpened: true,
  title: '主页',
  menuList: [],
  currentUserInfo: {},
};

const getters = {
  // tslint:disable-next-line:no-shadowed-variable
  sidebarOpened: (state) => state.sidebarOpened,
  currentUserInfo: (state) => state.currentUserInfo,
};

const mutations = {
  [types.OPEN_SIDEBAR] (s) {
    s.sidebarOpened = true;
  },
  [types.CLOSE_SIDEBAR] (s) {
    s.sidebarOpened = false;
  },
  [types.SET_TITLE] (s, title) {
    s.title = title;
  },
  [types.SET_SIDE_MENU]: (s, payload) => {
    s.menuList = payload;
  },
  [types.SET_CURRENT_USER_INFO]: (s, payload) => {
    s.currentUserInfo = payload;
  }
};

const actions = {
  toggleSidebar ({ state, commit }) {
    state.sidebarOpened
      ? commit(types.CLOSE_SIDEBAR)
      : commit(types.OPEN_SIDEBAR);
  },

  setTitle ({ commit }, params) {
    commit(types.SET_TITLE, params);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};