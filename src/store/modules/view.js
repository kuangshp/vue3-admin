import * as types from '../mutation-types';
const state = {
  sidebarOpened: true,
  title: '主页',
  menuList: [
    {
      icon: 'el-icon-s-order',
      index: 'table',
      title: '基础表格'
    },
    {
      icon: 'el-icon-s-marketing',
      index: 'tab',
      title: 'tab选项卡'
    },
    {
      icon: 'el-icon-folder-opened',
      index: 'form',
      title: '表单相关',
      children: [
        {
          index: 'base_form',
          title: '基本表单',
          icon: 'el-icon-s-data',
        },
        {
          index: 'upload',
          title: '文件上传'
        }
      ]
    }
  ],
};

const getters = {
  // tslint:disable-next-line:no-shadowed-variable
  sidebarOpened: (state) => state.sidebarOpened,
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