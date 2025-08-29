<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    width="40%"
    :title="title"
    @close="cancelHandler"
    draggable
  >
    <div>
      <el-scrollbar :max-height="400">
        <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="电邮地址" prop="email">
            <el-input v-model="formData.email" placeholder="请输入电邮地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="/"
              accept=".png,.jpg,.jpeg,.gif"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="onChangeHandler"
              ref="uploadRef"
            >
              <img v-if="formData.avatar" :src="formData.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
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

<script setup lang="ts">
  import { ref } from 'vue';
  import { AccountService, UploadFileService } from '@/api';
  import { ElMessage } from 'element-plus';
  import { Plus } from '@element-plus/icons-vue';
  import type { UserInfoFormData } from '@/types/layout';

  const generateFormData = (): UserInfoFormData => {
    return {
      mobile: '',
      email: '',
      avatar: '',
    };
  };
  const formData = ref<UserInfoFormData>(generateFormData());
  const formRule = ref<
    Record<
      string,
      Array<{
        required: boolean;
        message: string;
        trigger: string[];
      }>
    >
  >({
    name: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const title = ref<string>('个人信息');
  const dialogVisible = ref<boolean>(false);
  const openDialog = async (): Promise<void> => {
    await initUserInfo();
    dialogVisible.value = true;
  };

  // 获取用户基本信息
  const initUserInfo = async (): Promise<void> => {
    const { result } = await AccountService.getCurrentAccountApi();
    formData.value = {
      ...formData.value,
      ...result,
    };
  };

  // 上传头像
  const uploadRef = ref<InstanceType<typeof import('element-plus').ElUpload> | null>(null);
  const onChangeHandler = async (uploadFile: any): Promise<void> => {
    try {
      let postFormData = new FormData();
      postFormData.append('file', uploadFile.raw);
      const { result } = await UploadFileService.uploadApi(postFormData);
      console.log(result);
      formData.value = {
        ...formData.value,
        avatar: result.url,
      };
    } finally {
      // 清理可以再次出发change
      uploadRef.value?.clearFiles();
    }
  };

  const cancelHandler = (): void => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };

  const formRef = ref<InstanceType<typeof import('element-plus').ElForm> | null>(null);
  const confirmHandler = async (): Promise<void> => {
    await formRef.value?.validate(async (valid, fields) => {
      if (valid) {
        await AccountService.modifyCurrentAccountApi(formData.value);
        ElMessage.success('修改成功');
        cancelHandler();
      }
    });
  };

  defineExpose({
    openDialog,
  });
</script>
<style lang="scss" scoped>
  .avatar-uploader {
    .avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
  }

  .avatar-uploader .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
  }
</style>

