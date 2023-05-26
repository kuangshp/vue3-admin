import { createRouter, createWebHashHistory } from 'vue-router';
import { useAppStore } from '@/stores/app';
// import SystemRouter from './modules/system';
import NProgress from 'nprogress';
// 假设异步路由
export const asyncRoutes = [
  {
    path: '/system',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: '系统管理',
      icon: 'personnel',
    },
    name: 'account',
    redirect: '/system/account',
    children: [
      {
        path: '/system/account',
        name: 'account',
        component: () => import('@/views/System/Account/index.vue'),
        meta: {
          title: '账号管理',
          icon: 'personnel-manage',
        },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/System/Role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role',
        },
      },
      {
        path: '/system/resources',
        name: 'resources',
        component: () => import('@/views/System/Resources/index.vue'),
        meta: {
          title: '资源管理',
          icon: 'permission',
        },
      },
    ],
  },
  {
    // 外链路由
    path: '/external-link',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: '去百度',
          icon: 'link',
        },
      },
    ],
  },
];
const constantRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: true,
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
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
// 白名单
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  NProgress.start();
  if (appStore.globalToken) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      // TODO 处理菜单
      next();
      NProgress.done();
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
