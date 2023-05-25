import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebarOpened: true,
      globalToken: null,
      globalUserInfo: null,
      size: 'default',
      language: 'zh-CN',
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
      this.globalToken = null;
    },
    setGlobalUserInfo(userInfo) {
      this.globalUserInfo = userInfo;
    },
  },
  // 数据持久化
  persist: true,
});
