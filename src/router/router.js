import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './shared/home';
import login from './shared/login';

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
    ],
  },
  ...login,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/********************************路由拦截配置 start********************************/
router.beforeEach((to, from, next) => {
  // // 校验是否登录
  // auth(to, from, next);
  // // 动态生成路由
  // mergeRoute();
  // setTitle(to.meta.title);
  next();
});


// eslint-disable-next-line no-unused-vars
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
/********************************路由拦截配置 end********************************/


export { router };
