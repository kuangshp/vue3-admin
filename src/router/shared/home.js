const routers = [
  {
    name: 'home',
    path: '/home',
    meta: { title: '首页', unauth: false },
    component: () => import('@/views/shared/home/Index.vue'),
  },
];

export default routers;
