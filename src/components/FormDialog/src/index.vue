<template>
  <el-dialog v-if="dialogVisible" v-model="dialogVisible" v-bind="$attrs">
    <template #default>
      <el-scrollbar :max-height="maxHeight">
        <CustomForm
          label-width="80px"
          :formData="formData"
          :options="options"
          ref="formRef"
          isScrollbar
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
          :colSpan="24"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
          <!-- 去除默认按钮 -->
          <template #action></template>
        </CustomForm>
      </el-scrollbar>
    </template>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';

  const emits = defineEmits(['update:visible', 'getFormData']);
  const props = defineProps({
    // 最大高度
    maxHeight: {
      type: Number,
      default: 200,
    },
    // 显示和隐藏
    visible: {
      type: Boolean,
      default: false,
    },
    // 表单字段
    options: {
      type: Array,
      default: () => [],
    },
    // 初始化数据
    formData: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
    },
    beforeUpload: {
      type: Function,
    },
    onPreview: {
      type: Function,
    },
    onRemove: {
      type: Function,
    },
    beforeRemove: {
      type: Function,
    },
    onSuccess: {
      type: Function,
    },
    onExceed: {
      type: Function,
    },
  });
  const dialogVisible = ref(props.visible);
  watch(
    () => props.visible,
    (value) => {
      console.log(value, '111');
      dialogVisible.value = value;
    }
  );
  watch(
    () => dialogVisible.value,
    (value) => {
      console.log('监听到', value);
      emits('update:visible', value);
    }
  );
  // 取消事件
  const formRef = ref(null);
  const cancelHandler = () => {
    emits('update:visible', false);
    formRef.value.resetFields();
  };
  const confirmHandler = async () => {
    const data = await formRef.value.getFormData();
    emits('getFormData', data);
  };
</script>

<style lang="scss" scoped></style>
