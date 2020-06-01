const routers = [
  {
    name: 'home',
    path: '/home',
    meta: { title: 'Home' },
    component: () => import('@/views/shared/home/Index.vue'),
  },
];

export default routers;
