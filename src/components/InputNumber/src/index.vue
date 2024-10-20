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
<script setup>
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入数字',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    append: {
      type: String,
      default: () => '',
    },
    max: {
      type: [String, Number],
      default: '1.7976931348623157e+308',
    },
    min: {
      type: [String, Number],
      default: '-9007199254740991',
    },
    precision: {
      type: Number,
      default: 2,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: String,
      default: '32',
    },
    isFormatNumber: {
      type: Boolean,
      default: true,
    },
  });
  const inputNewValue = ref(props.modelValue);
  const isBlur = ref(false);
  const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus']);
  //number限制长度和位数
  const inputHandler = (value) => {
    let newValue = value;
    // 去除非数字输入
    if (!/^-?\d+([\.]\d+)?$/gi.test(value)) {
      if (!value.endsWith('.')) {
        const val1 = value.split('');
        val1.pop();
        newValue = val1.join('');
        inputNewValue.value = newValue;
      }
    }
    if (props.min < 0) {
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
  const overZero = (newValue) => {
    if (props.precision == 0) {
      newValue = newValue.toString().replace(/[^\d]+/g, '');
    } else {
      newValue = newValue.toString().replace(/[^\d.]/g, ''); //清除"数字"和"."以外的字符
      newValue = newValue.toString().replace(/^\./g, ''); //验证第一个字符是数字
      newValue = newValue.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
      newValue = newValue.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      if (props.precision == 1) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
      }
      if (props.precision == 2) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
      }
      if (props.precision == 3) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
      }
      if (props.precision == 4) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
      }
      if (props.precision == 5) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
      }
      if (props.precision == 6) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
      }
      if (this.precision == 10) {
        newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入十位小数
      }
    }
    if (Number(newValue) > Number(props.max)) {
      newValue = newValue.substring(0, newValue.length - 1); //输入超过最大值后，后面输入无效
    }
    if (props.min == 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (newValue && Number(newValue) < Number(props.min)) {
        newValue = props.min;
      }
    }
    inputNewValue.value = newValue;
    emit('update:modelValue', newValue);
  };
  // 新增负值判断
  const lowerZero = (newValue) => {
    newValue = newValue.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
    newValue = newValue.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    if (props.precision == 1) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
    }
    if (props.precision == 2) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
    }
    if (props.precision == 3) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
    }
    if (props.precision == 4) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
    }
    if (props.precision == 5) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
    }
    if (props.precision == 6) {
      newValue = newValue.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
    }
    if (Number(newValue) > Number(props.max)) {
      newValue = newValue.substring(0, newValue.length - 1); //输入超过最大值后，后面输入无效
    }
    if (props.min == 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (newValue && Number(newValue) < Number(props.min)) {
        newValue = props.min;
      }
    }
    inputNewValue.value = newValue;
    emit('update:modelValue', newValue);
  };
  // 输入框值改变值失去焦点函数
  const inputChangeHandler = (newValue) => {
    if (props.min != 0 && (newValue || newValue == '') && Number(newValue) < Number(props.min)) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      newValue = props.min;
      emit('update:modelValue', newValue);
    }
    emit('change', newValue);
  };
  // 输入框值改变值失去焦点函数
  const inputBlurHandler = (newValue) => {
    isBlur.value = true;
    emit('blur', newValue);
  };
  // 输入框获取焦点
  const inputFocusHandler = (newValue) => {
    isBlur.value = false;
    emit('focus', newValue);
  };
</script>
