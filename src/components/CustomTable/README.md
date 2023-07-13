### 关于表格组件参数借

| 参数 | 子节点 | 子节点 | 参数类型 | 参数说明 |
| --- | --- | --- | --- | --- |
| `config` |  |  | 对象 | 根节点参数 |
|  | `loading` |  | 布尔值 | 数据加载中，默认值为空 |
|  | `tableData` |  | 数组对象 | 表格数据 |
|  | `height` |  | 数字或者字符串 | 表格高度 |
|  | `maxHeight` |  | 数字或者字符串 | 最大高度 |
|  | `srripe` |  | 布尔值 | 默认为`true` |
|  | `border` |  | 布尔值 | 是否显示边框，默认为`true` |
|  | `size` |  | 枚举类型 | 表格大小默认值为`small` |
|  | `fit` |  | 布尔值 | 默认值为`true` |
|  | `showHeader` |  | 布尔值 | 是否显示表头 |
|  | `highlight` |  | 布尔值 | 是否高亮 |
|  | `rowKey` |  | 字符或者数字 | 表格主键 |
|  | `emptyText` |  | 字符类型 | 表格没数据显示内容 |
|  | `summary` |  | 布尔值 | 是否显示合计 |
|  | `summaryText` |  | 字符类型 | 汇总文案，默认合计 |
|  | `selectionChange` |  | `function(selectList){}` | 开启单选多选选中的 |
|  | `sortChange` |  | 方法 |  |
|  | `filterChange` |  | 方法 |  |
|  | `selectable` |  | 布尔值 | 是否开启单选或者多选 |
|  | `multipe` |  | 布尔值 | 区分单选多选，`true`多选，`false`单选 |
|  | `indexable` |  | 布尔值 | 是否开启序列号，默认`true` |
|  | `indexLabel` |  | 字符类型 | 文案 |
|  | `indexMethod` |  |  |  |
|  | `tableFields` |  | 数组对象 | 表格头信息 |
|  |  | `label` | 字符类型 | 文案 |
|  |  | `prop` | 字符类型 | 唯一区分 |
|  |  | `width` | 字符或者数字 | 列宽度 |
|  |  | `fixed` | 布尔值 | 是否固定 |
|  |  | `align` | 枚举值:`left`、`right`、`center` | 表格中对其方式 |
|  |  | `tooltip` | 布尔值 | 文案过长是否提示，默认为 true |
|  |  | `sortable` | 布尔值 | 是否开启排序 |
|  |  | `slot` | 字符类型 | 是否为插槽 |
|  |  | `slotName` | 字符类型 | 插槽名称 |
|  | `pagination` |  | 对象 | 分页对象 |
|  |  | `small` | 枚举类型 | 分页大小 |
|  |  | `total` | 数字类型 | 总条数 |
|  |  | `pageSize` | 数字 | 一页显示多少条，默认 10 条 |
|  |  | `pageNumber` | 当前页 | 当前页，默认为 1 |
|  |  | `pageSizes` | 数字 | 默认[10, 20, 30, 40, 50] |
|  |  | `hideOnSinglePage` | 布尔值 | 一页的时候是否隐藏 |
|  |  | `onChange` | 方法`function(pageNumber,pageSize){}` | 修改分页的方法 |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |
