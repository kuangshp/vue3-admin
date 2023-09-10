export default {
  path: '/coupon',
  name: 'coupon',
  component: () => import('@/views/Coupon/index.vue'),
  meta: {
    title: '优惠劵',
    icon: 'personnel-manage',
    keepAlive: true,
    // isNotLayout: true,
  },
};
