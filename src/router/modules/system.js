export default {
  path: '/system',
  component: () => import('@/Layout/index.vue'),
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
    {
      path: '/system/role',
      name: 'role',
      component: () => import('@/views/System/Role/index.vue'),
      meta: {
        title: 'role',
        icon: 'role',
      },
    },
    {
      path: '/system/resource',
      name: 'resource',
      component: () => import('@/views/System/Resource/index.vue'),
      meta: {
        title: 'resource',
        icon: 'permission',
      },
    },
  ],
};
