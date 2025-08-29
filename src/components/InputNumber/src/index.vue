<template>
  <el-input
    style="width: 100%; height: 32.5px"
    v-model="inputNewValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    @input="inputHandler"
    @change="inputChangeHandler"
    @blur="inputBlurHandler"
    @focus="inputFocusHandler"
    :maxlength="maxlength || 32"
  >
    <template v-if="append != ''" #append>{{ append }}</template>
  </el-input>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';

  // 定义props接口
  interface InputNumberProps {
    modelValue: string | number;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    append?: string;
    max?: string | number;
    min?: string | number;
    precision?: number;
    clearable?: boolean;
    maxlength?: string;
    isFormatNumber?: boolean;
  }

  // 定义emits类型
  const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    change: [value: string | number];
    blur: [event: Event];
    focus: [event: Event];
  }>();

  // 定义props
  const props = withDefaults(defineProps<InputNumberProps>(), {
    modelValue: '',
    placeholder: '请输入数字',
    disabled: false,
    readonly: false,
    append: '',
    max: '1.7976931348623157e+308',
    min: '-9007199254740991',
    precision: 2,
    clearable: true,
    maxlength: '32',
    isFormatNumber: true,
  });

  const inputNewValue = ref<string | number>(props.modelValue);
  const isBlur = ref<boolean>(false);

  // 监听外部modelValue变化
  watch(
    () => props.modelValue,
    (newValue) => {
      inputNewValue.value = newValue;
    }
  );

  //number限制长度和位数
  const inputHandler = (value: string): void => {
    let newValue: string = value;
    // 去除非数字输入
    if (!/^-?\d+([\.]\d+)?$/gi.test(value)) {
      if (!value.endsWith('.')) {
        const val1 = value.split('');
        val1.pop();
        newValue = val1.join('');
        inputNewValue.value = newValue;
      }
    }
    if (Number(props.min) < 0) {
      lowerZero(newValue);
    } else {
      newValue = newValue.toString();
      if (value[0] == '0' && newValue[1] == '0') {
        newValue = '0';
      }
      if (newValue[0] == '0' && newValue[1] != '.' && newValue.length > 1) {
        newValue = newValue.replace(/\b(0+)/gi, '');
      }
      overZero(newValue);
    }
  };

  // 原有正数判断逻辑
  const overZero = (newValue: string): void => {
    if (props.precision === 0) {
      newValue = newValue.toString().replace(/[^\d]+/g, '');
    } else {
      newValue = newValue.toString().replace(/[^\d.]/g, ''); //清除"数字"和"."以外的字符
      newValue = newValue.toString().replace(/^\./g, ''); //验证第一个字符是数字
      newValue = newValue.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
      newValue = newValue.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

      switch (props.precision) {
        case 1:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
          break;
        case 2:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
          break;
        case 3:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入三位小数
          break;
        case 4:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
          break;
        case 5:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
          break;
        case 6:
          newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
          break;
        case 10:
          newValue = newValue
            .toString()
            .replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入十位小数
          break;
      }
    }

    if (Number(newValue) > Number(props.max)) {
      newValue = newValue.substring(0, newValue.length - 1); //输入超过最大值后，后面输入无效
    }

    if (props.min === 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (newValue && Number(newValue) < Number(props.min)) {
        newValue = String(props.min);
      }
    }

    inputNewValue.value = newValue;
    emit('update:modelValue', newValue);
  };

  // 新增负值判断
  const lowerZero = (newValue: string): void => {
    newValue = newValue.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
    newValue = newValue.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

    switch (props.precision) {
      case 1:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
        break;
      case 2:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
        break;
      case 3:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入三位小数
        break;
      case 4:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
        break;
      case 5:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
        break;
      case 6:
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
        break;
    }

    if (Number(newValue) > Number(props.max)) {
      newValue = newValue.substring(0, newValue.length - 1); //输入超过最大值后，后面输入无效
    }

    if (props.min === 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (newValue && Number(newValue) < Number(props.min)) {
        newValue = String(props.min);
      }
    }

    inputNewValue.value = newValue;
    emit('update:modelValue', newValue);
  };

  // 输入框值改变值失去焦点函数
  const inputChangeHandler = (newValue: string | number): void => {
    if (props.min !== 0 && (newValue || newValue === '') && Number(newValue) < Number(props.min)) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      const minValue = props.min;
      inputNewValue.value = minValue;
      emit('update:modelValue', minValue);
    }
    emit('change', newValue);
  };

  // 输入框值改变值失去焦点函数
  const inputBlurHandler = (event: Event): void => {
    isBlur.value = true;
    emit('blur', event);
  };

  // 输入框获取焦点
  const inputFocusHandler = (event: Event): void => {
    isBlur.value = false;
    emit('focus', event);
  };
</script>

