export const tableOptions = [
  {
    prop: 'id',
    label: 'ID',
    align: 'center',
    width: 100,
  },
  {
    prop: 'username',
    label: '用户名',
    align: 'center',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    align: 'center',
    width: 180,
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    align: 'center',
    width: 180,
  },
  {
    label: '操作',
    action: true,
    align: 'center',
    width: 180,
  },
]


export const formOption = [
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    required: true,
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    required: true,
    rules: [
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: 'input',
    label: '确认密码',
    prop: 'confirmPassword',
    placeholder: '请输入确认密码',
    required: true,
    rules: [
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur',
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
];

export const queryFormOption = [
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    attrs: {
      clearable: true,
    },
  },
];