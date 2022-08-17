<template>
  <!--主题图标v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <!-- 图标 -->
    <svg-icon icon="change-theme" />
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">主题色更换</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <SelectColor v-model="selectColorVisible" />
</template>

<script setup>
  import { ref } from 'vue';
  import SelectColor from './components/SelectColor';
  const selectColorVisible = ref(false);
  const handleSetTheme = () => {
    selectColorVisible.value = true;
  };
</script>

<style lang="scss" scoped></style>
