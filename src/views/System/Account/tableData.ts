import type { FormOption, TableOption } from './types';

export const queryFormOptions: FormOption[] = [
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
  },
  {
    type: 'input',
    label: '邮箱',
    prop: 'email',
  },
  {
    type: 'input',
    label: '手机号码',
    prop: 'mobile',
  },
  {
    type: 'select',
    label: '列表状态',
    prop: 'status',
    children: async () => {
      return [
        { type: 'option', label: '正常', value: 1 },
        { type: 'option', label: '禁用', value: 2 },
      ];
    },
  },
];

export const tableOptions: TableOption[] = [
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
    minWidth: 120,
  },
  {
    prop: 'email',
    label: '电邮地址',
    minWidth: 160,
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 100,
    slot: 'status',
  },
  {
    prop: 'lastLoginDate',
    label: '最后登录时间',
    width: 180,
    slot: 'lastLoginDate',
  },
  {
    prop: 'lastLoginProvince',
    label: '最后登录地址',
    width: 180,
    render: (item) => {
      if (item.lastLoginProvince && item.lastLoginCity) {
        return `${item.lastLoginProvince}/${item.lastLoginCity}`;
      }
      return '';
    },
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
