<template>
  <div>
    {{ formData }}
    <CustomForm
      :formFieldList="formFields"
      v-model="formData"
      @query="onSubmitHandler"
      @resetForm="resetFormHandler"
      @iconMethod="iconMethod"
      @filedChange="filedChange"
      isQueryPanel
      isShowBtn
    ></CustomForm>
    <div>树组件</div>
    {{ treeData }}
    <TreeSelect :options="treeDataList" v-model="treeData" />
    <div>数字组件</div>
    {{ number }}
    <InputNumber v-model="number" />
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  const treeData = ref([]);
  const number = ref(null);
  // 定义表单数据
  const formData = ref({
    soblabel: 'hello',
    sobCode: null,
    sobId: null,
    segmentDescription: '你好吗',
    segmentlabel: null,
    gender: null,
    text1: '你好',
  });
  const treeDataList = reactive([
    { id: 1, label: '云南', parentId: -1 },
    { id: 2, label: '昆明', parentId: 1 },
    { id: 3, label: '五华区', parentId: 2 },
    { id: 4, label: '盘龙区', parentId: 2 },
    { id: 5, label: '湖南', parentId: -1 },
    { id: 6, label: '长沙', parentId: 5 },
    { id: 7, label: '永州', parentId: 5 },
    { id: 8, label: '北辰小区', parentId: 3 },
  ]);
  const formFields = reactive([
    {
      prop: 'date1',
      label: '普通时间',
      type: 'date',
      required: true,
      // disabledAfter: true,
    },
    {
      prop: 'date2',
      label: '开始时间1',
      type: 'startDateRangePicker',
      required: true,
    },

    {
      prop: 'date3',
      label: '结束时间1',
      type: 'endDateRangePicker',
    },
    {
      prop: 'date4',
      label: '开始时间-十分',
      type: 'startDateRangePickerTime',
    },
    {
      prop: 'date5',
      label: '结束时间-十分',
      type: 'endDateRangePickerTime',
    },
    {
      prop: 'date6',
      label: '时间范围',
      type: 'dateRange',
    },
    {
      prop: 'date7',
      label: '带快捷时间',
      type: 'dateRangePanel',
    },
    {
      prop: 'text1',
      type: 'text',
      label: '文本',
      icon: 'el-icon-user',
      iconMethod: 'iconMethod',
    },
    {
      label: '段值名称',
      prop: 'segmentDescription',
      type: 'input',
      modifier: 'number',
    },
    {
      label: '备注',
      prop: 'sobId',
      type: 'textarea',
      span: 24,
    },
    {
      prop: 'select',
      label: '地区选择',
      type: 'select',
      options: [
        {
          value: '0',
          label: '深圳市',
        },
        {
          value: '1',
          label: '广州市',
        },
      ],
    },
    {
      prop: 'isChecked',
      type: 'checkbox',
      label: '是否勾选',
      labelPosition: 'right',
      // trueLabel: 1,
      // falseLabel: 0,
    },
    {
      label: '性别',
      prop: 'gender',
      type: 'radio',
      options: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
    },
    {
      label: '段值代码',
      prop: 'segmentlabel',
      type: 'number',
    },
    {
      prop: 'amount',
      type: 'inputNumber',
      label: '金额',
      append: '元',
    },
    {
      prop: 'tree',
      type: 'treeSelect',
      label: '树组件',
      // isMultiple: true,
      // isHidden: true,
      required: true,
      options: [
        { id: 1, label: '云南', parentId: -1 },
        { id: 2, label: '昆明', parentId: 1 },
        { id: 3, label: '五华区', parentId: 2 },
        { id: 4, label: '盘龙区', parentId: 2 },
        { id: 5, label: '湖南', parentId: -1 },
        { id: 6, label: '长沙', parentId: 5 },
        { id: 7, label: '永州', parentId: 5 },
        { id: 8, label: '北辰小区', parentId: 3 },
      ],
    },
  ]);
  const iconMethod = (val, key) => {
    console.log(val, key, '点击了');
  };
  const onSubmitHandler = (formData) => {
    console.log(formData, '数据');
  };
  const resetFormHandler = () => {};
  const filedChange = (val) => {
    console.log(val, '字段改变');
  };
</script>

<style lang="scss" scoped></style>
