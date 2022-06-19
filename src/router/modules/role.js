import Layout from '@/layout';

export default {
  path: '/system',
  component: Layout,
  meta: {
    title: 'system',
    icon: 'personnel',
  },
  name: 'role',
  redirect: '/system/account',
  children: [
    {
      path: '/system/role',
      name: 'role',
      component: () => import('@/views/System/Role/index.vue'),
      meta: {
        title: 'role',
        icon: 'role',
      },
    },
  ],
};
