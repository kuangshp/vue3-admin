export default {
  path: '/components',
  component: () => import('@/Layout/index.vue'),
  meta: {
    title: '自定义组件',
    icon: 'personnel',
  },
  redirect: '/components/from',
  children: [
    {
      path: '/components/from',
      name: 'from',
      component: () => import('@/views/Components/Form/index.vue'),
      meta: {
        title: '表单组件',
        icon: 'personnel-manage',
        keepAlive: true,
      },
    },
    {
      path: '/components/table',
      name: 'table',
      component: () => import('@/views/Components/Table/index.vue'),
      meta: {
        title: '表格组件',
        icon: 'personnel-manage',
        keepAlive: true,
      },
    },
  ],
};
