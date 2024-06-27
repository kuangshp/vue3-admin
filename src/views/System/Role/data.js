export const queryFormOption = [
  {
    type: 'input',
    label: '名称',
    prop: 'username',
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    children: [
      {
        type: 'option',
        label: '正常',
        value: 0,
      },
      {
        type: 'option',
        label: '禁用',
        value: 1,
      },
    ],
  },
];

export const tableOptions = [
  {
    prop: 'name',
    label: '名称',
    width: 120,
  },

  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 100,
    slot: 'status',
  },
  {
    prop: 'description',
    label: '描述',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    align: 'center',
    width: 180,
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    align: 'center',
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
