const routers = [
  {
    name: 'login',
    path: '/login',
    meta: { title: '用户登录', unauth: true, withoutLayout: true },
    component: () => import('@/views/shared/login/Index.vue'),
  },
];

export default routers;
