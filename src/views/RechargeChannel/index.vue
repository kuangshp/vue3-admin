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
          @click="modifyRowHandler(scope.scope.row)"
          >修改</el-button
        >
        <el-button
          v-if="scope.scope.row.accountId != 1"
          link
          type="primary"
          @click="couponRowHandler(scope.scope.row)"
          >充值赠送</el-button
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
    <RechargeChannelDialog
      ref="rechargeChannelDialogRef"
      @uploadTable="initTableData"
    ></RechargeChannelDialog>
    <!-- 充值优惠 -->
    <RechargeChannelCouponDialog ref="rechargeChannelCouponDialogRef"></RechargeChannelCouponDialog>
  </div>
</template>

<script setup>
  import { RechargeChannelService } from '@/services';
  import { queryFormOption, tableOptions } from './data';
  import RechargeChannelDialog from './components/RechargeChannelDialog';
  import RechargeChannelCouponDialog from './components/RechargeChannelCouponDialog';
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
    const { result } = await RechargeChannelService.getPageApi({
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

  const rechargeChannelDialogRef = ref(null);
  // 新增操作
  const addNewHandler = () => {
    rechargeChannelDialogRef.value.openDialog();
  };
  // 编辑操作
  const modifyRowHandler = (rowData) => {
    rechargeChannelDialogRef.value.openDialog(rowData);
  };
  // 设置优惠
  const rechargeChannelCouponDialogRef = ref();
  const couponRowHandler = (rowData) => {
    rechargeChannelCouponDialogRef.value.openDialog(rowData);
  };
  // 修改状态
  const changeStatusHandler = async (rowData) => {
    if (rowData.channelId) {
      await RechargeChannelService.modifyStatusByIdApi(rowData.channelId);
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
      await RechargeChannelService.deleteByIdApi(rowData.channelId);
      ElMessage.success('删除成功');
      initTableData();
    });
  };
  onMounted(() => {
    initTableData();
  });
</script>

<style lang="scss" scoped></style>
