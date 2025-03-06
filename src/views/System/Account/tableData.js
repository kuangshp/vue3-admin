export const tableOptions = [
  {
    type: 'index',
    width: 80,
    label: '序号',
    align: 'center',
  },
  {
    prop: 'username',
    label: '用户名',
    width: 180,
  },
  {
    prop: 'mobile',
    label: '手机号码',
    width: 120,
  },
  {
    prop: 'email',
    label: '电邮地址',
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 100,
    slot: 'status',
  },
  {
    prop: 'lastLogin',
    label: '最后登录时间',
    width: 180,
    slot: 'lastLogin',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    width: 180,
  },
  {
    label: '操作',
    action: true,
    align: 'center',
    width: 240,
    fixed: 'right',
  },
];