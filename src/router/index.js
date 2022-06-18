import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import Layout from '@/layout';
// 私有路由
const privateRoutes = [
  {
    path: '/user',
    component: Layout,
    meta: {
      title: 'user',
      icon: 'personnel',
    },
    redirect: '/user/manage',
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
        },
      },
      {
        path: '/user/role',
        name: 'role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
        },
      },
      {
        path: '/user/permission',
        name: 'permissionList',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
        },
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        meta: {
          title: 'userInfo',
          // 不需要出现在左侧导航中
          // icon: 'permission',
        },
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport',
          // icon: 'excelImport',
        },
      },
    ],
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meth: {
      title: 'article',
      icon: 'article',
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking',
        },
      },
      {
        path: '/article/:id',
        name: 'articleDetail',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail',
        },
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create',
        },
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor',
        },
      },
      {
        path: '/article/:id',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail',
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
    // 重定向到/profile页面
    redirect: '/profile',
    component: () => Layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user',
        },
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
