import { publicRoutes, privateRoutes } from '@/router';
export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes,
    isLoadMenu: false,
  }),
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes];
      state.isLoadMenu = true;
    },
  },
  actions: {
    /**
     * @description: 根据权限筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     * @return {*}
     */
    filterRoutes(context, menus) {
      const routes = [];
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key));
      });
      // 最后添加 不匹配路由进入 404，因为不匹配路由需要写在最后面
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404',
      });
      context.commit('setRoutes', routes);
      return routes;
    },
  },
};
