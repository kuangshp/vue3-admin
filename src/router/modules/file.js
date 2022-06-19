import Layout from '@/layout';

export default {
  path: '/file',
  component: Layout,
  redirect: '/file/file',
  name: 'file',
  children: [
    {
      path: '/file/file',
      name: 'file',
      component: () => import('@/views/File/index'),
      meta: {
        title: 'file',
        icon: 'tree',
      },
    },
  ],
};
