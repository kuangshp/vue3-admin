export default {
  name: 'form',
  path: '/form',
  meta: { title: '表单组件', unauth: false },
  component: () => import('@/views/pages/form/Index.vue'),
  redirect: '/base_form',
  children: [
    {
      name: 'base_form',
      path: '/base_form',
      meta: { title: '基础表单', unauth: false },
      component: () => import('@/views/pages/form/base-form/Index.vue'),
    },
    {
      name: 'upload',
      path: '/upload',
      meta: { title: '上传组件', unauth: false },
      component: () => import('@/views/pages/form/upload/Index.vue'),
    },
  ],
};
