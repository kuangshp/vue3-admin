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
    ></CustomForm>
    <el-button @click="openDialogHandler">点击打开弹框</el-button>
    <el-button @click="openDialogFormHandler">点击打开表格弹框</el-button>
    <CustomDialog ref="dialogRef" title="普通弹框">
      <h1>你好</h1>
    </CustomDialog>
    <DialogForm
      ref="dialogFormRef"
      title="新增用户"
      :formFields="formFields"
      :formData="formData"
      :rules="rules"
      width="700px"
    ></DialogForm>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import CustomForm from '@/components/CustomForm';
  import CustomDialog from '@/components/CustomDialog';
  import DialogForm from '@/components/DialogForm';

  // 表单的数据
  const formFields = reactive([
    {
      prop: 'sobName',
      label: '账套名称',
    },
    {
      prop: 'sobCode',
      label: '账套代码',
      // hidden: true,
    },
    {
      label: '账套名称',
      prop: 'sobId',
      type: 'textarea',
      rows: 4,
    },
    {
      label: '段值名称',
      prop: 'segmentDescription',
      type: 'input',
    },
    {
      label: '段值代码',
      prop: 'segmentName',
      type: 'number',
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
    // {
    //   label: '段值分类属性',
    //   prop: 'segmentType',
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
    //   prop: 'dataType',
    // },
    // {
    //   label: '数据值类型',
    //   prop: 'valueType',
    // },
    // {
    //   label: '值',
    //   prop: 'value',
    //   type: 'input',
    // },
    // {
    //   label: '是否有效',
    //   prop: 'enabledFlag',
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
  const formData = reactive({
    sobName: 'hello',
  });
  // 提交
  const onSubmitHandler = (data) => {
    console.log(data, '表单数据');
  };
  // 重置表单
  const resetFormHandler = (data) => {
    formData.value = data;
  };

  // 打开弹框
  const dialogRef = ref(null);
  const openDialogHandler = () => {
    console.log('点击了', dialogRef);
    dialogRef.value.openDialog();
  };

  const dialogFormRef = ref(null);
  const openDialogFormHandler = () => {
    console.log(dialogFormRef);
    dialogFormRef.value.openDialog();
  };
  const rules = reactive({
    sobName: [
      {
        required: true,
        message: '必填字段',
        trigger: 'blur',
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
