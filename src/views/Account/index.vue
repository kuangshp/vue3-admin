<template>
  <div>
    <!-- 上面表单搜索 -->
    <CustomForm :options="queryFormOption" @queryHandler="queryHandler"></CustomForm>
    <!-- 表格区域 -->
    <CustomTable
      :options="tableOptions"
      :total="tableTotal"
      :pageNumber="pageNumberRef"
      :pageSize="pageSizeRef"
      :data="tableData"
      border
      row-key="accountId"
      style="margin-top: 20px"
      @changePageHandler="changePageHandler"
    >
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
      </template>
      <template #status="{ scope }">
        <el-switch
          v-model="scope.row.status"
          @change="changeStatusHandler(scope.row)"
          :active-value="0"
          :inactive-value="1"
        />
      </template>
      <template #action="scope">
        <el-button
          v-if="scope.scope.row.accountId != 1"
          link
          type="primary"
          @click="modifyPasswordRowHandler(scope.scope.row)"
          >修改密码</el-button
        >
        <el-button
          v-if="scope.scope.row.accountId != 1"
          link
          size="small"
          type="danger"
          @click="deleteRowHandler(scope.scope.row)"
          >删除</el-button
        >
      </template>
    </CustomTable>
    <!-- 表单弹框 -->
    <AccountDialog ref="accountDialogRef" @uploadTable="initTableData"></AccountDialog>
  </div>
</template>

<script setup>
  import { AccountService } from '@/services';
  import { queryFormOption, tableOptions } from './data';
  import AccountDialog from './components/AccountDialog';
  import { onMounted } from 'vue';
  const tableData = ref([]);
  const tableTotal = ref(0);
  const pageSizeRef = ref(10);
  const pageNumberRef = ref(1);
  // 搜索
  const queryHandler = (queryData) => {
    initTableData(queryData);
  };
  // 初始化表格数据
  const initTableData = async (queryData = {}) => {
    const { result } = await AccountService.getPageApi({
      ...queryData,
      pageSize: pageSizeRef.value,
      pageNumber: pageNumberRef.value,
    });
    tableData.value = result.data ?? [];
    tableTotal.value = result?.total ?? 0;
  };
  const changePageHandler = ({ page, limit }) => {
    pageSizeRef.value = limit;
    pageNumberRef.value = page;
    initTableData();
  };

  const accountDialogRef = ref(null);
  // 新增操作
  const addNewHandler = async () => {
    accountDialogRef.value.openDialog();
  };
  // 编辑操作
  const modifyPasswordRowHandler = async (rowData) => {
    accountDialogRef.value.openDialog(rowData);
  };
  // 修改状态
  const changeStatusHandler = async (rowData) => {
    if (rowData.accountId) {
      await AccountService.modifyStatusByIdApi(rowData.accountId);
      initTableData();
    }
  };

  // 删除操作
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '删除提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await AccountService.deleteByIdApi(rowData.accountId);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
