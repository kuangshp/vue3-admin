export default {
  name: 'tab',
  path: '/tab',
  meta: { title: '选项卡', unauth: false },
  component: () => import('@/views/pages/tab/Index.vue'),
};