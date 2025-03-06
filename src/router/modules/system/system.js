export default {
  path: '/system',
  name: 'system',
  component: () => import('@/Layout/index.vue'),
  meta: {
    title: '系统管理',
    icon: 'personnel',
    order: 100,
  },
  redirect: '/system/account',
  children: [
    {
      path: '/system/account',
      name: 'account',
      component: () => import('@/views/System/Account/index.vue'),
      meta: {
        title: '账号管理',
        icon: 'personnel-manage',
        keepAlive: true,
        order: 1,
      },
    },
    {
      path: '/system/role',
      name: 'role',
      component: () => import('@/views/System/Role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'role',
        keepAlive: true,
        order: 2,
      },
    },
    {
      path: '/system/resources',
      name: 'resources',
      component: () => import('@/views/System/Resources/index.vue'),
      meta: {
        title: '资源管理',
        icon: 'permission',
        order: 3,
      },
    },
  ],
};
