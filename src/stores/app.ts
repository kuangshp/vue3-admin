import { defineStore } from 'pinia';
import router, { constantRoutes } from '@/router';
import axios from '@/utils/httpRequest';
import { getTreeList } from '@/utils/tree';
import { formatMenusTree } from '@/utils/menus';
import type { UserInfo } from '@/types';

const menuFromServer = true;

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    globalToken: null as string | null,
    globalUserInfo: null as UserInfo | null,
    size: 'default' as string,
    language: 'zh-CN' as string,
    menuFromServer: menuFromServer, // 是否加载后端菜单
    serverMenu: [], // 服务器菜单
  }),

  getters: {
    appCurrentSetting: (state) => {
      return { ...state };
    },
    appAsyncMenus: (state) => {
      return state.serverMenu;
    },
  },
  actions: {
    toggleSidebar(): void {
      this.sidebarOpened = !this.sidebarOpened;
    },
    // 设置token
    setGlobalToken(token: string): void {
      this.globalToken = token;
    },
    clearGlobalToken(): void {
      this.globalUserInfo = {};
      this.globalToken = null;
      this.sidebarOpened = true;
      this.size = 'default';
      this.language = 'zh-CN';
      this.menuFromServer = menuFromServer;
      this.serverMenu = [];
    },
    // 设置服务器菜单
    setServerMenu(menuData: any[]): void {
      this.serverMenu = [
        ...constantRoutes,
        ...formatMenusTree(getTreeList(menuData, 'id', 'parentId')),
      ];
    },
    setGlobalUserInfo(userInfo: UserInfo): void {
      this.globalUserInfo = userInfo;
    },
    // 刷新的时候获取菜单
    async fetchServerMenuConfig(): Promise<void> {
      const resp = (await axios.get('/menu')) as any;
      // 直接请求刷新接口
      const menuData = formatMenusTree(getTreeList(resp.result, 'id', 'parentId'));
      this.serverMenu = [...constantRoutes, ...menuData];
    },
    logout(): void {
      this.clearGlobalToken();
      window.localStorage.clear();
      router.push('/login');
    },
  },
  // 数据持久化
  // persist: true,
  persist: {
    storage: localStorage,
    paths: ['size', 'language', 'globalToken', 'globalUserInfo'], // 只持久化这两个字段
    // 或者使用 exclude 排除特定字段
    // exclude: ['serverMenu']
  },
});
