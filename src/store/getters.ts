import { GetterTree } from 'vuex';
import { IRootState } from './index';

// 定义全局getters
const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  // themeColor: (state) => state.settings.theme,
  // menusTree: (state) => state.menu.menuTreeData,
  // roles: (state) => state.user.roles,
  // roleIds: (state) => (state.user.roles || []).map((role) => role.id),
  // roleNames: (state) => (state.user.roles || []).map((role) => role.name),
};

export default getters;
