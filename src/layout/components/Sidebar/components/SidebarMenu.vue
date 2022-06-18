<template>
  <el-menu :uniqueOpened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <!-- 有子集的菜单 -->
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-submenu>
    <!-- 没有子集的菜单 -->
    <el-menu-item index="2">
      <i class="el-icon-location"></i>
      <template #title>导航二</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup></script>

<style lang="scss" scoped></style>
