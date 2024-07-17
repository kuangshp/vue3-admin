<template>
  <el-form
    ref="formRef"
    v-if="model"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    label-width="100px"
    v-bind="$attrs"
    class="customer-form"
  >
    <el-row :gutter="10" :style="cssStyle">
      <template v-for="(item, index) in formOptions" :key="index">
        <el-col :span="item.span || colSpan">
          <!-- 普通不是下拉框、复选框组 -->
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-if="item.children && item.children.length"
          >
            <component
              :placeholder="item.placeholder ?? `请选择${item.label}`"
              clearable
              v-bind="item.attrs"
              :is="`el-${item.type}`"
              v-model="model[item.prop]"
              style="width: 100%"
            >
              <component
                v-for="(child, i) in item.children"
                :key="i"
                :is="`el-${child.type}`"
                :label="child.label"
                :value="child.value"
              ></component>
            </component>
          </el-form-item>
          <!-- 普通不是下拉框、复选框组 -->
          <el-form-item :label="item.label" :prop="item.prop" v-else>
            <component
              :is="`el-${item.type}`"
              :placeholder="item.placeholder ?? `请输入${item.label}`"
              :data="item?.data"
              v-bind="item.attrs"
              v-model="model[item.prop]"
              autocomplete="new-password"
              style="width: 100%"
              clearable
            ></component>
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
              v-model.number="model[item.prop]"
              v-bind="item.attrs"
            ></InputNumber>
            <!-- 富文本编辑器 -->
            <div id="editor" v-if="item.type === 'editor'"></div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <div style="display: flex; justify-content: flex-end">
      <!-- 如果传递了插槽就走插槽数据 -->
      <template v-if="slots.action">
        <slot name="action" :form="formRef" :model="model"></slot>
      </template>
      <template v-else>
        <el-button
          type="primary"
          v-if="showQueryBtn"
          style="margin-right: 10px"
          class="button-80"
          @click="queryHandler"
          >{{ queryBtnText }}</el-button
        >
        <el-button type="primary" class="button-80" v-if="showResetBtn" @click="resetFields"
          >重置</el-button
        >
      </template>
    </div>
  </el-form>
</template>

