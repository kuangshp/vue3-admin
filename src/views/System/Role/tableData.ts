import type { FormOption, TableOption } from './types';

export const queryFormOptions: FormOption[] = [
  {
    type: 'input',
    label: '角色名称',
    prop: 'name',
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
    prop: 'name',
    label: '角色名称',
    width: 180,
  },
  {
    prop: 'description',
    label: '角色描述',
  },
  {
    prop: 'sort',
    label: '列表排序',
    width: 100,
  },
  {
    prop: 'status',
    label: '列表状态',
    width: 100,
    slot: 'status',
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
    width: 180,
    fixed: 'right',
  },
];
