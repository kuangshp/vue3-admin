import { defineStore } from 'pinia';
import router, { constantRoutes } from './../router';
import { axiosInstance } from '@/utils';
import { getTreeList, formatMenusTree } from '@/utils';

const defaultInitState = {
  globalUserInfo: {},
  globalToken: null,
  sidebarOpened: true,
  size: 'default',
  language: 'zh-CN',
  menuFromServer: true,
  serverMenu: [],
}
export const useAppStore = defineStore('app', {
  state: () => ({ ...defaultInitState }),
  getters: {
    appCurrentSetting(state) {
      return { ...state };
    },
    appAsyncMenus(state) {
      return state.serverMenu;
    },
  },
  actions: {
    toggleSidebar() {
      this.sidebarOpened = !this.sidebarOpened;
    },
    // 设置token
    setGlobalToken(token) {
      this.globalToken = token;
    },
    clearGlobalToken() {
      this.globalUserInfo = {};
      this.globalToken = null;
      this.sidebarOpened = true;
      this.size = 'default';
      this.language = 'zh-CN';
      this.menuFromServer = true;
      this.serverMenu = [];
    },
    // 设置服务器菜单
    setServerMenu(menuData) {
      this.serverMenu = [
        ...constantRoutes,
        ...formatMenusTree(getTreeList(menuData, 'id', 'parentId')),
      ];
    },
    setGlobalUserInfo(userInfo) {
      this.globalUserInfo = userInfo;
    },
    // 刷新的时候获取菜单
    async fetchServerMenuConfig() {
      const resp = await axiosInstance.get('/menu');
      // 直接请求刷新接口
      const menuData = formatMenusTree(getTreeList(resp.result, 'id', 'parentId'));
      this.serverMenu = [...constantRoutes, ...menuData];
    },
    logout() {
      this.clearGlobalToken();
      window.localStorage.clear();
      router.push('/login');
    }
  },
  // 数据持久化
  persist: true,
});
