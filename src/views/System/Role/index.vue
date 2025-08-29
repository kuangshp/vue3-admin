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
      <template #lastLogin="{ scope }">
        <span v-if="scope.row.lastLogin > 0">{{ formatDate(scope.row.lastLogin, true) }}</span>
      </template>
      <template #status="{ scope }">
        <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
      <template #action="{ scope }">
        <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.row)"
          >编辑</el-button
        >
        <el-popconfirm title="确定要删除?" @confirm="deleteRowHandler(scope.row)">
          <template #reference>
            <el-button link icon="Delete" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </CustomTable>
    <RoleDialog ref="roleDialogRef" @uploadTable="fetchTableData"></RoleDialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { RoleService } from '@/api';
  import { tableOptions, queryFormOptions } from './tableData';
  import { formatDate } from '@/utils';
  import { useTableData } from '@/hooks';
  import { ElMessage } from 'element-plus';
  import RoleDialog from './components/RoleDialog.vue';
  import type { RoleType, QueryFormData } from './types';

  const generateFormData = (): QueryFormData => {
    return {
      name: '',
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
  } = useTableData<RoleType>(RoleService.getPageApi, queryFormData.value);

  // 新增
  const roleDialogRef = ref<InstanceType<typeof RoleDialog> | null>(null);
  const addNewHandler = (): void => {
    roleDialogRef.value?.openDialog('create');
  };

  const editRowHandler = (rowData: RoleType): void => {
    roleDialogRef.value?.openDialog('edit', rowData);
  };

  // 删除行
  const deleteRowHandler = async (rowData: RoleType): Promise<void> => {
    if (rowData.id) {
      await RoleService.deleteByIdApi(rowData.id);
      ElMessage.success('操作成功');
      fetchTableData();
    }
  };

  onMounted(() => {
    fetchTableData();
  });
</script>

<style lang="scss" scoped></style>

