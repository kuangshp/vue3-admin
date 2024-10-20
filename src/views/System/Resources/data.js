export const tableOptions = [
  {
    type: 'index',
    width: 50,
    label: 'No',
    align: 'center',
  },
  {
    prop: 'title',
    label: '名称',
    width: 150,
  },
  {
    prop: 'resourcesType',
    label: '类型',
    align: 'center',
    width: 120,
    slot: 'resourcesType',
  },
  {
    prop: 'icon',
    label: '图标',
    width: 80,
    align: 'center',
    slot: 'icon',
  },
  {
    prop: 'url',
    label: 'URL地址',
    width: 120,
  },
  {
    prop: 'method',
    label: '请求方式',
    width: 120,
  },
  {
    prop: 'component',
    label: '组件路径',
    width: 120,
  },
  {
    prop: 'sort',
    label: '排序',
    width: 80,
    align: 'center',
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
    width: 180,
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
