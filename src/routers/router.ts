import Vue from 'vue';
import Router, { Route, RouterOptions, RouteConfig, RouterMode } from 'vue-router';
import store from '@/store';

import { auth, setTitle, storage, formatList, getTreeList } from '@/utils';

Vue.use(Router);

import { constantRoutes } from './constant-routes';
import unmatch from './shared/unmatch';
import home from './shared/home';
import login from './shared/login';

import { authToken } from '@/config';

// 基础路由(白名单路由)
const baseRoutes = [
  {
    name: '',
    path: '/',
    meta: { title: 'Home' },
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      ...home,
    ],
  },
  ...login,
];

// 路由的基础配置
const routeConfig = {
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
};

// 实例化路由
const createRouter = (): any => new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: baseRoutes,
});
const router = createRouter();

/**
 * 扩展添加动态路由的方法
 */
router.$addRoutes = (routerArray: any) => {
  (router as any).matcher = (new Router({
    ...routeConfig,
    ...routerArray,
  }) as any).matcher;
  router.addRoutes(routerArray);
};

// 定义一个变量判断当前是否可以添加路由
let addRouterLock = true;
/**
 * 递归遍历查找当前路由是否要添加
 * @param auths 后台返回可添加的路由
 * @param routes 本地已经添加的路由
 */
const isExistRouter = (auths: string[], routes: Array<{ [propsName: string]: any }>): void => {
  routes.forEach((route: { [propsName: string]: any }) => {
    if (route.children) {
      isExistRouter(auths, route.children);
    } else {
      if (auths.includes(route.name)) {
        addRouterLock = false;
      }
    }
  });
};

// 动态添加路由的方法
const mergeRoute = async () => {
  // 本地中有存储的时候才拉取菜单
  if (storage.getItem(authToken)) {
    const { result } = await store.dispatch('meuns/sideMeunApi');
    // 从服务器端获取菜单及对应的权限
    const [auths, menu] = getTreeList(result);
    // 格式化后的菜单设置到store存储中
    store.commit('viewStore/SET_SIDE_MENU', menu);
    // 根据后端返回的权限,切割路由文件中的路由
    const permiseMenu = formatList(constantRoutes, auths);
    if ((window as any)._vm) {
      const { $router: { options: { routes } } } = (window as any)._vm;
      isExistRouter(auths, routes);
      if (addRouterLock) {
        router.options.routes[0].children.push(...permiseMenu);
        // router.addRoutes(router.options.routes);
        router.$addRoutes([...router.options.routes, ...unmatch]);
      }
    } else {
      router.options.routes[0].children.push(...permiseMenu, ...unmatch);
      // router.addRoutes(router.options.routes);
      router.$addRoutes([...router.options.routes]);
    }
  }
};
/********************************路由拦截配置 start********************************/
router.beforeEach((to: Route, from: Route, next: () => any) => {
  // 校验是否登录
  auth(to, from, next);
  // 动态生成路由
  mergeRoute();
  setTitle(to.meta.title);
  next();
});


router.afterEach((to: Route, from: Route, next: () => any) => {
  window.scrollTo(0, 0);
});
/********************************路由拦截配置 end********************************/

export { router };
