<template>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" v-bind="$attrs">
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';

  const emits = defineEmits(['update:visible']);
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });
  const dialogVisible = ref(props.visible);
  watch(
    () => props.visible,
    (value) => {
      dialogVisible.value = value;
    }
  );
  watch(
    () => dialogVisible.value,
    (value) => {
      emits('update:visible', value);
    }
  );
</script>

<style lang="scss" scoped></style>
