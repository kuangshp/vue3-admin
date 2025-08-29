<template>
  <div>
    <el-input
      v-model="iconName"
      style="margin-bottom: 10px"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input="filterIcons"
    >
      <template #suffix>
        <el-icon style="height: 32px; width: 16px"><search /></el-icon>
      </template>
    </el-input>
    <el-scrollbar :max-height="200">
      <div class="container">
        <div
          v-for="(item, index) in iconList"
          class="item"
          :key="index"
          @click="selectedIcon(item)"
        >
          <div :class="[{ active: props.activeIcon === item }]">
            <SvgIcon :icon="item"></SvgIcon>
            <span class="icon">{{ item }}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue';
  import icons from './requireIcons';
  import SvgIcon from '@/components/SvgIcon';
  import { Search } from '@element-plus/icons-vue';

  // 定义props接口
  interface ChooseIconProps {
    activeIcon?: string;
    [key: string]: any;
  }

  // 定义emits类型
  const emit = defineEmits<{
    selected: [iconName: string];
  }>();

  // 定义props
  const props = withDefaults(defineProps<ChooseIconProps>(), {
    activeIcon: '',
  });

  const iconName = ref<string>('');
  const iconList = ref<string[]>(icons);

  /**
   * 根据输入过滤图标列表
   */
  const filterIcons = (): void => {
    iconList.value = icons;
    if (iconName.value) {
      iconList.value = icons.filter((item) => item.indexOf(iconName.value) !== -1);
    }
  };

  /**
   * 选择图标
   * @param name 图标名称
   */
  const selectedIcon = (name: string): void => {
    emit('selected', name);
    document.body.click();
  };

  /**
   * 重置搜索状态
   */
  const reset = (): void => {
    iconName.value = '';
    iconList.value = icons;
  };

  // 暴露方法
  defineExpose({
    reset,
  });
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .item {
    width: 33%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    .active {
      color: #409eff;
    }
  }
  .text {
    font-size: 14px;
  }
  .icon {
    flex: 1;
    margin-left: 10px;
  }
</style>

