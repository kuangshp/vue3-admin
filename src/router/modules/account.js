import Layout from '@/layout';

export default {
  path: '/system',
  component: Layout,
  meta: {
    title: 'system',
    icon: 'personnel',
  },
  name: 'account',
  redirect: '/system/account',
  children: [
    {
      path: '/system/account',
      name: 'account',
      component: () => import('@/views/System/Account/index.vue'),
      meta: {
        title: 'account',
        icon: 'personnel-manage',
      },
    },
  ],
};
