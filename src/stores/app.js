import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebarOpened: true,
      globalToken: null,
      globalUserInfo: null,
      size: 'default',
      language: 'zh-CN',
      // TODO 实际开发替换模拟后端返回的菜单列表
      authMenusList: ['account', 'resources', 'accountDetail', 'baidu', 'role', 'from', 'table'],
    };
  },
  getters: {},
  actions: {
    toggleSidebar() {
      this.sidebarOpened = !this.sidebarOpened;
    },
    // 设置token
    setGlobalToken(token) {
      this.globalToken = token;
    },
    clearGlobalToken() {
      // this.authMenusList = [];
      this.globalUserInfo = {};
      this.globalToken = null;
    },
    setGlobalUserInfo(userInfo) {
      this.globalUserInfo = userInfo;
    },
  },
  // 数据持久化
  persist: true,
});
