<template>
  <div style="height: 1000px"
    >文件中心
    <CustomTable :config="tableConfig">
      <template #age="{ row }">年龄:{{ row.age }}</template>
    </CustomTable>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import CustomTable from '@/components/CustomTable';
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
  };
  const indexHandler = (index) => {
    return index * 2;
  };
  const tableConfig = reactive({
    selectable: true, // 是否选择能力
    multiple: true, // 是否单选
    rowKey: 'id', //表格数据主键
    indexable: true, // 是否有序列号
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
      },
      {
        prop: 'address',
      },
    ], // 表头
    tableData: tableData, // 表格数据
    pagination: {
      total: 200,
      pageSize: 10,
      onChange: onChangePageHandler,
    },
  });
</script>

<style lang="scss" scoped></style>
