<template>
  <div :class="{ 'sirui-search': isQueryPanel, 'edit-form': !isQueryPanel }" ref="sub">
    <el-form
      label-position="right"
      :rules="computedRules"
      :label-width="labelWidth"
      :model="formData"
      ref="customFormRef"
      :validate-on-rule-change="false"
      :disabled="isDisabledForm"
    >
      <!-- 字段 -->
      <el-row :gutter="10">
        <el-col
          v-for="(column, i) in isCollapse ? filterColumns.slice(0, 4) : filterColumns"
          :key="i"
          class="search-item"
          :span="column.span || colSpan"
        >
          <!-- 单独一个时间 -->
          <FormWrapper
            v-if="column.type == 'date'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="formData[column.prop]"
              :ref="column.prop"
              :disabled="column.disabled || isDisabledForm"
              type="date"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              :value-format="column.format ? column.format : 'YYYY-MM-DD'"
              :picker-options="pickerStartOptions"
              :disabled-date="(event) => disabledDate(event, column)"
              @focus="() => handleFocusDate('start', column)"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>
          <!--开始时间-->
          <FormWrapper
            v-if="['startDateRangePicker'].includes(column.type)"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              style="width: 100%"
              v-model="formData[column.prop]"
              :ref="column.prop"
              :disabled="column.disabled || isDisabledForm"
              type="date"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              value-format="YYYY-MM-DD"
              :disabled-date="disabledDateRangePick"
              @focus="() => handleFocusDate('start', column)"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>
          <!--结束时间-->
          <FormWrapper
            v-if="['endDateRangePicker'].includes(column.type)"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              style="width: 100%"
              :ref="column.prop"
              v-model="formData[column.prop]"
              type="date"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              value-format="YYYY-MM-DD"
              :disabled="column.disabled || isDisabledForm"
              @focus="() => handleFocusDate('end', column)"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>
          <!--开始时间-时分秒-->
          <FormWrapper
            v-if="column.type == 'startDateRangePickerTime'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              style="width: 100%"
              :ref="column.prop"
              v-model="formData[column.prop]"
              :disabled="column.disabled || isDisabledForm"
              type="datetime"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              value-format="YYYY-MM-DD HH:mm:ss"
              @focus="() => handleFocusDate('start', column)"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>

          <!--结束时间-时分秒-->
          <FormWrapper
            v-if="column.type == 'endDateRangePickerTime'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              :ref="column.prop"
              v-model="formData[column.prop]"
              type="datetime"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              value-format="YYYY-MM-DD HH:mm:ss"
              :picker-options="pickerEndOptions"
              :disabled="column.disabled || isDisabledForm"
              @focus="() => handleFocusDate('end', column)"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>

          <!-- 时间范围 -->
          <FormWrapper
            v-if="column.type == 'dateRange'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              clearable
              style="width: 100%"
              :ref="column.prop"
              v-model="formData[column.prop]"
              :disabled="column.disabled || isDisabledForm"
              type="daterange"
              value-format="YYYY-MM-DD"
              :range-separator="column.separator ?? '-'"
              :start-placeholder="column.startPlaceholder ?? '开始时间'"
              :end-placeholder="column.endPlaceholder ?? '结束时间'"
              @change="(val) => handleChange(val, column)"
            ></el-date-picker>
          </FormWrapper>
          <!-- 时间面板带快捷方式 -->
          <FormWrapper
            v-if="column.type == 'dateRangePanel'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-date-picker
              v-model="formData[column.prop]"
              :clearable="column.clearable"
              style="width: 100%"
              type="daterange"
              align="right"
              value-format="YYYY-MM-DD"
              unlink-panels
              :range-separator="column.separator ?? '-'"
              :start-placeholder="column.startPlaceholder ?? '开始时间'"
              :end-placeholder="column.endPlaceholder ?? '结束时间'"
              :shortcuts="column.pickerOptions ? column.pickerOptions : pickerOptionsPanel"
              @change="(val) => handleChange(val, column)"
            >
            </el-date-picker>
          </FormWrapper>
          <!--文案-->
          <FormWrapper
            v-if="column.type == 'text'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
            style="height: 32.5px"
          >
            <span class="line-text">{{ formData[column.prop] }}</span>
          </FormWrapper>
          <!-- 输入框 -->
          <FormWrapper
            v-if="column.type == 'input' || !column.type"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-input
              style="width: 100%"
              :ref="column.prop"
              :maxlength="column.maxlength || 32"
              v-model[column.modifier||string]="formData[column.prop]"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              clearable
              :disabled="column.disabled || isDisabledForm"
              @change="(val) => handleChange(val, column)"
              @input="(val) => handleChange(val, column)"
            >
              <template #prepend v-if="column.prepend">{{ column.prepend }}</template>
              <template #append v-if="column.append">{{ column.append }}</template>
            </el-input>
          </FormWrapper>

          <!-- 文本域 -->
          <FormWrapper
            v-if="column.type == 'textarea'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :maxlength="column.maxlength || 32"
              :ref="column.prop"
              v-model="formData[column.prop]"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              clearable
              @change="(val) => handleChange(val, column)"
              @input="(val) => handleChange(val, column)"
              :disabled="column.disabled || isDisabledForm"
            />
          </FormWrapper>
          <!-- 下拉选择框 -->
          <FormWrapper
            v-if="column.type == 'select'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <el-select
              style="width: 100%"
              :ref="column.prop"
              v-model="formData[column.prop]"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              @change="(val) => handleChange(val, column)"
              @clear="(val) => clearMethod(val, column)"
              filterable
              :disabled="column.disabled || isDisabledForm"
              :multiple="column.multiple || false"
              :clearable="column.clearable || true"
            >
              <el-option
                v-for="item in column.options ?? []"
                :key="item.value ?? item['value']"
                :label="item.label ?? item['label']"
                :value="item.value ?? item['value']"
              ></el-option>
            </el-select>
          </FormWrapper>
          <!-- 复选框带文案的 -->
          <template v-else-if="column.type == 'checkbox'">
            <template v-if="column.labelPosition == 'right'">
              <el-form-item label-width="100px" :prop="column.prop">
                <el-checkbox
                  v-model="formData[column.prop]"
                  :true-label="column.trueLabel"
                  :false-label="column.falseLabel"
                  :disabled="column.disabled || isDisabledForm"
                  @change="(val) => handleChange(val, column)"
                  >{{ column.label }}
                </el-checkbox>
              </el-form-item>
            </template>
            <el-form-item v-else :prop="column.prop" :label="column.label">
              <el-checkbox
                :checked="column.isChecked ? column.isChecked : false"
                v-model="formData[column.prop]"
                :true-label="column.trueLabel"
                :false-label="column.falseLabel"
                @change="(val) => handleChange(val, column)"
                :disabled="column.disabled || isDisabledForm"
              ></el-checkbox>
            </el-form-item>
          </template>

          <!-- 单选按钮开始 -->
          <FormWrapper
            v-else-if="column.type === 'radio'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
            :ref="column.prop"
          >
            <el-radio-group
              v-model="formData[column.prop]"
              :readonly="column.readonly"
              :disabled="column.disabled"
              @change="(val) => handleChange(val, column)"
            >
              <el-radio
                v-for="item in column.options || []"
                :key="item.value"
                :label="item.value"
                :value="item.value"
                :name="column.prop"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </FormWrapper>
          <!-- 单选按钮结束 -->
          <!-- 普通数值组件开始 -->
          <FormWrapper
            v-if="column.type == 'number'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
            :ref="column.prop"
          >
            <el-input-number
              v-model="formData[column.prop]"
              :clearable="column?.clearable ?? true"
              :readonly="column?.readonly"
              :disabled="column?.disabled"
              @change="(val) => handleChange(val, column)"
              :min="column.min"
              :max="column.max"
            ></el-input-number>
          </FormWrapper>
          <!-- 普通数值组件开始 -->
          <FormWrapper
            v-if="column.type == 'inputNumber'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
            :ref="column.prop"
          >
            <InputNumber
              v-model="formData[column.prop]"
              :disabled="column.disabled || isDisabledForm"
              :placeholder="column.placeholder || getPlaceHolder(column)"
              :append="column.append"
              @change="(val) => handleChange(val, column)"
            />
          </FormWrapper>
          <!-- 树组件开始 -->
          <FormWrapper
            v-if="column.type == 'treeSelect'"
            v-bind="$attrs"
            v-on="$listeners"
            :formData="formData"
            :column="column"
          >
            <TreeSelect
              v-model="formData[column.prop]"
              :options="column.options"
              :ref="column.prop"
              :isMultiple="column.isMultiple"
              :disabled="column.disabled || isDisabledForm"
              :placeholder="column.placeholder"
              :clearable="column.clearable"
              @change="(val) => handleChange(val, column)"
            ></TreeSelect>
          </FormWrapper>
        </el-col>
      </el-row>
      <!-- 按钮 -->
      <el-row v-show="isShowBtn" type="flex" justify="end">
        <el-col :span="span" style="text-align: end; padding-bottom: 30px">
          <div class="action-btn">
            <el-button type="primary" class="button-80" size="small" @click="onSubmit"
              >查询</el-button
            >
            <el-button size="small" class="button-80" @click="resetForm(customFormRef)"
              >重置</el-button
            >
            <span class="up-down-icon" @click="isCollapse = !isCollapse">
              <el-icon> <ArrowDown v-if="isCollapse" /><ArrowUp v-else /></el-icon>
              {{ expandText }}
            </span>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
  import { computed, onMounted, reactive } from 'vue';
  import FormWrapper from './components/FormWrapper/index.vue';
  import InputNumber from './../InputNumber/index.vue';
  import TreeSelect from './../TreeSelect/index.vue';
  const props = defineProps({
    // 表单字段
    formFieldList: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 是否为搜索面板
    isQueryPanel: {
      type: Boolean,
      default: true,
    },
    // 表单数据
    modelValue: {
      type: Object,
      default: () => {},
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
      default: '120px',
    },
    // label对齐方式
    labelPosition: {
      type: String,
      default: 'right',
    },
    // 占位置几列
    colSpan: {
      type: Number,
      default: 6,
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
    // 是否禁用表单
    isDisabledForm: {
      type: Boolean,
      default: false,
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
    // 是否显示按钮
    isShowBtn: {
      type: Boolean,
      default: false,
    },
    // 是否折叠
    collapse: {
      type: Boolean,
      default: true,
    },
  });
  // 计算表单字段
  let formData = reactive({});
  const initFormDataHandler = () => {
    // 循环表单的字段,然后和modelValue混入
    const resultObj = {};
    for (const item of props.formFieldList) {
      if (item.isHidden) {
        continue;
      } else {
        resultObj[item.prop] = null;
      }
    }
    console.log('计算属性', props.modelValue);
    formData = toRef({ ...resultObj, ...props.modelValue });
  };
  // 当前是否折叠在一起
  const isCollapse = ref(props.collapse);
  const expandText = computed(() => (isCollapse.value ? '展开' : '收起'));
  // 过滤新的字段展示在页面上
  const filterColumns = computed(() => {
    let list = [];
    for (const item of props.formFieldList) {
      if (item.isHidden) {
        continue;
      } else {
        list.push(item);
      }
    }
    return list;
  });
  const getPlaceHolder = (option) => {
    // 已禁用的选项不展示 placeholder
    if (option.disabled) {
      return '';
    }
    const inputArr = ['input', 'textarea', 'inputNumber'];
    return (
      (inputArr.indexOf(option.type) > -1 ? '请输入' : '请选择') +
      (option.label === '至' ? '日期' : option.label || '')
    );
  };
  // 表格规则
  const computedRules = computed(() => {
    // 循环当前column中是否有必填字段
    let resultObj = {};
    for (const item of props.formFieldList) {
      resultObj[item.prop] = [
        {
          required: item.required ? true : false,
          message: `${item.label}必填`,
          trigger: ['change', 'blur'],
        },
      ];
    }
    // 将传递进来的替换字段
    for (const key in props.rules) {
      resultObj[key] = props.rules[key];
    }
    return resultObj;
  });
  // 资金预报表根据选择的年月限制选择的日期范围
  let pickerTimeOptions = reactive({});
  let pickerStartOptions = reactive({});
  let pickerEndOptions = reactive({});
  // 带面板的时间控制
  const pickerOptionsPanel = reactive([
    {
      text: '最近一周',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
    },
    {
      text: '最近一个月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: '最近三个月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
    {
      text: '最近六个月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
        return [start, end];
      },
    },
    {
      text: '最近一年',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
        return [start, end];
      },
    },
  ]);
  const disabledDate = (time, column) => {
    console.log(time, column);
    const { type, prop } = column;
    if (type == 'date') {
      const { disabledBefore, disabledAfter } = column;
      if (disabledBefore) {
        return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
      } else if (disabledAfter) {
        return time.getTime() > Date.now();
      }
    } else if (['startDateRangePicker', 'endDateRangePicker'].includes(type)) {
      // const currentIndex = props.formFieldList.findIndex((item) => item.prop == prop);
      // const dateProp =
      //   type == 'startDateRangePicker'
      //     ? props.formFieldList[currentIndex + 1].prop
      //     : props.formFieldList[currentIndex - 1].prop;
      // console.log(dateProp, '11??1', type, currentIndex, formData.value);
      // if (type == 'startDateRangePicker') {
      //   return time.getTime() < new Date(formData.value[dateProp]).getTime() - 24 * 60 * 60 * 1000;
      // } else if (type == 'endDateRangePicker') {
      //   console.log(formData.value, '111', formData.value[dateProp]);
      //   return time.getTime() > new Date(formData.value[dateProp]).getTime();
      // }
    }
  };
  const handleFocusDate = (type, column) => {
    const { prop, flag } = column;
    const currentIndex = props.formFieldList.findIndex((item) => item.prop == prop);
    const dateProp =
      type == 'start'
        ? props.formFieldList[currentIndex + 1].prop
        : props.formFieldList[currentIndex - 1].prop;
    const pickerOptions = {
      disabledDate: (time) => {
        return disabledDate(time, dateProp, type, flag);
      },
    };
    if (type == 'start') {
      pickerStartOptions = pickerOptions;
    } else {
      pickerEndOptions = pickerOptions;
    }
  };

  onMounted(() => {
    initFormDataHandler();
  });
  const customFormRef = ref(null);
  const emit = defineEmits([
    'update:modelValue',
    'query',
    'resetForm',
    'filedChange',
    'clearMethod',
  ]);
  // 提交获取数据
  const onSubmit = async (isValid = true) => {
    if (isValid) {
      await customFormRef.value.validate((valid, fields) => {
        if (valid) {
          emit('query', formData.value);
        } else {
          console.log('error submit!', fields);
        }
      });
    } else {
      emit('query', formData.value);
    }
  };
  // 重置字段
  const resetForm = (formEl) => {
    formEl.resetFields();
    initFormDataHandler();
    emit('resetForm');
  };
  // 字段改变的事件
  const handleChange = (val, column) => {
    console.log(formData.value, '表单数据');
    emit('update:modelValue', formData.value);
    emit('filedChange', { val: val, prop: column });
  };
  const clearMethod = (val, column) => {
    if (!column.clearMethod) {
      return;
    }
    emit('clearMethod', { val: val });
  };
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
