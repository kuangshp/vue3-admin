import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/Layout.vue';

// 自己定义的路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      // icon: 'lock',
      // 就算只有一个子节点也现实父节点
      alwaysShow: true,
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/system/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          icon: 'list',
        },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/Role.vue'),
        meta: {
          title: '角色管理',
          icon: 'list',
        },
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/User.vue'),
        meta: {
          title: '用户管理',
          icon: 'list',
        },
      },
    ],
  },
  {
    // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link',
        },
      },
    ],
  },
];
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          // 固定不能被删除
          affix: true,
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
