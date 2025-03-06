import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/app';
import NProgress from 'nprogress';

const modules = import.meta.glob('./modules/*/*.js', { eager: true });

function formatModules(_modules, result) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}
const customRoutes = formatModules(modules, []);
// 常量路由
export const constantRoutes = [
  // {
  //   name: 'https://www.baidu.com',
  //   meta: {
  //     title: '去百度',
  //     icon: 'link',
  //     linkUrl: 'https://www.baidu.com/',
  //   },
  // },
  {
    name: 'home',
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    meta: {
      title: '首页',
      hideInMenu: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          affix: true,
          hideInMenu: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hideInMenu: true,
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
    },
  },
];

// 全部的路由
export const routes = [...constantRoutes, ...customRoutes];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
// 白名单
const whiteList = ['/login', 'home'];
router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  NProgress.start();
  if (appStore.globalToken) {
    if (to.name === '/login') {
      NProgress.done();
      next('/home');
    } else {
      // 做路由权限判断
      if (appStore.menuFromServer) {
        if (!appStore.appAsyncMenus.length) {
          await appStore.fetchServerMenuConfig();
        }
        const serverMenuConfig = [...appStore.appAsyncMenus];
        let exist = false;
        while (serverMenuConfig.length && !exist) {
          const element = serverMenuConfig.shift();
          if (element?.name === to.name) {
            exist = true
          };
          if (element?.children) {
            serverMenuConfig.push(
              ...element.children
            );
          }
        }
        if (exist) {
          next();
        } else {
          console.log('没有权限');
          next('/home');
        }
      } else { 
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      NProgress.done();
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
