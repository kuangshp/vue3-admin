<template>
  <el-form
    ref="formRef"
    v-if="formModel"
    :validate-on-rule-change="false"
    :model="formModel"
    :rules="rules"
    auto-complete="off"
    :label-width="props.labelWidth"
    v-bind="$attrs"
    class="customer-form"
  >
    <div style="display: flex; flex-direction: row">
      <div style="flex: 1">
        <el-row :gutter="10" :style="cssStyle">
          <template v-for="(item, index) in formOptions" :key="index">
            <el-col :span="item.span || props.colSpan">
              <el-form-item :label="item.label" :prop="item.prop">
                <component
                  :is="`el-${item.type}`"
                  :placeholder="
                    item.placeholder ??
                    `请${['input', 'textarea'].includes(item.type) ? '输入' : '选择'}${item.label}`
                  "
                  :data="item?.data"
                  v-bind="item.attrs"
                  v-model="formModel[item.prop]"
                  autocomplete="new-password"
                  style="width: 100%"
                  clearable
                >
                  <template v-if="item.childrenData && item.childrenData.length">
                    <component
                      v-for="(child, i) in item.childrenData"
                      :key="i"
                      :is="child.type ? `el-${child.type}` : 'el-option'"
                      :label="child.label"
                      :value="child.value"
                    ></component>
                  </template>
                  <template v-else-if="item.loading">
                    <el-option disabled value="">加载中...</el-option>
                  </template>
                </component>
                <el-upload
                  v-if="item.type === 'upload'"
                  v-bind="item.uploadAttrs"
                  :on-preview="onPreview"
                  :on-remove="onRemove"
                  :on-success="onSuccess"
                  :on-error="onError"
                  :on-progress="onProgress"
                  :on-change="onChange"
                  :before-upload="beforeUpload"
                  :before-remove="beforeRemove"
                  :http-request="httpRequest"
                  :on-exceed="onExceed"
                >
                  <!-- 上传区域内容,可以是按钮也可以是图标 -->
                  <slot name="uploadArea"></slot>
                  <!-- 上传提示文案 -->
                  <slot name="uploadTip"></slot>
                </el-upload>
                <!-- 数字输入框 -->
                <InputNumber
                  v-if="item.type === 'number'"
                  v-model.number="formModel[item.prop]"
                  v-bind="item.attrs"
                ></InputNumber>
                <!-- 富文本编辑器 -->
                <div :id="`editor-${item.prop}`" v-if="item.type === 'editor'"></div>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </div>
      <!-- 按钮组合 -->
      <template v-if="slots.action">
        <slot name="action" :form="formRef" :model="formModel"></slot>
      </template>
      <template v-else>
        <el-divider style="height: 30px" direction="vertical" />
        <div :style="{ width: '170px', 'text-align': 'right' }">
          <el-space :size="18">
            <el-button type="primary" icon="Search" @click="queryHandler">搜索</el-button>
            <el-button v-if="props.showResetBtn" icon="Refresh" @click="resetFields"
              >重置</el-button
            >
            <template v-if="props.options.length > 24 / (props.colSpan || 6)">
              <template v-if="!isLoadMore">
                <el-tooltip class="box-item" effect="dark" content="展开更多" placement="top">
                  <el-icon @click="isLoadMore = !isLoadMore" style="cursor: pointer"
                    ><ArrowDown
                  /></el-icon>
                </el-tooltip>
              </template>
              <template v-else>
                <el-tooltip class="box-item" effect="dark" content="折叠" placement="top">
                  <el-icon @click="isLoadMore = !isLoadMore" style="cursor: pointer"
                    ><ArrowUp
                  /></el-icon>
                </el-tooltip>
              </template>
            </template>
          </el-space>
        </div>
      </template>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed, nextTick } from 'vue';
  import { ElMessage, type FormInstance } from 'element-plus';
  import cloneDeep from 'lodash/cloneDeep';
  import E from 'wangeditor';
  import InputNumber from '@/components/InputNumber';
  import type {
    CustomFormOption,
    CustomFormProps,
    CustomFormEmits,
    CustomFormExpose,
  } from '../types';

  // 定义emits
  const emits = defineEmits<CustomFormEmits>();

  // 定义props
  const props = withDefaults(defineProps<CustomFormProps>(), {
    modelValue: () => ({}),
    options: () => [],
    colSpan: 6,
    labelWidth: 'auto',
    queryBtnText: '搜索',
    showQueryBtn: true,
    showResetBtn: true,
    isScrollbar: false,
  });

  const isLoadMore = ref<boolean>(false);
  // 获取插槽内容
  const slots = useSlots();
  const formRef = ref<FormInstance | null>(null);
  const cssStyle = computed(() => {
    if (props.isScrollbar) {
      return {
        'margin-left': '0',
        'margin-right': '0',
      };
    }
    return {};
  });
  // 表单数据
  const formModel = ref<Record<string, any> | null>(null);
  // 表单数据规则
  const rules = ref<Record<string, any> | null>(null);
  const formOptions = ref<CustomFormOption[]>([]);
  const allFormOptions = ref<CustomFormOption[]>([]);
  // 富文本
  const editorInstances = ref<Record<string, any>>({});

  // 添加 formModel 的深度监听
  watch(
    () => formModel.value,
    (newVal) => {
      if (newVal) {
        emits('update:modelValue', newVal);
      }
    },
    { deep: true }
  );

  const initForm = async (): Promise<void> => {
    if (!props.options?.length) return;

    // 深拷贝原始数据
    const initialModel = cloneDeep(props.modelValue) || {};
    // 处理 options 配置
    const processedOptions = await Promise.all(
      props.options.map(async (item) => {
        const optionItem: CustomFormOption = { ...item };
        // 处理异步 children
        if (optionItem.children) {
          optionItem.childrenData = []; // 实际渲染的子项
          optionItem.loading = false; // 加载状态
          if (typeof optionItem.children === 'function') {
            optionItem.loading = true;
            try {
              const result = await optionItem.children();
              optionItem.childrenData = Array.isArray(result) ? result : result?.data || [];
            } catch (error) {
              console.error(`[CustomForm] 加载选项失败 (${optionItem.prop}):`, error);
              optionItem.childrenData = [];
            } finally {
              optionItem.loading = false;
            }
          } else if (Array.isArray(optionItem.children)) {
            optionItem.childrenData = optionItem.children;
          } else {
            console.warn(`[CustomForm] 无效的 children 类型 (${optionItem.prop})`);
          }
        }

        return optionItem;
      })
    );

    // 初始化 formModel
    const formData = processedOptions.reduce(
      (acc, item) => {
        // 跳过隐藏字段
        if (item.isHidden?.value) {
          acc[item.prop] = null;
          return acc;
        }

        // 初始化字段值（优先使用传入的 modelValue）
        const initialValue = initialModel[item.prop] ?? getDefaultValue(item.type);

        // 处理多选类型默认值
        if (item.type === 'select' && item.attrs?.multiple && !Array.isArray(initialValue)) {
          acc[item.prop] = initialValue ? [initialValue] : [];
        } else {
          acc[item.prop] = initialValue;
        }

        // 初始化富文本编辑器
        if (item.type === 'editor') {
          nextTick(() => initEditor(item, acc[item.prop]));
        }

        return acc;
      },
      {} as Record<string, any>
    );

    // 合并保留外部传入的未定义字段
    formModel.value = { ...initialModel, ...formData };

    // 生成验证规则
    rules.value = processedOptions.reduce(
      (acc, item) => {
        if (item.prop) {
          const itemRules = [];

          // 必填规则
          if (item.required) {
            itemRules.push({
              required: true,
              message: `${item.label}不能为空`,
              trigger: ['blur', 'change'],
            });
          }
          // 自定义规则
          if (item.rules) {
            itemRules.push(...(Array.isArray(item.rules) ? item.rules : [item.rules]));
          }
          acc[item.prop] = itemRules;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    // 临时变量
    allFormOptions.value = processedOptions;
    if (isLoadMore.value) {
      formOptions.value = processedOptions;
    } else {
      formOptions.value = processedOptions.slice(0, 24 / (props.colSpan || 6));
    }
  };

  watch(
    () => isLoadMore.value,
    (val) => {
      if (val) {
        formOptions.value = allFormOptions.value;
      } else {
        formOptions.value = allFormOptions.value.slice(0, 24 / (props.colSpan || 6));
      }
    }
  );

  // 获取不同类型的默认值
  const getDefaultValue = (type: string): any => {
    const defaults: Record<string, any> = {
      select: null,
      'checkbox-group': [],
      'date-picker': '',
      input: '',
      number: null,
      editor: '',
      upload: [],
    };
    return defaults[type] ?? null;
  };

  // 富文本初始化
  const initEditor = (item: CustomFormOption, initialValue: any): void => {
    const editorContainer = document.getElementById(`editor-${item.prop}`);
    if (!editorContainer) return;

    // 销毁旧实例
    if (editorInstances.value[item.prop]) {
      editorInstances.value[item.prop].destroy();
    }

    const editor = new E(editorContainer);
    editor.config.placeholder = item.placeholder || '请输入内容';

    // 自定义配置
    if (item.editorConfig) {
      Object.assign(editor.config, item.editorConfig);
    }

    editor.create();
    editor.txt.html(initialValue || '');

    // 监听内容变化
    editor.config.onchange = (newHtml: string) => {
      if (formModel.value) {
        formModel.value[item.prop] = newHtml;
      }
    };
    editorInstances.value[item.prop] = editor;
  };

  onMounted(() => {
    initForm();
  });

  // 监听字段的变动
  watch(
    () => props.options,
    () => {
      initForm();
    },
    { deep: true }
  );

  // 重置表单
  const resetFields = (): void => {
    // 重置element-plus的表单
    if (formRef.value) {
      formRef.value.resetFields();
    }
    // 获取到富文本的配置项
    if (props.options && props.options.length) {
      const editorItem = props.options.find((item) => item.type === 'editor');
      if (editorItem && editorItem.prop && editorInstances.value[editorItem.prop]) {
        const editorValue = props.modelValue[editorItem.prop];
        editorInstances.value[editorItem.prop].txt.html(editorValue);
      }
    }
    emits('queryHandler', formModel.value || {});
  };

  // 表单验证方法
  const validate = (fn: (valid: boolean) => void): void => {
    if (formRef.value) {
      formRef.value.validate(fn);
    }
  };

  // 获取表单数据
  const getFormData = (
    isValid: boolean = true
  ): Promise<Record<string, any>> | Record<string, any> => {
    if (isValid) {
      return new Promise((resolve, reject) => {
        if (formRef.value) {
          formRef.value.validate((valid) => {
            if (valid && formModel.value) {
              resolve(formModel.value);
            } else {
              ElMessage.error('表单填写有误,请检查');
              reject('表单填写有误,请检查');
            }
          });
        } else {
          reject('表单未初始化');
        }
      });
    } else {
      return formModel.value || {};
    }
  };

  // 点击搜索
  const queryHandler = (): void => {
    emits('queryHandler', formModel.value || {});
  };

  // 分发方法
  defineExpose<CustomFormExpose>({
    resetFields,
    validate,
    getFormData,
  });

  // 上传组件的所有方法
  const onPreview = (file: any): void => {
    emits('on-preview', file);
  };

  const onRemove = (file: any, fileList: any): void => {
    emits('on-remove', { file, fileList });
  };

  const onSuccess = (response: any, file: any, fileList: any): void => {
    // 上传图片成功 给表单上传项赋值
    if (formModel.value) {
      let uploadItem = props.options.find((item) => item.type === 'upload');
      if (uploadItem) {
        formModel.value[uploadItem.prop] = { response, file, fileList };
      }
    }
    emits('on-success', { response, file, fileList });
  };

  const onError = (err: any, file: any, fileList: any): void => {
    emits('on-error', { err, file, fileList });
  };

  const onProgress = (event: any, file: any, fileList: any): void => {
    emits('on-progress', { event, file, fileList });
  };

  const onChange = (file: any, fileList: any): void => {
    emits('on-change', { file, fileList });
  };

  const beforeUpload = (file: any): void => {
    emits('before-upload', file);
  };

  const beforeRemove = (file: any, fileList: any): void => {
    emits('before-remove', { file, fileList });
  };

  const onExceed = (files: any, fileList: any): void => {
    emits('on-exceed', { files, fileList });
  };
</script>

<style lang="scss" scoped>
  .customer-form {
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    :deep(.el-upload) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .button-80 {
    width: 80px;
    border-radius: 18px !important;
    height: 30px;
  }
</style>

