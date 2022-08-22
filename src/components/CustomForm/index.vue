<template>
  <el-form
    class="queryForm"
    ref="queryForm"
    :model="formData"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :class="`form-warp label-width-${labelPosition === 'top' ? 0 : labelWidth} ${
      isQueryPanel ? 'is-query' : ''
    }`"
    :disabled="disabled"
    :size="size"
    :style="formStyle"
  >
    <el-row type="flex" :gutter="20">
      <template v-for="field in isCollapse ? formFields.slice(0, col - 1) : formFields">
        <el-col
          v-if="field"
          :key="field.code"
          :span="field.span ? field.span : (field.col || 1) * span"
        >
          <el-form-item :label="field.label" v-if="field.type == 'slot' && !field.hidden">
            <!-- 使用插槽的时候 -->
            <slot :name="field.slotName || field.code" :formData="formData" :field="field"> </slot>
          </el-form-item>
          <el-form-item :label="field.label" v-else-if="field.type == 'number' && !field.hidden">
            <!-- 数字输入框 -->
            <el-input-number
              v-model="formData[field.code]"
              :clearable="field.clearable === undefined ? true : field.clearable"
              :readonly="readonly"
              @change="field.change || function () {}"
              :min="field.min"
              :max="field.max"
            ></el-input-number>
          </el-form-item>
          <el-form-item :label="field.label" v-else-if="field.type == 'select' && !field.hidden">
            <!-- 下拉框 -->
            <el-select
              :remote-method="field.remote || function () {}"
              v-model="formData[field.code]"
              :multiple="field.multiple || false"
              :clearable="field.clearable === undefined ? true : field.clearable"
              :readonly="readonly"
              :placeholder="
                field.placeholder === undefined ? '请选择' + field.label : field.placeholder
              "
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
          <el-form-item :label="field.label" v-else-if="field.type == 'switch' && !field.hidden">
            <el-switch
              v-model="formData[field.code]"
              :active-text="field.activeText"
              :inactive-text="field.inactiveText"
              :readonly="readonly"
            >
            </el-switch>
          </el-form-item>
          <el-form-item :label="field.label" v-else-if="/date/.test(field.type) && !field.hidden">
            <!-- 日期组件 -->
            <el-date-picker
              v-model="formData[field.code]"
              :align="field.align || 'right'"
              :type="field.type"
              :clearable="field.clearable === undefined ? true : field.clearable"
              :placeholder="
                field.placeholder === undefined ? '请选择' + field.label : field.placeholder
              "
              :range-separator="field.separator === undefined ? '至' : field.separator"
              :start-placeholder="
                field.placeholder1 === undefined ? '开始日期' : field.placeholder1
              "
              :end-placeholder="field.placeholder2 === undefined ? '结束日期' : field.placeholder2"
              :picker-options="field.pickerOptions"
              :readonly="readonly"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="field.label" v-else-if="'textarea' == field.type && !field.hidden">
            <!-- 文本域 -->
            <el-input
              v-model="formData[field.code]"
              :clearable="field.clearable === undefined ? true : field.clearable"
              :readonly="readonly"
              :placeholder="
                field.placeholder === undefined ? '请输入' + field.label : field.placeholder
              "
              :rows="field.rows || 2"
              :autosize="field.autosize === undefined ? true : field.autosize"
              :show-word-limit="field.limit === undefined ? false : field.limit"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="field.label"
            v-else-if="(!field.type || field.type === 'input') && !field.hidden"
          >
            <!-- 输入框 -->
            <el-input
              v-model="formData[field.code]"
              :clearable="field.clearable === undefined ? true : field.clearable"
              :readonly="readonly"
              :placeholder="
                field.placeholder === undefined ? '请输入' + field.label : field.placeholder
              "
            ></el-input>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row v-show="actionable && !isDialog" type="flex" justify="end">
      <el-col :span="span" style="text-align: end">
        <el-form-item class="action-btn">
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
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
  import { defineProps, computed, ref, watch, defineEmits, onMounted } from 'vue';
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
    // 是否只读
    readonly: {
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
  });
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

  // 监听表格数据拷贝一份
  const originData = ref({});
  watch(
    props.formData,
    (newVal) => {
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
  const onSubmit = () => {
    emit('query', props.formData);
  };
  const resetForm = () => {
    emit('resetForm', originData);
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
