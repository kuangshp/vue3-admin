<template>
  <div>
    <div>表格组件</div>
    <CustomTable :config="tableConfig" isShowTools isShowAction>
      <template #age="{ row }">年龄:{{ row.age }}</template>
    </CustomTable>
  </div>
</template>

<script setup>
  const tableData = [
    {
      id: 1,
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      age: 20,
    },
    {
      id: 2,
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      age: 30,
    },
    {
      id: 3,
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      age: 40,
    },
    {
      id: 4,
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      age: 50,
    },
  ];

  const onChangePageHandler = (pageNumber, pageSize) => {
    console.log(pageNumber, pageSize);
    tableConfig.pagination.pageNumber = pageNumber;
    tableConfig.pagination.pageSize = pageSize;
  };
  const indexHandler = (index) => {
    return index * 2;
  };
  const tableConfig = reactive({
    loading: true,
    selectable: true, // 是否选择能力
    multiple: true, // 是否单选
    rowKey: 'id', //表格数据主键
    indexable: true, // 是否有序列号
    selection: [],
    indexMethod: indexHandler, // 序号显示的方式
    indexLabel: 'No', // 序列号的表头名字
    summary: true, // 表格底部汇总
    emptyText: '无数据', // 没有数据的时候显示
    tableFields: [
      {
        prop: 'name',
        label: '姓名',
      },
      {
        prop: 'date',
        label: '日期',
        align: 'center',
      },
      {
        prop: 'age',
        label: '年龄',
        type: 'slot',
        slotName: 'age',
        sortable: true,
      },
      {
        prop: 'address',
      },
    ], // 表头
    tableData: tableData, // 表格数据
    pagination: {
      total: 200,
      pageSize: 10,
      pageNumber: 1,
      onChange: onChangePageHandler, // 分页事件
    },
    selectionChange: (selectList) => {
      // 单选多选回调
      console.log(selectList, '点击的单选/多选');
      tableConfig.selection = selectList;
    },
  });
  setTimeout(() => {
    tableConfig.loading = false;
  }, 1000);
</script>

<style lang="scss" scoped></style>
