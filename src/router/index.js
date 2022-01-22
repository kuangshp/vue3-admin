import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout';

// 私有路由
const privateRoutes = [
  {
    path: '/system',
    component: layout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/System/Menu'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/System/Role'),
        meta: {
          title: '角色管理',
          noCache: false,
        },
      },
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/views/System/User'),
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
    component: layout,
    redirect: '/config/config',
    children: [
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/Config'),
        meta: {
          title: '配置中心',
        },
      },
    ],
  },
];
// 公共路由
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页',
          // 固定不能被删除
          affix: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
});
// // 路由白名单
// const whiteList = ['/login'];
// // 路由前置守卫
// router.beforeEach(async (to, from, next) => {
//   // 存在token, 进入主页
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/');
//     } else {
//       // 判断用户资料是否获取
//       // 若不存在用户信息, 则需要获取用户信息
//       if (!store.getters.hasUserInfo) {
//         // 去触发action的获取用户信息
//         await store.dispatch('user/getUserInfo');
//       }
//       next();
//     }
//   } else {
//     // 没有token的情况下, 可以进入白名单
//     if (whiteList.indexOf(to.path) > -1) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });
export default router;
