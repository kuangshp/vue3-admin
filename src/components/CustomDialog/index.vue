<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :draggable="draggable"
    append-to-body
  >
    <div class="dialog-content">
      <slot></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHandler" size="small">{{ cancelBtnText }}</el-button>
        <el-button type="primary" @click="confirmHandler" size="small">{{
          confirmBtnText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits, defineExpose } from 'vue';

  const dialogVisible = ref(false);
  defineProps({
    // 标题
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '50%',
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    cancelBtnText: {
      type: String,
      default: '取消',
    },
    confirmBtnText: {
      type: String,
      default: '确定',
    },
  });

  const openDialog = () => {
    dialogVisible.value = true;
  };
  // 对外事件
  const emit = defineEmits(['cancel', 'confirm']);
  const cancelHandler = () => {
    dialogVisible.value = false;
    emit('cancel');
  };
  const confirmHandler = () => {
    dialogVisible.value = false;
    emit('confirm');
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
    cancelHandler,
    confirmHandler,
  });
</script>

<style scoped lang="scss"></style>
