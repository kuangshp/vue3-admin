export const menusList = [
  {
    id: 1,
    icon: 'el-icon-document',
    path: 'config',
    title: '配置中心',
    pid: -1,
  },
  {
    id: 2,
    icon: 'el-icon-setting',
    path: 'system',
    title: '系统管理',
    pid: -1,
  },
  {
    id: 3,
    path: 'user',
    title: '用户管理',
    icon: 'el-icon-s-custom',
    pid: 2,
  },
  {
    id: 4,
    path: 'role',
    title: '角色管理',
    icon: 'el-icon-document-copy',
    pid: 2,
  },
  {
    id: 5,
    path: 'menu',
    title: '菜单管理',
    icon: 'el-icon-s-operation',
    pid: 2,
  },
];
