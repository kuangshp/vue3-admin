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
      // 就算只有一个子节点也现实父节点
      alwaysShow: true,
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/Role.vue'),
        meta: {
          title: '角色管理',
          noCache: false,
        },
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/User.vue'),
        meta: {
          title: '用户管理',
          // 设置tagsView缓存,false或者不写的时候会缓存
          noCache: false,
        },
      },
    ],
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/config',
    children: [
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/config/config/Config.vue'),
        meta: {
          title: '配置中心',
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
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
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
