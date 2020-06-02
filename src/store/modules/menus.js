import MenuService from '@/services/menu';
import { constantRoutes } from '@/router/constant-routes';

/**
 * @Author: 水痕
 * @Date: 2020-06-02 09:57:15
 * @LastEditors: 水痕
 * @Description: 根据服务器返回的路由文件过滤本地的路由文件数据
 * @param {type} 
 * @return: 
 */
const getRoutes = (authList) => {
  const auth = authList.map(item => item.index);
  // 对当前本地的路由文件进行过滤
  const filterRoutes = (authRoutes) => {
    return authRoutes.filter(route => {
      if (auth.includes(route.name)) {
        // 递归遍历子菜单
        if (route.children) {
          route.children = filterRoutes(route.children);
        }
        return route;
      }
    })
  }
  return filterRoutes(constantRoutes);
}

export default {
  state: {
    hasPermission: false, // 判断是否有权限
    authMenuList: [], // 授权的菜单列表
  },
  mutations: {
    setPermission (state) {
      state.hasPermission = true;
    },
    setAuthMenuList (state, payload) {
      state.authMenuList = payload;
    }
  },
  actions: {
    // 获取菜单的api
    async getMenuListApi ({ commit }) {
      const { menuList } = await MenuService.getMenuList();
      commit('setAuthMenuList', menuList);
      commit('setPermission');
      return menuList;
    },
    // 根据获取的菜单，动态添加路由到本地路由文件
    async getAuthRoutes ({ dispatch }) {
      const authList = await dispatch('getMenuListApi');
      return getRoutes(authList);
    }
  }
}