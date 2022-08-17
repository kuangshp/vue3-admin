<template>
  <el-dialog title="颜色选择" :model-value="modelValue" @close="closed" width="22%">
    <!-- 内容区 -->
    <div class="center">
      <p class="title">请选择颜色</p>
      <el-color-picker v-model="mColor" :predefine="predefineColors"></el-color-picker>
    </div>
    <!--footer  -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="comfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import { useStore } from 'vuex';
  // import { generateNewStyle, writeNewStyle } from '@/utils';

  defineProps({
    // 控制弹出层的展示
    modelValue: {
      type: Boolean,
      required: true,
    },
  });

  const emits = defineEmits(['update:modelValue']);
  // 预定义色值
  const predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ];
  const store = useStore();
  // 默认色值
  const mColor = ref(store.getters.mainColor);
  /**
   * 关闭
   */
  const closed = () => {
    emits('update:modelValue', false);
  };
  /**
   * 确定
   * 1. 修改主题色
   * 2. 保存最新的主题色
   * 3. 关闭 dialog
   */
  const comfirm = async () => {
    // 1.1 获取主题色
    // const newStyleText = await generateNewStyle(mColor.value);
    // // 1.2 写入最新主题色
    // writeNewStyle(newStyleText);
    // 2. 保存最新的主题色
    store.commit('theme/setMainColor', mColor.value);
    // 3. 关闭 dialog
    closed();
  };
</script>

<style lang="scss" scoped>
  .center {
    text-align: center;
    .title {
      margin-bottom: 12px;
    }
  }
</style>
