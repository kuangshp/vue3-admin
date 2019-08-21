import Vue from 'vue';
import Router from 'vue-router';
import router from './router';
import { setTitle, auth } from '@/utils';

Vue.use(Router);

const routers = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [...router],
});

// 设置路由拦截
routers.beforeEach((to, from, next) => {
  auth(to, from, next);
  setTitle(to.meta.title);
  next();
});

routers.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default routers;
