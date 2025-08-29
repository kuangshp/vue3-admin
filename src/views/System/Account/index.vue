<template>
  <div class="customer">
    <!-- 搜索 -->
    <CustomForm
      style="margin-bottom: 20px"
      v-model="queryFormData"
      :options="queryFormOptions"
      @queryHandler="fetchTableData"
    ></CustomForm>
    <!-- 表格区域 -->
    <CustomTable
      :options="tableOptions"
      :total="tableTotal"
      :pageNumber="pageNumberRef"
      :pageSize="pageSizeRef"
      :data="tableData"
      isCustomHeader
      v-loading="loading"
      element-loading-text="拼命加载中"
      @changePageHandler="changePageHandler"
      row-key="id"
      border
    >
      <template #tableHeader>
        <el-button type="primary" icon="Plus" @click="addNewHandler">新增</el-button>
      </template>
      <template #avatar="{ scope }">
        <el-image
          v-if="scope.row.avatar"
          class="word-img"
          :src="scope.row.avatar"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.avatar]"
          style="width: 50px; height: 50px"
          :preview-teleported="true"
          fit="cover"
        />
      </template>
      <template #lastLoginDate="{ scope }">
        <span v-if="scope.row.lastLoginDate > 0">{{
          formatDate(scope.row.lastLoginDate, true)
        }}</span>
      </template>
      <template #status="{ scope }">
        <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
      <template #action="{ scope }">
        <template v-if="scope.row.isAdmin != 1">
          <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.row)"
            >编辑</el-button
          >
          <el-button link type="primary" icon="Edit" @click="resetPasswordRowHandler(scope.row)"
            >重置密码</el-button
          >
          <el-popconfirm title="确定要删除?" @confirm="deleteRowHandler(scope.row)">
            <template #reference>
              <el-button link icon="Delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </template>
    </CustomTable>
    <!-- 账号弹框 -->
    <AccountDialog ref="accountDialogRef" @uploadTable="fetchTableData"></AccountDialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { AccountService } from '@/api';
  import { tableOptions, queryFormOptions } from './tableData';
  import { formatDate } from '@/utils';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useTableData } from '@/hooks';
  import AccountDialog from './components/AccountDialog.vue';
  import type { AccountType, QueryFormData } from './types';

  const generateFormData = (): QueryFormData => {
    return {
      username: '',
      mobile: '',
      email: '',
      status: null,
    };
  };

  const queryFormData = ref<QueryFormData>(generateFormData());
  const {
    loading,
    tableData,
    tableTotal,
    pageNumberRef,
    pageSizeRef,
    changePageHandler,
    fetchTableData,
  } = useTableData<AccountType>(AccountService.getPageApi, queryFormData.value);

  // 新增
  const accountDialogRef = ref<InstanceType<typeof AccountDialog> | null>(null);
  const addNewHandler = (): void => {
    accountDialogRef.value?.openDialog('create');
  };

  const editRowHandler = (rowData: AccountType): void => {
    accountDialogRef.value?.openDialog('edit', rowData);
  };

  // 删除行
  const deleteRowHandler = async (rowData: AccountType): Promise<void> => {
    await AccountService.deleteByIdApi(rowData.id);
    ElMessage.success('操作成功');
    fetchTableData();
  };

  // 重置为默认密码
  const resetPasswordRowHandler = (rowData: AccountType): void => {
    ElMessageBox.confirm('确定要重置密码', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await AccountService.resetPassWordApi(rowData.id);
      ElMessage.success('操作成功');
    });
  };

  onMounted(() => {
    fetchTableData();
  });
</script>

<style lang="scss" scoped></style>

