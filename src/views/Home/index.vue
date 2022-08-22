<template>
  <div>
    <div>首页</div>
    <div>{{ $t('msg.test') }}</div>
    <CustomForm
      :formFields="formFields"
      @query="onSubmitHandler"
      @resetForm="resetFormHandler"
      :formData="formData"
      :isQueryPanel="true"
      labelPosition="top"
    ></CustomForm>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import CustomForm from '@/components/CustomForm';

// 表单的数据
const formFields = reactive([
  {
    code: 'sobName',
    label: '账套名称',
  },
  {
    code: 'sobCode',
    label: '账套代码',
    // hidden: true,
  },
  {
    label: '账套名称',
    code: 'sobId',
  },
  {
    label: '段值名称',
    code: 'segmentDescription',
    type: 'input',
  },
  {
    label: '段值代码',
    code: 'segmentName',
    type: 'input',
  },
  // {
  //   label: '段值分类属性',
  //   code: 'segmentType',
  //   type: 'radio',
  //   options: [
  //     {
  //       label: '你好',
  //       value: 1,
  //     },
  //     {
  //       label: '你不好',
  //       value: 2,
  //     },
  //   ],
  // },
  // {
  //   label: '数据类型',
  //   code: 'dataType',
  // },
  // {
  //   label: '数据值类型',
  //   code: 'valueType',
  // },
  // {
  //   label: '值',
  //   code: 'value',
  //   type: 'input',
  // },
  // {
  //   label: '是否有效',
  //   code: 'enabledFlag',
  //   type: 'select',
  //   options: [
  //     {
  //       label: '有效',
  //       value: 1,
  //     },
  //     {
  //       label: '无效',
  //       value: 2,
  //     },
  //   ],
  // },
]);
// 定义表单数据
const formData = ref({});
const computedFormData = () => {
  const resultMap = {};
  for (const item of formFields) {
    if (!item.hidden) {
      resultMap[item.code] = '';
    }
  }
  formData.value = resultMap;
};
onMounted(() => {
  computedFormData();
});
// 提交
const onSubmitHandler = (data) => {
  console.log(data, '表单数据');
};
// 重置表单
const resetFormHandler = (data) => {
  formData.value = data;
};
</script>

<style lang="scss" scoped></style>
