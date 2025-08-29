<template>
  <div class="upload-file">
    <!-- 上传控件 -->
    <el-upload
      ref="uploadRef"
      :multiple="multiple"
      :accept="acceptStr"
      :file-list="elementFileList"
      :limit="limit"
      action="/"
      :show-file-list="false"
      :auto-upload="false"
      class="upload-file-uploader"
      :before-upload="validateFile"
      :on-exceed="handleExceed"
      :on-change="uploadHandler"
      :disabled="disabled"
    >
      <el-button :disabled="disabled" type="primary" :link="isLink">{{ title }}</el-button>
    </el-upload>

    <!-- 提示信息 -->
    <div v-if="showTips" class="el-upload__tip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b class="text-danger">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileTypesStr">
        格式为 <b class="text-danger">{{ fileTypesStr }}</b>
      </template>
      的文件
    </div>

    <!-- 文件列表 -->
    <ul v-if="viewUploadFile && finalFileList.length" class="upload-file-list">
      <!-- 文件项 -->
      <li v-for="(file, index) in finalFileList" :key="file.uid" class="file-item">
        <el-link href="javascript:void(0);" target="_blank" class="file-link">
          <el-icon style="margin-right: 10px"><Document /></el-icon>
          {{ file.name }}
        </el-link>
        <div class="file-actions">
          <el-link type="danger" @click="removeFile(index)"> 删除 </el-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomUpload',
    inheritAttrs: false,
  };
</script>

