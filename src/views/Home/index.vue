<template>
  <div>
    <div>首页</div>
    <form-create :rule="rule" v-model="fApi" :option="options" />
    {{ fApi }}
  </div>
</template>

<script setup>
  const fApi = ref({});
  const options = {
    form: {
      // inline: true,
      labelWidth:'100px'
    },
    submitBtn: {
      innerText: '提交1',
      // click: (formData) => {
      //   console.log(formData);
      //   // alert(JSON.stringify(formData));
      // },
    },
    onSubmit: (formData) => {
      alert(JSON.stringify(formData));
    },
    resetBtn: {
      innerText: '重置1',
      show: true,
    },
    row: {
      gutter:20
    }
  };
  const rule = [
    {
      type: 'input',
      field: 'goods_name',
      title: '商品名称',
      value: '',
      props: {
        placeholder: '请输入商品名称',
        clearable: true,
      },
      // effect: {
      //   required: true
      // },
      validate: [
        {
          trigger: 'blur',
          required: true,
          message: '请输入商品名称',
        },
      ],
      col: {
        span: 6,
      },
      style: {
        width: '100%',
      },
    },
    {
      type: 'input',
      field: 'name',
      title: '名字',
      value: '',
      col: {
        span: 6,
      },
    },
    {
      type: 'input',
      field: 'age',
      title: '年龄',
      value: '',
      col: {
        span: 6,
      },
    },
    {
      type: 'input',
      field: 'address',
      title: '地址',
      value: '',
      col: {
        span: 6,
      },
    },
    {
      type: 'checkbox',
      field: 'label',
      title: '标签',
      value: [0, 1, 2, 3],
      options: [
        { label: '好用', value: 0 },
        { label: '快速', value: 1 },
        { label: '高效', value: 2 },
        { label: '全能', value: 3 },
      ],
      col: {
        span: 6,
      },
    },
    // {
    //   type: 'el-button',
    //   title: '自定义按钮',
    //   native: false,
    //   on: {
    //     click() {
    //       alert('点击了按钮');
    //     },
    //   },
    //   children: ['按钮'],
    // },
  ];
</script>

<style lang="scss" scoped></style>
