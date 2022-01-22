export const menusList = [
  {
    id: 1,
    icon: 'config',
    path: '/config/config',
    title: '配置中心',
    pid: -1,
  },
  {
    id: 2,
    icon: 'system',
    path: '/system',
    title: '系统管理',
    pid: -1,
  },
  {
    id: 3,
    path: '/system/user',
    title: '用户管理',
    icon: 'user',
    pid: 2,
  },
  {
    id: 4,
    path: '/system/role',
    title: '角色管理',
    icon: 'role',
    pid: 2,
  },
  {
    id: 5,
    path: '/system/menu',
    title: '菜单管理',
    icon: 'tree',
    pid: 2,
  },
  {
    // 外链路由
    id: 6,
    path: 'https://www.baidu.com/',
    title: '去百度',
    icon: 'link',
    pid: -1,
  },
];
