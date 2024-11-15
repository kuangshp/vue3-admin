<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    width="40%"
    :title="title"
    @close="cancelHandler"
  >
    <template #default>
      <el-scrollbar :max-height="400">
        <el-form :model="formData" :rules="formRule" label-width="auto" ref="formRef">
          <el-form-item label="充值渠道" prop="name">
            <el-input v-model="formData.name" placeholder="请输入充值渠道" clearable></el-input>
          </el-form-item>
          <el-form-item label="渠道说明" prop="describe">
            <el-input
              v-model="formData.describe"
              placeholder="请输入渠道说明"
              clearable
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="费率类型" prop="rateType">
            <el-radio-group v-model="formData.rateType">
              <el-radio :value="0" label="固定费率"></el-radio>
              <el-radio :value="1" label="浮动汇率"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="费率" prop="rate">
            <el-input v-model="formData.rate" placeholder="请输入费率" clearable></el-input>
          </el-form-item>
          <el-form-item label="最小充值金额" prop="minRecharge">
            <el-input
              v-model="formData.minRecharge"
              placeholder="请输入最小充值金额"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="最多充值金额" prop="maxRecharge">
            <el-input
              v-model="formData.maxRecharge"
              placeholder="请输入最多充值金额"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </template>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineEmits, defineExpose } from 'vue';
  import { RechargeChannelService } from '@/services';
  import { ElMessage } from 'element-plus';
  const emits = defineEmits(['uploadTable']);

  const generateFormModel = () => {
    return {
      name: '',
      describe: '',
      rateType: 0,
      rate: '0',
      minRecharge: '',
      maxRecharge: '',
    };
  };
  const formData = ref(generateFormModel());
  const dialogVisible = ref(false);
  const cancelHandler = () => {
    formData.value = generateFormModel();
    dialogVisible.value = false;
  };
  const disabledUsername = ref(false);
  const openDialog = async (rowData = {}) => {
    if (Object.keys(rowData).length) {
      formData.value = {
        ...formData.value,
        ...rowData,
        // rateType:String(rowData.rateType),
      };
      title.value = '修改充值渠道';
      disabledUsername.value = true;
    } else {
      title.value = '新增充值渠道';
      disabledUsername.value = false;
    }
    dialogVisible.value = true;
  };
  const title = ref(null);
  const formRule = ref({
    name: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    rateType: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    rate: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    minRecharge: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    maxRecharge: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const formRef = ref(null);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid, fields) => {
      if (valid) {
        if (formData.value.maxRecharge < formData.value.minRecharge) {
          ElMessage.error('最大充值金额要大于最小充值金额');
          return;
        }
        if (formData.value.channelId) {
          await RechargeChannelService.modifyByIdApi(formData.value.channelId,formData.value);
          ElMessage.success('修改失败');
        } else {
          await RechargeChannelService.createApi(formData.value);
          ElMessage.success('创建成功');
        }
        emits('uploadTable');
        cancelHandler();
      } else {
        console.log('error submit!', fields);
        ElMessage.error('请补充资料');
      }
    });
  };

  // 暴漏方法出去
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>

