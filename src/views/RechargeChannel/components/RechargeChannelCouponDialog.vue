<template>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" title="充值赠送" @close="cancelHandler">
    <div>
      <el-form :model="formData" :rules="formRule" label-width="auto" ref="formRef">
        <el-form-item label="优惠名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入优惠名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="充值金额" prop="rechargeAmount">
          <el-input
            v-model="formData.rechargeAmount"
            placeholder="请输入充值金额"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠金额" prop="couponAmount">
          <el-input
            v-model="formData.couponAmount"
            placeholder="请输入优惠金额"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="formData.remark"
            placeholder="请输入备注"
            clearable
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label=" " prop="">
          <el-button type="default" style="margin-right: 10px" @click="cancelHandler"
            >重置</el-button
          >
          <el-button type="primary" @click="confirmHandler">确认</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" max-height="250" border stripe>
        <el-table-column prop="name" label="优惠名称" width="180" />
        <el-table-column prop="rechargeAmount" label="充值金额" width="180" />
        <el-table-column prop="couponAmount" label="优惠金额"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              @change="changeStatusHandler(scope.row)"
              :active-value="0"
              :inactive-value="1"
            />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue';

  const formData = ref({
    channelId: null,
    name: '',
    rechargeAmount: '',
    couponAmount: '',
    remark: '',
  });
  const formRule = ref({
    name: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    rechargeAmount: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    couponAmount: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });

  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      status:1,
    },
    
  ];
  const dialogVisible = ref(false);
  const openDialog = async (rowData = {}) => {
    console.log(rowData);
    dialogVisible.value = true;
  };
  const cancelHandler = () => {
    dialogVisible.value = false;
  };
  const confirmHandler = async () => {
    cancelHandler();
  };
  defineExpose({
    openDialog,
  });

  // 修改状态
  const changeStatusHandler = (rowData) => {
    console.log(rowData);
  }
</script>

<style lang="scss" scoped></style>
