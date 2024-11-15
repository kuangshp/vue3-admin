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
    type: 'index',
    width: 50,
    label: 'No',
    align: 'center',
  },
  {
    prop: 'username',
    label: '用户名',
  },
  {
    prop: 'status',
    label: '状态',
    align: 'center',
    width: 100,
    slot: 'status',
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
    width: 150,
    fixed: 'right',
  },
];

export const formOption = (formData) => {
  return [
    {
      type: 'input',
      label: '名称',
      prop: 'name',
      required: true,
    },
    {
      type: 'input',
      label: '负责人',
      prop: 'username',
      required: true,
    },
    {
      type: 'input',
      label: '电话号码',
      prop: 'mobile',
      required: true,
    },
    {
      type: 'date-picker',
      label: '过期时间',
      prop: 'expireTime',
      required: true,
      attrs: {
        style: {
          width: '100%',
        },
        'disabled-date': (time) => {
          return time.getTime() < Date.now();
        },
      },
    },
    {
      type: 'select',
      label: '省份',
      prop: 'provinceId',
      children: () => {
        // const data = await AreaService.getByPidApi();
        // console.log(data);
        return [
          {
            type: 'option',
            label: '禁用',
            value: 1,
          },
          {
            type: 'option',
            label: '正常',
            value: 0,
          },
        ];
      },
      attrs: {
        style: {
          width: '100%',
        },
        onChange: (value) => {
          console.log(value, '点击切换');
          formData.value = {
            ...formData.value,
            provinceId: value,
          };
        },
      },
    },
    {
      type: 'select',
      label: '市',
      prop: 'cityId',
      children: [],
      attrs: {
        style: {
          width: '100%',
        },
        disabled: formData.value.provinceId == null,
      },
    },
    {
      type: 'select',
      label: '地区',
      prop: 'areaId',
      children: [],
      attrs: {
        style: {
          width: '100%',
        },
        disabled: !formData.areaId,
      },
    },
    {
      type: 'input',
      label: '详情地址',
      props: 'address',
      attrs: {},
    },
    {
      type: 'number',
      label: '排序',
      prop: 'sort',
    },
    {
      type: 'input',
      label: '描述',
      prop: 'description',
      attrs: {
        type: 'textarea',
      },
    },
  ];
};
