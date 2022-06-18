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
</template>

<script setup>
const handleSetTheme = () => {
  console.log('点了');
};
</script>

<style lang="scss" scoped></style>
