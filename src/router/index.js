import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout';

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: layout,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
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
