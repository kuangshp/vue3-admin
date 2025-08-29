<template>
  <div class="upload-file">
    <!-- 上传控件 -->
    <el-upload
      ref="fileUpload"
      :multiple="multiple"
      :action="uploadFileUrl"
      :accept="acceptStr"
      :data="{ type: type }"
      :file-list="fileList"
      :headers="headers"
      :limit="limit"
      :show-file-list="false"
      class="upload-file-uploader"
      :before-upload="validateFile"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
    >
      <el-button type="primary" :link="isLink">{{ title }}</el-button>
    </el-upload>

    <!-- 提示信息 -->
    <div v-if="showTips" class="el-upload__tip">
      请上传
      <template v-if="props.fileSize">
        大小不超过 <b class="text-danger">{{ props.fileSize }}MB</b>
      </template>
      <template v-if="fileTypesStr">
        格式为 <b class="text-danger">{{ fileTypesStr }}</b>
      </template>
      的文件
    </div>

    <!-- 文件列表 -->
    <ul v-if="hasFiles" class="upload-file-list">
      <!-- 排序标题 -->
      <li v-if="showSort" class="list-header">
        <span>文件名称</span>
        <span class="sort-header">排序</span>
      </li>

      <!-- 文件项 -->
      <transition-group v-if="viewUploadFile" name="file-list">
        <li v-for="(file, index) in sortedFiles" :key="file.uid" class="file-item">
          <el-link :href="file.url" underline="hover" target="_blank" class="file-link">
            <el-icon><document /></el-icon>
            {{ file.displayName }}
          </el-link>

          <div class="file-actions">
            <el-input-number
              v-if="showSort"
              v-model="file.custOrd"
              :min="1"
              :max="fileList.length"
              controls-position="right"
              class="sort-input"
            />
            <el-link type="danger" underline="hover" @click="removeFile(index)"> 删除 </el-link>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed, watch, defineEmits } from 'vue';
  import { Document } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  import { useAppStore } from '@/stores/app';

  const props = defineProps({
    // 数据双向绑定
    modelValue: {
      type: [Array, String],
      default: () => [],
    },
    type: {
      type: Number,
      default: 1,
      validator: (v) => [1, 2, 3].includes(v),
    },
    // 限制文件数量
    limit: {
      type: Number,
      default: 5000,
      validator: (v) => v > 0,
    },
    // 限制上传文件大小，单位为MB
    fileSize: {
      type: Number,
      default: 5,
      validator: (v) => v > 0,
    },
    // 允许文件上传类型
    fileType: {
      type: Array,
      default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    isShowSortInput: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '选取文件',
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    // 是否支持多个上传
    multiple: {
      type: Boolean,
      default: false,
    },
    // 预览上传文件
    viewUploadFile: {
      type: Boolean,
      default: false,
    }
  });

  const emit = defineEmits(['update:modelValue', 'uploadSuccess']);

  // 响应式数据
  const appStore = useAppStore();
  const token = appStore.globalToken;
  const baseUrl = import.meta.env.VITE_BASE_API;
  const uploadFileUrl = computed(() => `${baseUrl}/file/upLoad`);
  const headers = computed(() => ({ satoken: token}));

  // 文件列表处理
  const initialFileList = computed(() => {
    if (!props.modelValue) return [];
    const list = Array.isArray(props.modelValue)
      ? props.modelValue
      : String(props.modelValue).split(',');
    return list.map((item, index) => normalizeFileItem(item, index));
  });

  const fileList = ref([]);
  watch(initialFileList, (newVal) => (fileList.value = newVal), { immediate: true });

  // 计算属性
  const showTips = computed(() => props.isShowTip && (props.fileSize || props.fileType.length));
  const acceptStr = computed(() => props.fileType.map((ext) => `.${ext}`).join(','));
  const fileTypesStr = computed(() => props.fileType.join('/'));
  const hasFiles = computed(() => fileList.value.length > 0);
  const showSort = computed(() => props.isShowSortInput && hasFiles.value);
  const sortedFiles = computed(() => [...fileList.value].sort((a, b) => a.custOrd - b.custOrd));

  // 文件处理方法
  const normalizeFileItem = (item, index) => {
    const isString = typeof item === 'string';
    return {
      uid: isString ? `file-${Date.now()}-${index}` : item.uid,
      name: isString ? item : item.name,
      url: isString ? item : item.url,
      nameBack: item.nameBack || '',
      custOrd: index + 1,
    };
  };


  // 上传处理
  const validateFile = (file) => {
    const { name, size } = file;
    const ext = name.split('.').pop().toLowerCase();

    // 验证文件类型
    if (props.fileType.length && !props.fileType.includes(ext)) {
      ElMessage.error(`仅支持 ${fileTypesStr.value} 格式文件`);
      return false;
    }

    // 验证文件大小
    if (size > props.fileSize * 1024 * 1024) {
      ElMessage.error(`文件大小不能超过 ${props.fileSize}MB`);
      return false;
    }

    return true;
  };

  const handleUploadSuccess = (res, file) => {
    if (res.code === 200) {
      const newFile = {
        uid: file.uid,
        name: res.data.url,
        url: res.data.urlOss,
        nameBack: res.data.urlBack,
        custOrd: fileList.value.length + 1,
      };
      fileList.value = [...fileList.value, newFile];
      emitUpdate();
    } else {
      ElMessage.error(res.msg);
      fileList.value = fileList.value.filter((f) => f.uid !== file.uid);
    }
  };

  // 文件管理
  const removeFile = (index) => {
    fileList.value = fileList.value.filter((_, i) => i !== index);
    emitUpdate();
  };

  // 更新逻辑
  const emitUpdate = () => {
    emit(
      'update:modelValue',
      fileList.value.map((file) => ({
        name: file.name,
        nameBack: file.nameBack,
        url: file.url,
        custOrd: file.custOrd,
      }))
    );
    emit(
      'uploadSuccess',
      fileList.value.map((file) => ({
        name: file.name,
        nameBack: file.nameBack,
        url: file.url,
        custOrd: file.custOrd,
      }))
    );
  };

  // 其他处理
  const handleExceed = () => {
    ElMessage.warning(`最多可上传 ${props.limit} 个文件`);
  };

  const handleUploadError = () => {
    ElMessage.error('文件上传失败，请重试');
  };
</script>

<style scoped lang="scss">
  .upload-file {
    // width: 100%;
    display: inline-block;
  }

  .text-danger {
    color: #f56c6c;
  }

  .upload-file-list {
    padding: 0;
    margin: 0;
    list-style: none;

    .list-header {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-weight: 500;

      .sort-header {
        margin-right: 40px;
      }
    }

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

        .sort-input {
          width: 100px;
        }
      }
    }
  }

  .file-list-enter-active,
  .file-list-leave-active {
    transition: all 0.3s ease;
  }
  .file-list-enter-from,
  .file-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
