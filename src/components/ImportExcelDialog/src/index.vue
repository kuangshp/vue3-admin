<template>
  <CustomModal
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="props.title"
    @close="cancelHandler"
    width="600px"
  >
    <div>
      <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
        <el-form-item v-if="props.isSowTemplate" label="模板下载" prop="name">
          <el-button link type="primary" @click="downloadTemplateHandler">模版文件</el-button>
        </el-form-item>
        <el-form-item label="选择文件">
          <CustomUpload
            :fileType="['xls', 'xlsx']"
            :isAutoUpload="false"
            viewUploadFile
            v-bind="inputAttrs"
            ref="customUploadRef"
            @uploadSuccess="uploadSuccessHandler"
          ></CustomUpload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, useAttrs, computed, withDefaults } from 'vue';
  import { ElForm } from 'element-plus';
  import CustomModal from '@/components/CustomModal';
  import CustomUpload from '@/components/CustomUpload';
  import type { CustomUploadExpose } from '@/components/CustomUpload/types';

  // 定义props接口
  interface ImportExcelDialogProps {
    // 标题
    title?: string;
    // 是否显示模版
    isSowTemplate?: boolean;
    [key: string]: any;
  }

  // 定义emits类型
  const emit = defineEmits<{
    uploadSuccessHandler: [];
  }>();

  // 定义props
  const props = withDefaults(defineProps<ImportExcelDialogProps>(), {
    title: '导入数据',
    isSowTemplate: false,
  });

  const attrs = useAttrs();

  // 透传非 props 的属性到 下个组件中
  const inputAttrs = computed(() => {
    const { title, isSowTemplate, ...rest } = attrs;
    return rest;
  });

  // 生成表单数据
  const generateFormData = (): Record<string, any> => {
    return {};
  };

  const formData = ref<Record<string, any>>(generateFormData());
  const formRule = ref<Record<string, any>>({});
  const dialogVisible = ref<boolean>(false);
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const customUploadRef = ref<(InstanceType<typeof ElForm> & CustomUploadExpose) | null>(null);

  /**
   * 打开对话框
   */
  const openDialog = async (): Promise<void> => {
    dialogVisible.value = true;
  };

  /**
   * 取消处理
   */
  const cancelHandler = (): void => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };

  /**
   * 确认导入
   */
  const confirmHandler = async (): Promise<void> => {
    console.log('点击了按钮');
    if (customUploadRef.value) {
      await customUploadRef.value.uploadFileHandler();
    }
  };

  /**
   * 下载模板
   */
  const downloadTemplateHandler = (): void => {
    console.log('下载模板');
  };

  /**
   * 上传成功处理
   */
  const uploadSuccessHandler = (): void => {
    cancelHandler();
    emit('uploadSuccessHandler');
  };

  // 暴露方法
  defineExpose({
    openDialog,
  });
</script>
<style lang="scss" scoped></style>

