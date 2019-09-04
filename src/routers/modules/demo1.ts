export default {
  name: 'demo1',
  path: '/demo1',
  meta: { title: 'Demo1' },
  component: () => import('@/views/demo1'),
  redirect: '/demo11',
  children: [
    {
      name: 'demo1.demo11',
      path: '/demo11',
      meta: { title: 'demo11' },
      component: () => import('@/views/demo1/demo11'),
    },
    {
      name: 'demo1.demo12',
      path: '/demo12',
      meta: { title: 'demo12' },
      component: () => import('@/views/demo1/demo12'),
    },
  ],
};
