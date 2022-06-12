import { createRouter, createWebHashHistory } from 'vue-router';

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
