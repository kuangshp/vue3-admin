import { defineStore } from 'pinia';
import router, { constantRoutes } from '@/router';
import { filterAsyncRouter } from '@/utils';
import { MenusService,  AccountService } from '@/services';
import { routeList } from './../../routest'; // 模拟本地菜单


export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sidebarOpened: true,
      globalToken: null,
      globalUserInfo: null,
      size: 'default',
      language: 'zh-CN',
      roles: [], // 返回的角色列表
      // TODO 实际开发替换模拟后端返回的菜单列表
      authMenusList: [],
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
    // 动态路由遍历，验证是否具备权限
    filterDynamicRoutes(routes) {
      const res = [];
      routes.forEach((route) => {
        if (route.permissions) {
          if (auth.hasPermiOr(route.permissions)) {
            res.push(route);
          }
        } else if (route.roles) {
          if (auth.hasRoleOr(route.roles)) {
            res.push(route);
          }
        }
      });
      return res;
    },
    // 模拟获取菜单接口
    getMenusApi() {
      return new Promise((resolve) => {
        MenusService.getMenusApi().then((response) => {
          const { code, result } = response;
          if (Object.is(code, 0)) {
            const sidebarRoutes = filterAsyncRouter(result);
            this.authMenusList = constantRoutes.concat(sidebarRoutes);
            resolve(sidebarRoutes);
          } else {
            this.logout();
          }
        });
        // TODO　模拟数据
        // const sidebarRoutes = filterAsyncRouter(routeList);
        // this.authMenusList = constantRoutes.concat(sidebarRoutes);
        // resolve(sidebarRoutes);
      });
    },
    // 获取当前登录用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        AccountService.getListApi()
          .then((res) => {
            // TODO 需要完善下
            // const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              // this.permissions = res.permissions
            } else {
              this.roles = ['admin'];
            }
            this.setGlobalUserInfo(res.result);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    clearGlobalToken() {
      this.globalToken = null;
      this.authMenusList = [];
    },
    setGlobalUserInfo(userInfo) {
      this.globalUserInfo = userInfo;
    },
    logout() {
      // 登出操作
      this.clearGlobalToken();
      window.localStorage.clear();
      router.push('/login');
    },
  },
  // 数据持久化
  // persist: true,
});
