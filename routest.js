export const routeList = [
  {
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'personnel',
    },
    component: 'Layout',
    alwaysShow: true,
    children: [
      {
        path: 'tenant',
        name: 'tenant',
        component: 'System/Tenant/index',
        meta: {
          title: '租户管理',
          icon: 'personnel-manage',
          keepAlive: false,
        },
      },
      {
        path: 'account',
        name: 'account',
        component: 'System/Account/index',
        meta: {
          title: '账号管理',
          icon: 'personnel-manage',
          keepAlive: false,
        },
      },
      {
        path: 'accountDetail',
        name: 'accountDetail',
        component: 'System/Account/Detail',
        hidden: true,
        meta: {
          title: '账号详情',
          icon: 'personnel-manage',
          hidden: true,
        },
      },
      {
        path: 'role',
        name: 'role',
        component: 'System/Role/index',
        meta: {
          title: '角色管理',
          icon: 'role',
          keepAlive: true,
        },
      },
      {
        path: 'resources',
        name: 'resources',
        component: 'System/Resources/index',
        meta: {
          title: '资源管理',
          icon: 'permission',
        },
      },
      {
        path: 'sku',
        name: 'sku',
        component: 'System/Sku/index',
        meta: {
          title: '商品sku管理',
          icon: 'permission',
        },
      },
    ],
  },
  {
    path: '/',
    name: 'coupon',
    component: 'Layout',
    children: [
      {
        path: 'coupon',
        name: 'coupon',
        component: 'Coupon/index',
        meta: {
          title: '优惠劵',
          icon: 'permission',
        },
      },
    ],
  },
  {
    path: 'https://www.baidu.com/',
    name: 'https://www.baidu.com/',
    meta: {
      title: '去百度',
      icon: 'link',
    },
  },
];
