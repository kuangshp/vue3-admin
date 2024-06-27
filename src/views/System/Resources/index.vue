<template>
  <div>
    <CustomTable
      :options="tableOptions"
      :total="tableTotal"
      :pageNumber="pageNumberRef"
      :pageSize="pageSizeRef"
      :data="tableData"
      border
      style="margin-top: 20px"
      @changePageHandler="changePageHandler"
      row-key="id"
      lazy
      :load="loadChildHandler"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :expand-row-keys="expandRowKeys"
      @expand-change="expandChangeHandler"
    >
      <template #tableHeader>
        <el-button type="primary" @click="addNewHandler">新增</el-button>
      </template>
      <template #resourcesType="{ scope }">
        <el-tag type="info" v-if="scope.row.resourcesType == 0">模块</el-tag>
        <el-tag type="info" v-else-if="scope.row.resourcesType == 1">菜单</el-tag>
        <el-tag type="info" v-else-if="scope.row.resourcesType == 2">按钮</el-tag>
        <el-tag type="info" v-else>未知</el-tag>
      </template>
      <template #icon="{ scope }">
        <SvgIcon v-if="scope.row.icon" :icon="scope.row.icon" />
      </template>
      <template #status="{ scope }">
        <el-switch
          v-model="scope.row.status"
          @change="changeStatusHandler(scope.row)"
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
    <ResourcesDialog ref="resourcesDialogRef" @updateTable="initTableData" />
  </div>
</template>

<script setup>
  import { ResourcesService } from '@/services';
  import { onMounted } from 'vue';
  import ResourcesDialog from './components/ResourcesDialog.vue';
  import { formatDate } from '@/utils';
  import { tableOptions } from './data';
  import { ElMessageBox, ElMessage } from 'element-plus';

  const formatDateStr = (data, isDue) => formatDate(data, isDue);
  const refreshTableTree = ref({});
  const tableData = ref([]);
  const tableTotal = ref(0);
  const pageSizeRef = ref(10);
  const pageNumberRef = ref(1);

  // 加载更多数据
  const loadChildHandler = async (row, treeNode, resolve) => {
    console.log(row.id, treeNode, '加载...', resolve);
    // 临时存储(expandCount避免循环加载)
    refreshTableTree.value[row.id] = { row, treeNode, resolve, expandCount: 0 };
    const { result } = await ResourcesService.getResourcesTreeApi({
      parentId: row.id,
      pageSize: 100,
    });
    resolve(result.data);
    return;
  };

  const resourcesDialogRef = ref(null);
  const addNewHandler = () => {
    resourcesDialogRef.value.openDialog();
  };
  // 初始化数据
  const expandRowKeys = ref([]);
  const initTableData = async (queryOption = {}) => {
    const { result } = await ResourcesService.getResourcesTreeApi({
      ...queryOption,
      pageNumber: pageNumberRef.value,
      pageSize: pageSizeRef.value,
    });
    tableData.value = result.data ?? [];
    tableTotal.value = result?.total ?? 0;
    expandRowKeys.value = [];
  };

  const changePageHandler = ({ page, limit }) => {
    pageSizeRef.value = limit;
    pageNumberRef.value = page;
    initTableData();
  };
  // 展开行操作
  const expandChangeHandler = (rowData, isExpand) => {
    // 触发拉取数据
    const curr = refreshTableTree.value[rowData.id];
    curr.expandCount++;
    if (isExpand && curr.expandCount > 1) {
      loadChildHandler(rowData, curr.treeNode, curr.resolve);
    }
  };
  onMounted(() => {
    initTableData();
  });
  // 修改状态
  const changeStatusHandler = async (rowData) => {
    if (rowData.id) {
      await ResourcesService.modifyStatusByIdApi(rowData.id);
      ElMessage.success('更新成功');
      initTableData();
    }
  };
  const editRowHandler = async (rowData) => {
    resourcesDialogRef.value.openDialog(rowData);
  };
  const deleteRowHandler = (rowData) => {
    ElMessageBox.confirm('确定要删除', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      await ResourcesService.deleteByIdApi(rowData.id);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
</script>

<style lang="scss" scoped></style>
