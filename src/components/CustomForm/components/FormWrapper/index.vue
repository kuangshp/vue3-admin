<template>
  <el-form-item :label="column.label" :prop="column?.prop">
    <el-row :gutter="0" v-if="column.icon">
      <el-col :span="20">
        <slot></slot>
      </el-col>
      <el-col :span="4">
        <i
          :class="column.icon"
          v-bind="$attrs"
          style="margin-left: 10px; width: 20px; height: 20px; background: #f00; cursor: pointer"
          @click="() => iconHandler(column.iconMethod, formData, column)"
        >
        </i>
      </el-col>
    </el-row>
    <template v-else>
      <slot></slot>
    </template>
  </el-form-item>
</template>

<script setup>
  const props = defineProps({
    formData: {
      type: Object,
      default: () => {},
    },
    column: {
      type: Object,
      default: () => {},
    },
  });
  const emit = defineEmits(['iconMethod']);
  // 图标事件
  const iconHandler = (method, formData, column) => {
    console.log(column, method.name);
    if (method && typeof method == 'string') {
      emit(method, props.formData[props.column?.prop], props.column?.prop);
    }
  };
  const getSlotValue = () => {
    const defaultSlot = this.$slots.default;
    let label = null;
    if (defaultSlot && defaultSlot.length) {
      label = defaultSlot[0].componentInstance.selected ?? { currentLabel: '' };
    } else if (defaultSlot && !defaultSlot.length) {
      label = defaultSlot.componentInstance.selected ?? { currentLabel: '' };
    }
    if (!label) return '';
    return Array.isArray(label) ? label.map((v) => v.currentLabel).join(',') : label.currentLabel;
  };
</script>

<style lang="scss" scoped></style>
