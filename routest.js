export const routeList = [
  // {
  //   path: '/system',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'personnel',
  //   },
  //   component: 'Layout',
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'tenant',
  //       name: 'tenant',
  //       component: 'System/Tenant/index',
  //       meta: {
  //         title: '租户管理',
  //         icon: 'personnel-manage',
  //         keepAlive: false,
  //       },
  //     },
  //     {
  //       path: 'account',
  //       name: 'account',
  //       component: 'System/Account/index',
  //       meta: {
  //         title: '账号管理',
  //         icon: 'personnel-manage',
  //         keepAlive: false,
  //       },
  //     },
  //     {
  //       path: 'department',
  //       name: 'department',
  //       component: 'System/Department/index',
  //       meta: {
  //         title: '部门管理',
  //         icon: 'personnel-manage',
  //         keepAlive: false,
  //       },
  //     },
  //     // {
  //     //   path: 'accountDetail',
  //     //   name: 'accountDetail',
  //     //   component: 'System/Account/Detail',
  //     //   hidden: true,
  //     //   meta: {
  //     //     title: '账号详情',
  //     //     icon: 'personnel-manage',
  //     //     hidden: true,
  //     //   },
  //     // },
  //     {
  //       path: 'role',
  //       name: 'role',
  //       component: 'System/Role/index',
  //       meta: {
  //         title: '角色管理',
  //         icon: 'role',
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: 'resources',
  //       name: 'resources',
  //       component: 'System/Resources/index',
  //       meta: {
  //         title: '资源管理',
  //         icon: 'permission',
  //       },
  //     },
  //     {
  //       path: 'sku',
  //       name: 'sku',
  //       component: 'System/Sku/index',
  //       meta: {
  //         title: '商品sku管理',
  //         icon: 'permission',
  //       },
  //     },
  //     {
  //       path: 'components',
  //       name: 'components',
  //       component: 'Components/Form/index',
  //       meta: {
  //         title: '自定义组件',
  //         icon: 'permission',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/',
  //   name: 'coupon',
  //   component: 'Layout',
  //   children: [
  //     {
  //       path: 'coupon',
  //       name: 'coupon',
  //       component: 'Coupon/index',
  //       meta: {
  //         title: '优惠劵',
  //         icon: 'permission',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: 'https://www.baidu.com/',
  //   name: 'https://www.baidu.com/',
  //   meta: {
  //     title: '去百度',
  //     icon: 'link',
  //   },
  // },
  {
    id: '1744610174165958657',
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'personnel',
      keepAlive: true,
    },
    component: 'Layout',
    children: [
      {
        id: '1744630083839180801',
        path: 'account',
        name: '账号管理',
        meta: {
          title: '账号管理',
          icon: 'personnel-manage',
          keepAlive: true,
        },
        component: 'System/Account/index',
      },
      {
        id: '1744630643799736321',
        path: 'department',
        name: '部门管理',
        meta: {
          title: '部门管理',
          icon: 'tree-table',
          keepAlive: true,
        },
        component: 'System/Department/index',
      },
      {
        id: '1744631049737060354',
        path: 'role',
        name: '角色管理',
        meta: {
          title: '角色管理',
          icon: 'role',
          keepAlive: true,
        },
        component: 'System/Role/index',
      },
      {
        id: '1744631246064041985',
        path: 'resources',
        name: '资源管理',
        meta: {
          title: '资源管理',
          icon: 'permission',
          keepAlive: true,
        },
        component: 'System/Resources/index',
      },
    ],
  },
  {
    id: '1744632661343846401',
    path: '/',
    name: 'coupon',
    meta: {
      title: '优惠劵',
      icon: 'permission',
      keepAlive: true,
    },
    component: 'Layout',
    children: [
      {
        id: '1744632661343846401',
        path: 'coupon',
        name: '优惠劵',
        meta: {
          title: '优惠劵',
          icon: 'permission',
          keepAlive: true,
        },
        component: 'Coupon/index',
      },
    ],
  },
  {
    id: '1744632845188579330',
    path: 'https://www.baidu.com/',
    name: 'https://www.baidu.com/',
    meta: {
      title: '去百度',
      icon: 'link',
      keepAlive: false,
    },
    component: 'Layout',
    children: [],
  },
];
