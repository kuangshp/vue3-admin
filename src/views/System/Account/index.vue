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
        <template v-if="scope.row.isAdmin != 1">
          <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.row)">编辑</el-button>
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

<script setup>
  import { ref, onMounted } from 'vue';
  import { AccountService } from '@/api';
  import QueryForm from './components/QueryForm.vue';
  import { tableOptions } from './tableData';
  import { formatDate } from '@/utils';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import AccountDialog from './components/AccountDialog.vue';

  const loading = ref(false);
  const tableData = ref([]);
  const tableTotal = ref(10);
  const pageNumberRef = ref(1);
  const pageSizeRef = ref(10);

  // 定义数据类型
  const fetchTableData = async (params = {}) => {
    try {
      loading.value = true;
      const { result } = await AccountService.getPageApi({
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
  const accountDialogRef = ref();
  const addNewHandler = () => {
    accountDialogRef.value.openDialog('create');
  };

  const editRowHandler = (rowData) => {
    accountDialogRef.value.openDialog('edit', rowData);
  };
  // 删除行
  const deleteRowHandler = async (rowData) => {
    await AccountService.deleteByIdApi(rowData.id);
    ElMessage.success('操作成功');
    fetchTableData();
  };
  // 重置为默认密码
  const resetPasswordRowHandler = (rowData) => {
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
