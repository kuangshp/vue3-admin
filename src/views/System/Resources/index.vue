<template>
  <div class="container">
    <div style="display: flex; flex-direction: row">
      <el-button type="primary" icon="Plus" @click="addNewHandler">新增</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="margin-top: 20px"
      row-key="id"
      lazy
      :load="loadChildHandler"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :expand-row-keys="expandRowKeys"
      @expand-change="expandChangeHandler"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="resourcesType" label="类型" width="120" align="center">
        <template #default="scope">
          <el-tag type="info" v-if="scope.row.resourcesType == 1">模块</el-tag>
          <el-tag type="info" v-else-if="scope.row.resourcesType == 2">菜单</el-tag>
          <el-tag type="info" v-else-if="scope.row.resourcesType == 3">按钮</el-tag>
          <el-tag type="info" v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="80" show-overflow-tooltip align="center">
        <template #default="scope">
          <SvgIcon v-if="scope.row.icon" :icon="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="路径地址"
        width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
        width="120"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="状态" width="100" show-overflow-tooltip>
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="uniqueKey"
        label="权限标识符"
        show-overflow-tooltip
        width="120"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        show-overflow-tooltip
        min-width="120"
      ></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="editRowHandler(scope.row)"
            >修改</el-button
          >
          <el-popconfirm title="确定要删除?" @confirm="deleteRowHandler(scope.row)">
            <template #reference>
              <el-button link icon="Delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 20px">
      <el-pagination
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="tableTotal"
        @current-change="changePageHandler"
      />
    </div>
    <ResourcesDialog ref="resourcesDialogRef" @updateTable="initTableData" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ResourcesService } from '@/api';
  import { ElMessage } from 'element-plus';
  import ResourcesDialog from './components/ResourcesDialog.vue';
  import type { ResourceType, QueryOptions } from './types';

  const refreshTableTree = ref<
    Record<
      number,
      {
        row: ResourceType;
        treeNode: any;
        resolve: (data: ResourceType[]) => void;
        expandCount: number;
      }
    >
  >({});
  const tableData = ref<ResourceType[]>([]);
  const tableTotal = ref<number>(0);
  const pageSizeRef = ref<number>(10);
  const pageNumberRef = ref<number>(1);
  const expandRowKeys = ref<string[]>([]);
  const resourcesDialogRef = ref<InstanceType<typeof ResourcesDialog> | null>(null);

  // 加载更多数据
  const loadChildHandler = async (
    row: ResourceType,
    treeNode: any,
    resolve: (data: ResourceType[]) => void
  ): Promise<void> => {
    // 临时存储(expandCount避免循环加载)
    refreshTableTree.value[row.id] = { row, treeNode, resolve, expandCount: 0 };
    const { result } = await ResourcesService.getPageApi({
      parentId: row.id,
      pageSize: 100,
    });
    resolve(result.data);
    return;
  };

  // 新增
  const addNewHandler = (): void => {
    resourcesDialogRef.value?.openDialog('create');
  };

  // 初始化数据
  const initTableData = async (queryOption: QueryOptions = {}): Promise<void> => {
    const { result } = await ResourcesService.getPageApi({
      ...queryOption,
      pageNumber: pageNumberRef.value,
      pageSize: pageSizeRef.value,
    });
    tableData.value = result.data ?? [];
    tableTotal.value = result?.total ?? 0;
    expandRowKeys.value = [];
  };

  // 分页处理
  const changePageHandler = (page: number): void => {
    pageSizeRef.value = 10;
    pageNumberRef.value = page;
    initTableData();
  };

  // 展开行操作
  const expandChangeHandler = (rowData: ResourceType, isExpand: boolean): void => {
    // 触发拉取数据
    const curr = refreshTableTree.value[rowData.id];
    if (curr) {
      curr.expandCount++;
      if (isExpand && curr.expandCount > 1) {
        loadChildHandler(rowData, curr.treeNode, curr.resolve);
      }
    }
  };

  // 编辑行
  const editRowHandler = (rowData: ResourceType): void => {
    resourcesDialogRef.value?.openDialog('edit', rowData);
  };

  // 删除行
  const deleteRowHandler = async (rowData: ResourceType): Promise<void> => {
    await ResourcesService.deleteByIdApi(rowData.id);
    ElMessage.success('删除成功');
    initTableData();
  };

  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
</style>