<script setup>
  import {
    ref,
    defineProps,
    onMounted,
    watch,
    defineEmits,
    useSlots,
    computed,
    nextTick,
  } from 'vue';
  import { ElMessage } from 'element-plus';
  import cloneDeep from 'lodash/cloneDeep';
  import E from 'wangeditor';
  const emits = defineEmits([
    'on-preview',
    'on-remove',
    'on-success',
    'on-error',
    'on-progress',
    'on-change',
    'before-upload',
    'before-remove',
    'on-exceed',
    'queryHandler',
  ]);

  const props = defineProps({
    // 表单数据
    formData: {
      type: Object,
      default: () => {},
    },
    // 表单配置项
    options: {
      type: Array,
      // type只能是:
      //   'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'color-picker' |
      // 'date-picker' | 'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' |
      // 'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' |
      // 'transfer' | 'upload'
      default: () => [],
    },
    // 用户自定义上传方法
    httpRequest: {
      type: Function,
    },
    // 默认一个占几列,一起是24
    colSpan: {
      type: Number,
      default: 6,
    },
    // 搜索按钮文案
    queryBtnText: {
      type: String,
      default: '搜索',
    },
    // 是否显示搜索按钮
    showQueryBtn: {
      type: Boolean,
      default: true,
    },
    // 是否显示重置按钮
    showResetBtn: {
      type: Boolean,
      default: true,
    },
    // 是否滚动的时候,是的时候去除水平滚动条
    isScrollbar: {
      type: Boolean,
      default: false,
    },
  });
  // 获取插槽内容
  const slots = useSlots();
  const formRef = ref(null);
  const cssStyle = computed(() => {
    if (props.isScrollbar) {
      return {
        'margin-left': 0,
        'margin-right': 0,
      };
    }
  });
  // 表单数据
  const model = ref(null);
  // 表单数据规则
  const rules = ref(null);
  const formOptions = ref([]);
  // 富文本
  const edit = ref();
  const initForm = (isReset) => {
    if (props.options && props.options.length) {
      let m = {};
      let r = {};
      let o = [];
      if (isReset) {
        m = cloneDeep(model.value);
      }
      for (const option of props.options) {
        // 隐藏字段
        if (option.isHidden && option.isHidden.value) {
          // 隐藏的字段值要清空
          m[option.prop] = null;
          continue;
        }
        // 处理富文本编辑器
        if (option.type === 'editor') {
          nextTick(() => {
            if (document.getElementById('editor')) {
              const editor = new E('#editor');
              editor.config.placeholder = option.placeholder ?? '请输入内容';
              editor.create();
              // 初始化富文本的内容
              editor.txt.html(props.formData[option.prop]);
              editor.config.onchange = (newHtml) => {
                model.value[option.prop] = newHtml;
              };
              edit.value = editor;
            }
          });
        }
        // 处理表单反填数据(避免重置的时候清空数据)
        if (!isReset) {
          if (props?.formData && Object.keys(props?.formData).length) {
            m[option.prop] = props.formData[option.prop] || null;
          } else {
            m[option.prop] = null;
          }
        }
        // 判断如果写了required的时候直接手动添加一个规则
        if (option.required) {
          r[option.prop] = [
            {
              required: true,
              message: `${option.label}不能为空`,
              trigger: ['blur', 'change'],
            },
            ...(option.rules && Array.isArray(option.rules) ? option.rules : []),
          ];
        } else {
          r[option.prop] = option.rules;
        }
        o.push(option);
      }
      formOptions.value = cloneDeep(o);
      model.value = cloneDeep(m);
      rules.value = cloneDeep(r);
    }
  };
  onMounted(() => {
    initForm();
  });
  // 监听字段的变动
  watch(
    () => props.options,
    () => {
      initForm(true);
    },
    { deep: true }
  );

  // 重置表单
  const resetFields = () => {
    // 重置element-plus的表单
    formRef.value.resetFields();
    // 获取到富文本的配置项
    if (props.options && props.options.length) {
      const prop = props.options.find((item) => item.type === 'editor')?.prop;
      if (prop) {
        const editorValue = props.formData[prop];
        edit.value.txt.html(editorValue);
      }
    }
    emits('queryHandler', model.value);
  };
  // 表单验证方法
  const validate = (fn) => {
    formRef.value.validate(fn);
  };
  // 获取表单数据
  const getFormData = (isValid = true) => {
    if (isValid) {
      return new Promise((resolve, reject) => {
        formRef.value.validate((valid) => {
          if (valid) {
            resolve(model.value);
          } else {
            ElMessage.error('表单填写有误,请检查');
            reject('表单填写有误,请检查');
          }
        });
      });
    } else {
      return model.value;
    }
  };
  // 点击搜索
  const queryHandler = () => {
    emits('queryHandler', model.value);
  };
  // 分发方法
  defineExpose({
    resetFields,
    validate,
    getFormData,
  });

  // 上传组件的所有方法
  const onPreview = (file) => {
    emits('on-preview', file);
  };
  const onRemove = (file, fileList) => {
    emits('on-remove', { file, fileList });
  };
  const onSuccess = (response, file, fileList) => {
    // 上传图片成功 给表单上传项赋值
    let uploadItem = props.options.find((item) => item.type === 'upload');
    model.value[uploadItem.prop] = { response, file, fileList };
    emits('on-success', { response, file, fileList });
  };
  const onError = (err, file, fileList) => {
    emits('on-error', { err, file, fileList });
  };
  const onProgress = (event, file, fileList) => {
    emits('on-progress', { event, file, fileList });
  };
  const onChange = (file, fileList) => {
    emits('on-change', { file, fileList });
  };
  const beforeUpload = (file) => {
    emits('before-upload', file);
  };
  const beforeRemove = (file, fileList) => {
    emits('before-remove', { file, fileList });
  };
  const onExceed = (files, fileList) => {
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
