<template>
  <el-dialog
    v-if="dialogVisible"
    width="40%"
    v-model="dialogVisible"
    :title="title"
    @close="cancelHandler"
    draggable
  >
    <div>
      <el-scrollbar :max-height="400">
        <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="formData.oldPassword"
              placeholder="请输入旧密码"
              clearable
              type="password"
              show-password
              auto-complete="off"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入新密码"
              clearable
              type="password"
              show-password
              auto-complete="off"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="请输入确认密码"
              clearable
              type="password"
              show-password
              auto-complete="off"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue';
  import { AccountService } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore();
  const generateFormData = () => {
    return {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };
  };
  const formData = ref(generateFormData());
  const formRule = ref({
    oldPassword: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    password: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    confirmPassword: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const title = ref('修改密码');
  const dialogVisible = ref(false);
  const openDialog = async () => {
    dialogVisible.value = true;
  };
  const cancelHandler = () => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };
  const formRef = ref(null);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid, fields) => {
      if (valid) {
        await AccountService.modifyPasswordApi(formData.value);
        ElMessage.success('修改密码成功');
        setTimeout(() => {
          cancelHandler();
          appStore.logout();
        }, 2000);
      }
    });
  };
  defineExpose({
    openDialog,
  });
</script>
<style lang="scss" scoped></style>
