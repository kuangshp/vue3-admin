<template>
  <div class="customer">
    <!-- 搜索 -->
    <QueryForm style="margin-bottom: 20px" @searchHandler="searchHandler"></QueryForm>
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
      row-key="accountId"
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
        <el-tag type="success" v-if="scope.row.status == 0">正常</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
      <template #action="{ scope }">
        <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.row)">编辑</el-button>
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

<script setup>
  import { ref, onMounted } from 'vue';
  import { RoleService } from '@/api';
  import QueryForm from './components/QueryForm.vue';
  import { tableOptions } from './tableData';
  import { formatDate } from '@/utils';
  import { ElMessage } from 'element-plus';
  import RoleDialog from './components/RoleDialog.vue';

  const loading = ref(false);
  const tableData = ref([]);
  const tableTotal = ref(10);
  const pageNumberRef = ref(1);
  const pageSizeRef = ref(10);

  // 定义数据类型
  const fetchTableData = async (params = {}) => {
    try {
      loading.value = true;
      const { result } = await RoleService.getPageApi({
        ...params,
        pageSize: pageSizeRef.value,
        pageNumber: pageNumberRef.value,
      });
      tableData.value = result.list;
      tableTotal.value = result.total;
    } finally {
      loading.value = false;
    }
  };

  // 翻页操作
  const changePageHandler = ({ page, limit }) => {
    pageSizeRef.value = limit;
    pageNumberRef.value = page;
    fetchTableData();
  };

  // 搜索
  const searchHandler = (queryParams) => {
    pageNumberRef.value = 1;
    fetchTableData(queryParams);
  };

  // 新增
  const roleDialogRef = ref();
  const addNewHandler = () => {
    roleDialogRef.value.openDialog('create');
  };

  const editRowHandler = (rowData) => {
    roleDialogRef.value.openDialog('edit', rowData);
  };

  // 删除行
  const deleteRowHandler = async (rowData) => {
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
