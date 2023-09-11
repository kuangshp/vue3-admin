export default {
  path: '/coupon',
  name: 'coupon',
  component: () => import('@/views/Coupon/index.vue'),
  meta: {
    title: '自定义组件库',
    icon: 'personnel-manage',
    keepAlive: true,
    // isNotLayout: true,
  },
};
