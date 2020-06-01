const routers = [
  {
    name: 'home',
    path: '/home',
    meta: { title: '首页' },
    component: () => import('@/views/shared/home/Index.vue'),
  },
];

export default routers;
