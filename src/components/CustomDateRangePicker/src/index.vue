<template>
  <el-date-picker
    v-model="localDateList"
    type="daterange"
    :range-separator="separator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    @change="handleChange"
    @clear="handleClear"
  />
</template>

<script setup lang="ts">
  import { computed, defineEmits, defineProps } from 'vue';

  // 定义props接口
  interface CustomDateRangePickerProps {
    modelValueStart?: string | null;
    modelValueEnd?: string | null;
    separator?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    format?: string;
    [key: string]: any;
  }

  // 定义emits类型
  const emit = defineEmits<{
    'update:modelValueStart': [value: string | null];
    'update:modelValueEnd': [value: string | null];
    change: [value: [string, string] | null];
    clear: [];
  }>();

  // 定义props
  const props = withDefaults(defineProps<CustomDateRangePickerProps>(), {
    // 开始时间
    modelValueStart: null,
    // 结束时间
    modelValueEnd: null,
    // 文字
    separator: '至',
    // 开始文字
    startPlaceholder: '开始时间',
    // 结束文字
    endPlaceholder: '结束时间',
    // 默认格式
    format: 'YYYY-MM-DD',
  });

  // 本地日期数据，用于绑定picker
  const localDateList = computed<[string, string] | null>({
    get: (): [string, string] | null => {
      if (props.modelValueStart && props.modelValueEnd) {
        return [props.modelValueStart, props.modelValueEnd];
      }
      return null;
    },
    set: (newVal: [string, string] | null): void => {
      const [start = null, end = null] = newVal || [];
      emit('update:modelValueStart', start);
      emit('update:modelValueEnd', end);
    },
  });

  /**
   * 处理日期变化
   * @param val 日期范围数组或null
   */
  const handleChange = (val: [string, string] | null): void => {
    emit('change', val);
  };

  /**
   * 处理清空
   */
  const handleClear = (): void => {
    emit('clear');
    emit('update:modelValueStart', null);
    emit('update:modelValueEnd', null);
  };
</script>
