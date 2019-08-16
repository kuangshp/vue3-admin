const routers = [
  {
    name: 'login',
    path: '/login',
    meta: { title: 'login', unauth: true },
    component: () => import('@/views/shared/login'),
  },
];

export default routers;
