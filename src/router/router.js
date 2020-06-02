import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './shared/home';
import login from './shared/login';
import { setTitle, storage } from '@/utils';
import { authToken } from '@/config';
import { constantRoutes } from './constant-routes';
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
/********************************路由拦截配置 start********************************/
router.beforeEach((to, from, next) => {
  // 校验是否登录
  auth(to, from, next);
  // 动态生成路由
  // mergeRoute();
  setTitle(to.meta.title);
  next();
});


// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/********************************路由拦截配置 end********************************/


export { router };
