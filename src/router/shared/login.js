const routers = [
  {
    name: 'login',
    path: '/login',
    meta: { title: 'login', unauth: true, withoutLayout: true },
    component: () => import('@/views/shared/login/Index.vue'),
  },
];

export default routers;
