const routers = [
  {
    name: 'register',
    path: '/register',
    meta: { title: '用户注册', unauth: true, withoutLayout: true },
    component: () => import('@/views/shared/register/Index.vue'),
  },
];

export default routers;
