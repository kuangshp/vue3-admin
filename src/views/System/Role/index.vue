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
      style="margin-top: 20px"
      @changePageHandler="changePageHandler"
    >
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
      </template>
      <template #status="{ scope }">
        <el-switch
          v-model="scope.row.status"
          @change="changeStatusHandler($event, scope.row)"
          :active-value="0"
          :inactive-value="1"
          size="small"
        />
      </template>
      <template #action="scope">
        <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.scope.row)"
          >修改</el-button
        >
        <el-button
          link
          size="small"
          type="danger"
          icon="Delete"
          @click="deleteRowHandler(scope.scope.row)"
          >删除</el-button
        >
      </template>
    </CustomTable>
    <!-- 角色 -->
    <RoleDialog ref="roleDialogRef" @uploadTable="initTableData"></RoleDialog>
  </div>
</template>

<script setup>
  import { RoleService } from '@/services';
  import { queryFormOption, tableOptions } from './data';
  import { onMounted } from 'vue';
  import RoleDialog from './components/RoleDialog';
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
    const { result } = await RoleService.getPageApi({
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
  // 新增
  const roleDialogRef = ref(null);
  const addNewHandler = async () => {
    roleDialogRef.value.openDialog();
  };
  // 修改状态
  const changeStatusHandler = async (value, rowData) => {
    if (rowData.id) {
      await RoleService.modifyStatusByIdApi(rowData.id);
      initTableData();
    }
  };
  // 编辑操作
  const editRowHandler = async (rowData) => {
    roleDialogRef.value.openDialog(rowData);
  };
  // 删除操作
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '删除提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await RoleService.deleteByIdApi(rowData.id);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
