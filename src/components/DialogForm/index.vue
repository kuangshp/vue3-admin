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
      <CustomForm
        ref="customFormRef"
        v-bind="$attrs"
        :col="1"
        :isQueryPanel="false"
        :collapse="false"
        isDialog
      ></CustomForm>
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
  import CustomForm from './../CustomForm';

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
  const dialogVisible = ref(false);

  const openDialog = () => {
    dialogVisible.value = true;
  };

  // 获取表单数据
  const customFormRef = ref(null);
  // 对外事件
  const emit = defineEmits(['cancel', 'confirm']);
  const cancelHandler = () => {
    customFormRef.value.resetForm(); // 重置表单
    dialogVisible.value = false;
    emit('cancel');
  };
  const confirmHandler = async () => {
    await customFormRef.value.customFormRef.validate((valid, fields) => {
      if (valid) {
        console.log(customFormRef.value.formData, '表单数据');
        dialogVisible.value = false;
        emit('confirm');
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style scoped lang="scss"></style>
