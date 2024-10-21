import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { isHttp } from '@/utils';
import NProgress from 'nprogress';
import { AUTH_TOKEN_NAME } from '@/constant';

// 假设异步路由
export const constantRoutes = [
  {
    path: '',
    name: 'home',
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    meta: {
      hidden: true, // 不需要再左边显示的
    },
    hidden: true,
    children: [
      {
        path: 'home',
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
      isNotLayout: true,
      hidden: true,
    },
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
// 白名单
const whiteList = ['/login', 'home'];
router.beforeEach((to, form, next) => {
  const appStore = useAppStore();
  NProgress.start();
  if (window.localStorage.getItem(AUTH_TOKEN_NAME)) {
    if (to.path === '/login') {
      NProgress.done();
      next('/');
    } else if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (appStore.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        appStore.getInfo().then(() => {
          appStore
            .getMenusApi()
            .then((accessRoutes) => {
              accessRoutes.forEach((route) => {
                if (!isHttp(route.path)) {
                  router.addRoute(route); // 动态添加可访问路由表
                }
              });
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            })
            .catch((err) => {
              next({ path: '/' });
            });
          
        }).catch(err => {
          console.log(err, "错误信息")
          appStore.logout();
        })
      } else {
        if (to.path == '/') {
          next({ path: '/home' ,replace:true});
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
