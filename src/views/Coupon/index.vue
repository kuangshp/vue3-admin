<template>
  <div>
    <!-- 搜索区域 -->
    <CustomForm :options="queryFormOption" @queryHandler="queryHandler"></CustomForm>

    <!-- 表格区域 -->
    <CustomTable :options="tableOptions" :data="tableData" border style="margin-top: 20px">
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
      </template>
      <template #action="scope">
        <el-button size="small" type="primary" @click="editRowHandler(scope.scope)">编辑</el-button>
        <el-button size="small" type="danger" @click="deleteRowHandler(scope.scope)"
          >删除</el-button
        >
      </template>
    </CustomTable>
    <!-- 编辑和新增账号 -->
    <FormDialog
      :title="title"
      v-model:visible="isVisibleDialog"
      :options="formOption"
      :formData="formData"
      @getFormData="getFormData"
    ></FormDialog>
  </div>
</template>

<script setup>
  import { formatDate } from '@/utils';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { tableOptions, formOption, queryFormOption } from './index.js';
  const isVisibleDialog = ref(false);
  const tableData = ref([
    {
      id: 1,
      username: '张三',
      createTime: formatDate(new Date(), true),
      updateTime: formatDate(new Date(), true),
    },
  ]);

  // 表单
  const title = ref('');
  const formData = {
    username: null,
  };

  const queryHandler = (queryData) => {
    console.log(queryData);
  };
  const addNewHandler = () => {
    title.value = '新增账号';
    isVisibleDialog.value = true;
  };
  const editRowHandler = (rowData) => {
    title.value = '编辑账号';
    isVisibleDialog.value = true;
  };
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '删除提示').then(async () => {
      // await ShopService.deleteShopApi(rowData.id);
      ElMessage.success('删除成功');
      // initTableList();
    });
  };
  const getFormData = (formData) => {
    console.log(formData);
  };
</script>

<style lang="scss" scoped></style>
