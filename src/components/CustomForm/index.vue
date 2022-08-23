<template>
  <el-form
    class="queryForm"
    ref="customFormRef"
    :model="copyFormData"
    :label-position="labelPosition"
    :label-width="labelWidth ? labelWidth : '100px'"
    :class="`form-warp label-width-${
      labelPosition === 'top' ? 0 : labelWidth ? labelWidth : '100px'
    } ${isQueryPanel ? 'is-query' : ''}`"
    :disabled="disabled"
    :size="size"
    :style="formStyle"
    :rules="rules"
  >
    <el-row type="flex" :gutter="20">
      <template v-for="field in isCollapse ? formFields.slice(0, col - 1) : formFields">
        <el-col
          v-if="field"
          :key="field.prop"
          :span="field.span ? field.span : (field.col || 1) * span"
        >
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-if="field.type == 'slot' && !field.hidden"
          >
            <!-- 使用插槽的时候 -->
            <slot :name="field.slotName || field.prop" :formData="copyFormData" :field="field">
            </slot>
          </el-form-item>
          <!-- 单选按钮 -->
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="field.type === 'radio' && !field.hidden"
          >
            <el-radio-group
              v-model="copyFormData[field.prop]"
              :readonly="field.readonly"
              :disabled="field.disabled"
            >
              <el-radio
                v-for="item in field.options || []"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                :name="field.prop"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 复选框 -->
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="field.type === 'checkbox' && !field.hidden"
          >
            <el-checkbox-group
              v-model="copyFormData[field.prop]"
              :readonly="field.readonly"
              :disabled="field.disabled"
            >
              <el-checkbox
                v-for="item in field.options || []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :name="field.prop"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <!-- 数字输入框 -->
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="field.type == 'number' && !field.hidden"
          >
            <el-input-number
              v-model="copyFormData[field.prop]"
              :clearable="field.clearable ?? true"
              :readonly="field.readonly"
              :disabled="field.disabled"
              @change="field.change || function () {}"
              :min="field.min"
              :max="field.max"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="field.type == 'select' && !field.hidden"
          >
            <!-- 下拉框 -->
            <el-select
              :remote-method="field.remote || function () {}"
              v-model="copyFormData[field.prop]"
              :multiple="field.multiple || false"
              :clearable="field.clearable ?? true"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder ?? '请选择' + field.label"
            >
              <el-option
                v-for="item in field.options || []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="field.type == 'switch' && !field.hidden"
          >
            <el-switch
              v-model="copyFormData[field.prop]"
              :active-text="field.activeText"
              :inactive-text="field.inactiveText"
              :readonly="field.readonly"
              :disabled="field.disabled"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="/date/.test(field.type) && !field.hidden"
          >
            <!-- 日期组件 -->
            <el-date-picker
              v-model="copyFormData[field.prop]"
              :align="field.align || 'right'"
              :type="field.type"
              :clearable="field.clearable ?? true"
              :placeholder="field.placeholder ?? '请选择' + field.label"
              :range-separator="field.separator ?? '至'"
              :start-placeholder="field.placeholder1 ?? '开始日期'"
              :end-placeholder="field.placeholder2 ?? '结束日期'"
              :picker-options="field.pickerOptions"
              :readonly="field.readonly"
              :disabled="field.disabled"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="'textarea' == field.type && !field.hidden"
          >
            <!-- 文本域 -->
            <el-input
              v-model="copyFormData[field.prop]"
              type="textarea"
              :clearable="field.clearable ?? true"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder ?? '请输入' + field.label"
              :rows="field.rows || 4"
              :autosize="field.autosize ?? true"
              :show-word-limit="field.limit ?? false"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="field.label"
            :prop="field.prop"
            v-else-if="(!field.type || field.type === 'input') && !field.hidden"
          >
            <!-- 输入框 -->
            <el-input
              v-model="copyFormData[field.prop]"
              :clearable="field.clearable ?? true"
              :readonly="field.readonly"
              :disabled="field.disabled"
              :placeholder="field.placeholder ?? '请输入' + field.label"
            ></el-input>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row v-show="actionable && !isDialog" type="flex" justify="end">
      <el-col :span="span" style="text-align: end; padding-bottom: 30px">
        <div class="action-btn">
          <el-button type="primary" class="button-80" size="small" @click="onSubmit"
            >查询</el-button
          >
          <el-button size="small" class="button-80" @click="resetForm">重置</el-button>
          <el-button
            v-show="collapseAble"
            type="text"
            size="small"
            icon="el-icon-arrow-up"
            @click="isCollapse = !isCollapse"
          >
            <template v-if="isCollapse">展开</template>
            <template v-else>折叠</template>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
  import { defineProps, computed, ref, watch, defineEmits, defineExpose, onMounted } from 'vue';
  import { cloneDeep } from 'lodash';
  const props = defineProps({
    isQueryPanel: {
      type: Boolean,
      default: true,
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
    // 是否为行内元素
    inline: {
      type: Boolean,
      default: true,
    },
    // 表单组件大小
    size: {
      type: String,
      default: 'small',
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '',
    },
    // label对齐方式
    labelPosition: {
      type: String,
      default: 'right',
    },
    // 一行有几列
    col: {
      type: Number,
      default: 4,
    },
    // 是否折叠
    collapse: {
      type: Boolean,
      default: true,
    },
    // 是否显示折叠的按钮
    collapseAble: {
      type: Boolean,
      default: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 组件的字段定义集合
    formFields: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    // 组件绑定的
    formData: {
      type: Object,
      default: () => {},
      required: true,
    },
    // 是否需要按钮组
    actionable: {
      type: Boolean,
      default: true,
    },
    // 表单样式
    formStyle: {
      type: Object,
      default: () => {},
    },
    // 表单规则
    rules: {
      type: Object,
      default: () => {},
    },
  });
  const customFormRef = ref(null);
  // 当前是否折叠在一起
  const isCollapse = ref(props.collapse);

  // 计算列和行数
  const span = computed(() => {
    if (props.col >= 5) {
      return 6;
    } else {
      return Math.floor(24 / props.col);
    }
  });
  // 定义表单数据
  const copyFormData = ref({});
  const computedFormData = () => {
    const resultMap = {};
    for (const item of props.formFields) {
      if (!item.hidden) {
        resultMap[item.prop] = '';
      }
    }
    for (const key in resultMap) {
      resultMap[key] = props.formData[key];
    }
    copyFormData.value = resultMap;
  };
  onMounted(() => {
    computedFormData();
  });

  // 监听表格数据拷贝一份
  const originData = ref({});
  watch(
    props.formData,
    (newVal) => {
      console.log(newVal, '监听');
      if (newVal) {
        originData.value = cloneDeep(newVal);
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  // 表单事件
  const emit = defineEmits(['query', 'resetForm']);
  const onSubmit = async () => {
    await customFormRef.value.validate((valid, fields) => {
      if (valid) {
        emit('query', copyFormData.value);
      } else {
        console.log('error submit!', fields);
      }
    });
  };
  const resetForm = () => {
    console.log('重置表单');
    copyFormData.value = originData.value;
    emit('resetForm', copyFormData);
  };
  defineExpose({
    formData: copyFormData,
    resetForm,
    customFormRef,
  });
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
