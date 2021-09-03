import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/Index.vue';

// 自己定义的路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      // icon: 'lock',
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/system/menu/Index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'list',
        },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/Index.vue'),
        meta: {
          title: '角色管理',
          icon: 'list',
        },
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/Index.vue'),
        meta: {
          title: '用户管理',
          icon: 'list',
        },
      },
    ],
  },
];
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
    ],
  },
];

export const routes: Array<RouteRecordRaw> = [
  ...constantRoutes, // 解构语法可能报波浪线tslib版本升级 没懂 暂时先不管
  ...asyncRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
