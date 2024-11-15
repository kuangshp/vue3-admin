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
        <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
          <el-form-item label="账号名称" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入账号名称"
              clearable
              :disabled="disabledUsername"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              clearable
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确定密码" prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="请输入确定密码"
              clearable
              type="password"
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
  import { AccountService } from '@/services';
  import { ElMessage } from 'element-plus';
  const emits = defineEmits(['uploadTable']);
  const dialogVisible = ref(false);
  const cancelHandler = () => {
    formData.value = {
      username: null,
      password: null,
      confirmPassword: null,
    };
    dialogVisible.value = false;
  };
  const disabledUsername = ref(false);
  const openDialog = async (rowData = {}) => {
    if (Object.keys(rowData).length) {
      formData.value = {
        ...formData.value,
        ...rowData,
      };
      title.value = '修改密码';
      disabledUsername.value = true;
    } else {
      title.value = '新增账号';
      disabledUsername.value = false;
    }
    dialogVisible.value = true;
  };
  const title = ref(null);
  const formData = ref({
    username: null,
    password: null,
    confirmPassword: null,
  });
  const formRule = ref({
    username: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    password: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    confirmPassword: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const formRef = ref(null);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid, fields) => {
      if (valid) {
        console.log(formData.value);
        if (formData.value.password != formData.value.confirmPassword) {
          ElMessage.error('两次密码不一致');
          return;
        }
        if (formData.value.accountId) {
          // 修改密码
          await AccountService.modifyPasswordByIdApi(formData.value);
          ElMessage.success('修改失败');
        } else {
          await AccountService.createApi(formData.value);
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

