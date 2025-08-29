<template>
  <div>
    首页
    {{ formData }}
    <CustomForm v-model="formData" :options="options"></CustomForm>
  </div>
</template>

<script setup lang="ts">
  import type { CustomFormOption } from '@/components/CustomForm/types';
  import { ref } from 'vue';

  // 定义表单数据类型
  interface FormDataType {
    username: string;
    password: string;
    age: string;
    sex: string;
    email: string;
  }

  const formData = ref<FormDataType>({
    username: '',
    password: '',
    age: '',
    sex: '',
    email: '',
  });

  const options = ref<CustomFormOption[]>([
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
    },
    {
      type: 'input',
      label: '密码',
      prop: 'password',
    },
    // {
    //   type: 'input',
    //   label: '年龄',
    //   prop: 'age',
    // },
    // {
    //   type: 'input',
    //   label: '邮箱',
    //   prop: 'email',
    //   placeholder: '请输入密码',
    // },
    // {
    //   type: 'input',
    //   label: '性别',
    //   prop: 'sex',
    // },
  ]);
</script>

<style lang="scss" scoped></style>

