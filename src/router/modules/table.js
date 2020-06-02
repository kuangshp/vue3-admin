export default {
  name: 'table',
  path: '/table',
  meta: { title: '表格组件', unauth: false },
  component: () => import('@/views/pages/table/Index.vue'),
};