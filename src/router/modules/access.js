import Layout from '@/layout';

export default {
  path: '/system',
  component: Layout,
  meta: {
    title: 'system',
    icon: 'personnel',
  },
  name: 'access',
  redirect: '/system/account',
  children: [
    {
      path: '/system/access',
      name: 'access',
      component: () => import('@/views/System/Access/index.vue'),
      meta: {
        title: 'access',
        icon: 'permission',
      },
    },
  ],
};
