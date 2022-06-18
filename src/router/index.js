import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import Layout from '@/layout';
// 私有路由
const privateRoutes = [
  {
    path: '/system',
    component: Layout,
    meta: {
      title: 'system',
      icon: 'personnel',
    },
    redirect: '/system/account',
    children: [
      {
        path: '/system/account',
        name: 'account',
        component: () => import('@/views/System/Account/index.vue'),
        meta: {
          title: 'account',
          icon: 'personnel-manage',
        },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/System/Role/index.vue'),
        meta: {
          title: 'role',
          icon: 'role',
        },
      },
      {
        path: '/system/access',
        name: 'access',
        component: () => import('@/views/System/Access/index.vue'),
        meta: {
          title: 'access',
          icon: 'permission',
        },
      },
    ],
  },
  {
    path: '/file',
    component: Layout,
    redirect: '/file/file',
    children: [
      {
        path: '/file/file',
        name: 'file',
        component: () => import('@/views/File/index'),
        meta: {
          title: 'file',
          icon: 'article-ranking',
        },
      },
    ],
  },
];
// 公开路由
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    name: '/',
    // 重定向到/profile页面
    redirect: '/home',
    component: Layout,
    // 只有一层的不要使用这个
    // meta: {
    //   title: 'profile',
    //   icon: 'el-icon-user',
    // },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index'),
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});

// 白名单
const whiteList = ['/login'];
/**
 * @description: 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 从哪里来
 * @param {*} next  是否要去
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      // if (!store.getters.hasUserInfo) {
      //   // 触发获取用户信息的 action，并获取用户当前权限
      //   const { permission } = await store.dispatch('user/getUserInfo');
      //   // 处理用户权限，筛选出需要添加的路由
      //   const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus);
      //   // 利用 addRoute 循环添加
      //   filterRoutes.forEach((item) => {
      //     router.addRoute(item);
      //   });
      //   // 添加完动态路由之后，需要在进行一次主动跳转
      //   return next(to.path);
      // }
      next();
    }
  } else {
    // 到登录页面
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});
export default router;
