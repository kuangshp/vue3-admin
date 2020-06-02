import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import home from './shared/home';
import login from './shared/login';
import { constantRoutes } from './constant-routes';
import { setTitle, storage } from '@/utils';
import { authToken } from '@/config';
Vue.use(VueRouter)

const routes = [
  {
    name: '',
    path: '/',
    meta: { title: 'Home' },
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      ...home,
      ...constantRoutes,
    ],
  },
  ...login,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * @Author: 水痕
 * @Date: 2020-06-02 08:08:04
 * @LastEditors: 水痕
 * @Description: 定义一个方法判断需要登录的接口
 * @param {type} 
 * @return: 
 */
// eslint-disable-next-line no-unused-vars
const auth = (to, from, next) => {
  console.log(to.meta.unauth, Boolean(storage.getItem(authToken)), to.fullPath);
  // 如果需要登录的地址及本地不存在authToken的时候就到登录页面
  if (!to.meta.unauth && !storage.getItem(authToken)) {
    Vue.prototype.$notify({
      title: '退出提示',
      message: '登录超时',
    });
    next({ name: 'login', query: { backUrl: to.fullPath } });
  }
}

const authRoutes = async (to, from, next) => {
  if (!store.state.hasPermission) {
    const routes = await store.dispatch('getAuthRoutes');
    // router.options.routes[0].children.push(...routes);
    router.addRoutes(routes);
    console.log(routes, '////', router.options.routes)
    next({ ...to, replace: true });
  } else {
    next();
  }
}
/********************************路由拦截配置 start********************************/
router.beforeEach((to, from, next) => {
  authRoutes(to, from, next);
  // 校验是否登录
  auth(to, from, next);
  setTitle(to.meta.title);
  next();
});


// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/********************************路由拦截配置 end********************************/


export { router };