<script setup lang="ts">
  import { ref, computed, watch, defineEmits, defineProps, withDefaults } from 'vue';
  import type { UploadFile, UploadFiles } from 'element-plus';
  import { ElMessage, ElLoading } from 'element-plus';
  import { Document } from '@element-plus/icons-vue';
  import { UploadFileService } from '@/api';
  import type {
    UploadFileItem,
    CustomUploadProps,
    CustomUploadEmits,
    CustomUploadExpose,
  } from '../types';

  // 定义props
  const props = withDefaults(defineProps<CustomUploadProps>(), {
    modelValue: () => [],
    type: 1,
    limit: 9,
    fileSize: 10,
    fileType: () => [],
    isShowTip: true,
    isShowSortInput: false,
    title: '上传文件',
    isLink: false,
    multiple: false,
    viewUploadFile: true,
    params: () => ({}),
    uploadFile: 'file',
    uploadExitData: () => ({}),
    isAutoUpload: true,
    disabled: false,
    isManyFiles: false,
  });

  // 定义emits
  const emit = defineEmits<CustomUploadEmits>();

  // 类型转换函数
  const toElementUploadFile = (item: UploadFileItem): UploadFile => ({
    uid: item.uid,
    name: item.name,
    url: item.url,
    status: 'success',
    raw: item.raw,
  });

  const toOurUploadFileItem = (file: UploadFile): UploadFileItem => ({
    uid: file.uid,
    name: file.name,
    url: file.url,
    raw: file.raw,
    nameBack: '',
    custOrd: 0,
  });

  // 文件列表处理
  const normalizeFileItem = (item: string | UploadFileItem, index: number): UploadFileItem => {
    if (typeof item === 'string') {
      return {
        uid: Date.now(),
        name: item,
        url: item,
        nameBack: '',
        custOrd: index + 1,
      };
    }
    return {
      ...item,
      uid: item.uid || Date.now(),
      custOrd: item.custOrd || index + 1,
    };
  };

  const initialFileList = computed<UploadFileItem[]>(() => {
    if (!props.modelValue) return [];
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.map((item, index) => normalizeFileItem(item, index));
    }
    return String(props.modelValue)
      .split(',')
      .filter(Boolean)
      .map((item, index) => normalizeFileItem(item, index));
  });

  const fileList = ref<UploadFileItem[]>([]);
  const elementFileList = computed<UploadFile[]>(() => fileList.value.map(toElementUploadFile));

  watch(initialFileList, (newVal) => (fileList.value = newVal), { immediate: true });

  // 上传组件引用
  const uploadRef = ref<any>(null);

  // 计算属性
  const showTips = computed<boolean>(
    () => props.isShowTip && (props.fileSize > 0 || props.fileType.length > 0)
  );
  const acceptStr = computed<string>(() => props.fileType.map((ext) => `.${ext}`).join(','));
  const fileTypesStr = computed<string>(() => props.fileType.join('/'));
  const fileSize = computed<number>(() => props.fileSize || 0);

  // 上传处理
  const validateFile = (file: File): boolean => {
    const { name, size } = file;
    const ext = name.split('.').pop()?.toLowerCase() || '';

    // 验证文件类型
    if (props.fileType.length > 0 && !props.fileType.includes(ext)) {
      ElMessage.error(`仅支持 ${fileTypesStr.value} 格式文件`);
      return false;
    }

    // 验证文件大小
    if (size > fileSize.value * 1024 * 1024) {
      ElMessage.error(`文件大小不能超过 ${fileSize.value}MB`);
      return false;
    }

    return true;
  };

  // 上传文件处理
  let debounceTimer: number | null = null;
  const finalFileList = ref<UploadFileItem[]>([]);
  const uploadResultFileList = ref<UploadFileItem[]>([]);

  const uploadHandler = (file: UploadFile, files: UploadFiles) => {
    const changedFile = toOurUploadFileItem(file);
    const changedFiles = files.map(toOurUploadFileItem);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(() => {
      finalFileList.value = [...changedFiles];
      if (props.isAutoUpload) {
        uploadFileHandler();
      }
    }, 500);
  };

  const uploadFileHandler = async (): Promise<void> => {
    if (finalFileList.value.length === 0) {
      ElMessage.warning('请选择文件');
      return;
    }

    const loading = ElLoading.service({
      lock: true,
      text: '上传中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });

    try {
      if (!props.isManyFiles) {
        const innerFileList: UploadFileItem[] = [];
        for (const file of finalFileList.value) {
          if (!file?.raw) continue;

          const formData = new FormData();
          formData.append(props.uploadFile, file.raw);

          // 添加额外参数
          Object.entries(props.uploadExitData).forEach(([key, value]) => {
            formData.append(key, value);
          });

          let resp: any;
          if (props.uploadFn) {
            resp = await props.uploadFn(formData);
          } else {
            resp = await UploadFileService.uploadApi(formData);
          }

          if (resp.code === 200) {
            innerFileList.push({ ...props.params, ...resp.data });
          } else {
            ElMessage.error(resp.msg);
          }
        }
        uploadResultFileList.value = innerFileList;
      } else {
        const formData = new FormData();
        finalFileList.value.forEach((file) => {
          if (file?.raw) {
            formData.append('files', file.raw);
          }
        });

        const { code, result, message } = await UploadFileService.uploadApi(formData);
        if (code === 200) {
          uploadResultFileList.value = result.map((item: any) => ({
            ...item,
            ...props.params,
          }));
        } else {
          ElMessage.error(message);
        }
      }

      emitUpdate();
    } catch (error) {
      console.error('上传失败:', error);
      ElMessage.error('上传失败');
    } finally {
      loading.close();
      uploadRef.value?.clearFiles();
    }
  };

  // 文件管理
  const removeFile = (index: number): void => {
    finalFileList.value = finalFileList.value.filter((_, i) => i !== index);
  };

  // 更新逻辑
  const emitUpdate = (): void => {
    emit('update:modelValue', uploadResultFileList.value);
    emit('uploadSuccess', uploadResultFileList.value);
  };

  // 其他处理
  const handleExceed = (): void => {
    ElMessage.warning(`最多可上传 ${props.limit} 个文件`);
  };

  // 暴露方法
  defineExpose<CustomUploadExpose>({
    uploadFileHandler,
  });
</script>

<style scoped lang="scss">
  .upload-file {
    width: 100%;
    display: inline-block;
    margin-top: 2px;
  }

  .text-danger {
    color: #f56c6c;
  }

  .upload-file-list {
    padding: 0;
    margin: 0;
    list-style: none;

    .file-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      transition: all 0.3s;

      .file-link {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .file-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
  }
</style>

