import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordName,
  RouteRecordRaw,
} from 'vue-router';
import Layout from '@/Layout/Layout.vue';
import { setTitle, storage } from '@/utils';
import { authToken } from '@/constants';

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
        name: 'menu',
        component: () => import('@/views/system/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/Role.vue'),
        meta: {
          title: '角色管理',
          noCache: false,
        },
      },
      {
        path: 'user',
        name: 'user',
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
        name: 'home',
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
    name: 'login',
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

const whiteList: RouteRecordName[] = ['login'];
const authRoutes = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const currentName: RouteRecordName | null | undefined = to.name;
  // 如果是白名单的直接放行
  if (currentName && whiteList.includes(currentName)) {
    next();
  } else if (storage.getItem(authToken)) {
    next();
  } else {
    next('/login');
  }
};
// 路由拦截
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    authRoutes(to, from, next);
    setTitle(to.meta.title as string);
    next();
  }
);
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
