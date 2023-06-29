<template>
  <el-input
    style="width: 100%; height: 32.5px"
    :value="value"
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
      default: '请输入',
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
  const isBlur = ref(false);
  const emit = defineEmits('update:modelValue', 'change', 'blur', 'focus');
  //number限制长度和位数
  const inputHandler = (value) => {
    // 去除非数字输入
    if (!/^-?\d+([\.]\d+)?$/gi.test(value)) {
      if (!value.endsWith('.')) {
        const val1 = value.split('');
        val1.pop();
        value = val1.join('');
      }
    }
    if (props.min < 0) {
      lowerZero(value);
    } else {
      value = value.toString();
      if (value[0] == '0' && value[1] == '0') {
        value = '0';
      }
      if (value[0] == '0' && value[1] != '.' && value.length > 1) {
        value = value.replace(/\b(0+)/gi, '');
      }
      overZero(value);
    }
  };
  // 原有正数判断逻辑
  const overZero = (value) => {
    if (props.precision == 0) {
      value = value.toString().replace(/[^\d]+/g, '');
    } else {
      value = value.toString().replace(/[^\d.]/g, ''); //清除"数字"和"."以外的字符
      value = value.toString().replace(/^\./g, ''); //验证第一个字符是数字
      value = value.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
      value = value.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      if (props.precision == 1) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
      }
      if (props.precision == 2) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
      }
      if (props.precision == 3) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
      }
      if (props.precision == 4) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
      }
      if (props.precision == 5) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
      }
      if (props.precision == 6) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
      }
      if (this.precision == 10) {
        value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入十位小数
      }
    }
    if (Number(value) > Number(props.max)) {
      value = value.substring(0, value.length - 1); //输入超过最大值后，后面输入无效
    }
    if (props.min == 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (value && Number(value) < Number(props.min)) {
        value = props.min;
      }
    }
    emit('update:modelValue', value);
  };
  // 新增负值判断
  const lowerZero = (value) => {
    value = value.toString().replace(/\.{2,}/g, '.'); //只保留第一个, 清除多余的
    value = value.toString().replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    if (props.precision == 1) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3'); //只能输入一位小数
    }
    if (props.precision == 2) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两位小数
    }
    if (props.precision == 3) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
    }
    if (props.precision == 4) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入四位小数
    }
    if (props.precision == 5) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入五位小数
    }
    if (props.precision == 6) {
      value = value.toString().replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3'); //只能输入六位小数
    }
    if (Number(value) > Number(props.max)) {
      value = value.substring(0, value.length - 1); //输入超过最大值后，后面输入无效
    }
    if (props.min == 0) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      if (value && Number(value) < Number(props.min)) {
        value = props.min;
      }
    }
    emit('update:modelValue', value);
  };
  // 输入框值改变值失去焦点函数
  const inputChangeHandler = (value) => {
    if (props.min != 0 && (value || value == '') && Number(value) < Number(props.min)) {
      //如果input时判断 例如min=9 max=10时 输入1就自动转成9  所以放到change时判断
      value = props.min;
      emit('update:modelValue', value);
    }
    emit('change', value);
  };
  // 输入框值改变值失去焦点函数
  const inputBlurHandler = (value) => {
    isBlur.value = true;
    emit('blur', value);
  };
  // 输入框获取焦点
  const inputFocusHandler = (value) => {
    isBlur.value = false;
    emit('focus', value);
  };
</script>
