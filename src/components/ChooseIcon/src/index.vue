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
          <div :class="[{ active: activeIcon === item }]">
            <SvgIcon :icon="item"></SvgIcon>
            <span class="icon">{{ item }}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue';
  import icons from './requireIcons';
  const iconName = ref('');
  const iconList = ref(icons);
  const emit = defineEmits(['selected']);
  const props = defineProps({
    activeIcon: {
      type: String,
    },
  });
  const filterIcons = () => {
    iconList.value = icons;
    if (iconName.value) {
      iconList.value = icons.filter((item) => item.indexOf(iconName.value) !== -1);
    }
  };

  const selectedIcon = (name) => {
    emit('selected', name);
    document.body.click();
  };

  const reset = () => {
    iconName.value = '';
    iconList.value = icons;
  };

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
