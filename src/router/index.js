import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/app';
import SystemRouter from './modules/system';
import ComponentsRouter from './modules/components';
import NProgress from 'nprogress';
// 假设异步路由
export const asyncRoutes = [
  SystemRouter,
  ComponentsRouter,
  {
    path: '',
    meta: {
      title: '去百度',
      icon: 'link',
      linkUrl: 'https://www.baidu.com/',
    },
  },
];
const constantRoutes = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    meta: {
      hidden: true, // 不需要再左边显示的
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: true, // 不需要再左边显示的
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

export const routes = [...constantRoutes, ...asyncRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// 白名单
const whiteList = ['/login', 'home'];
router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  NProgress.start();
  if (appStore.globalToken) {
    if (to.name === '/login') {
      NProgress.done();
      next('/home');
    } else {
      // TODO 处理菜单
      // 模拟后端返回的菜单权限菜单
      if (appStore.authMenusList.includes(to.name) || whiteList.includes(to.name)) {
        NProgress.done();
        next();
      } else {
        NProgress.done();
        next('/home');
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      NProgress.done();
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
