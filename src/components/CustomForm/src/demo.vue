<template>
  <div>
    {{ formData }}
    <CustomForm :options="options" v-model="formData" @queryHandler="queryHandler">
    </CustomForm>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const formData = ref({
    username: 'add',
    status: 1,
    hobby:[1]
  });
  const options = ref([
    {
      type: 'input',
      label: '用户名',
      prop: 'username',
      placeholder: '请输入用户名',
      rules: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
    },
    {
      type:'checkbox-group',
      label: '爱好',
      prop: 'hobby',
      children: [
        {type:'checkbox', label: '篮球', value: 1 },
        {type:'checkbox', label: '足球', value: 2 },
      ],
    },
    {
      type: 'select',
      label: '状态',
      prop: 'status',
      required: true,
      children: async () => {
        // 异步模拟请求
        await new Promise((resolve) => setTimeout(resolve, 500));
        return [
          {type:'option', label: '北京', value: 1 },
          {type:'option', label: '上海', value: 2 },
        ];
      },
    },
  ]);
  const queryHandler = (data) => {
    console.log(data);
  };
  const queryHandler1 = () => {
    console.log(formData.value);
  };
  const queryHandler2 = () => {
    console.log(formData.value);
  };
</script>

<style lang="scss" scoped></style>
