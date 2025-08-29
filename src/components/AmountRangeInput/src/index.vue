<template>
  <el-row style="width: 100%">
    <el-col :span="11">
      <el-input
        v-model="localMin"
        v-number-only="'number'"
        :placeholder="placeholder"
        clearable
        @blur="checkAmountHandler"
        v-bind="inputAttrs"
      />
    </el-col>
    <el-col :span="2" style="text-align: center">-</el-col>
    <el-col :span="11">
      <el-input
        v-model="localMax"
        v-number-only="'number'"
        :placeholder="placeholder"
        clearable
        @blur="checkAmountHandler"
        v-bind="inputAttrs"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import { ref, watch, computed, useAttrs } from 'vue';
  import { ElMessage } from 'element-plus';

  // 定义props接口
  interface AmountRangeInputProps {
    label?: string;
    placeholder?: string;
    min?: string | number;
    max?: string | number;
    [key: string]: any;
  }

  // 定义emits类型
  const emit = defineEmits<{
    'update:min': [value: string | number];
    'update:max': [value: string | number];
  }>();

  // 定义props
  const props = withDefaults(defineProps<AmountRangeInputProps>(), {
    label: '发票金额',
    placeholder: '请输入金额',
    min: '',
    max: '',
  });

  const attrs = useAttrs();

  const localMin = ref<string | number>(props.min || '');
  const localMax = ref<string | number>(props.max || '');

  // 监听外部props变化
  watch(
    () => props.min,
    (val) => {
      localMin.value = val;
    }
  );

  watch(
    () => props.max,
    (val) => {
      localMax.value = val;
    }
  );

  // 双向绑定
  watch(localMin, (val) => {
    emit('update:min', val);
  });

  watch(localMax, (val) => {
    emit('update:max', val);
  });

  // 透传非 props 的属性到 el-input
  const inputAttrs = computed(() => {
    const { min, max, label, ...rest } = attrs;
    return rest;
  });

  /**
   * 金额检查函数，确保最小值不大于最大值
   */
  const checkAmountHandler = (): void => {
    const minVal = Number(localMin.value);
    const maxVal = Number(localMax.value);
    if (
      localMin.value !== '' &&
      localMax.value !== '' &&
      !isNaN(minVal) &&
      !isNaN(maxVal) &&
      minVal > maxVal
    ) {
      localMin.value = '';
      localMax.value = '';
      ElMessage.warning('最小金额不能大于最大金额');
    }
  };
</script>

