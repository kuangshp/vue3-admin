const menusData = [
  {
    icon: 'el-icon-s-order',
    index: 'table',
    title: '基础表格'
  },
  {
    icon: 'el-icon-s-marketing',
    index: 'tab',
    title: 'tab选项卡'
  },
  {
    icon: 'el-icon-folder-opened',
    index: 'form',
    title: '表单相关',
    children: [
      {
        index: 'base_form',
        title: '基本表单',
        icon: 'el-icon-s-data',
      },
      {
        index: 'upload',
        title: '文件上传'
      }
    ]
  }
];

export { menusData };
