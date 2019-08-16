const routers = [
  {
    name: 'home',
    path: '/home',
    meta: { title: 'Home' },
    component: () => import('@/views/shared/home'),
  },
];

export default routers;
