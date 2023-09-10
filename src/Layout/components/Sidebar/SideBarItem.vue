<template>
  <!-- 有子路由的时候 -->
  <el-sub-menu
    v-if="route.children?.length && !route.meta?.hidden"
    :index="route.path ? route.path : ''"
    :style="{ width: !props.sidebarOpened ? '210px' : '64px' }"
  >
    <template #title>
      <el-icon v-if="route.meta?.icon">
        <SvgIcon :icon="route.meta.icon"> </SvgIcon>
      </el-icon>
      <span class="submenu-title">{{ route.meta?.title }}</span>
    </template>
    <!-- 递归循环 -->
    <SideBarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
      :basePath="item.path"
    ></SideBarItem>
  </el-sub-menu>
  <!-- 没有子路由的时候 -->
  <template v-else>
    <template v-if="!route.meta?.hidden">
      <el-menu-item
        :index="route.path ? route.path : ''"
        :style="{
          width: !props.sidebarOpened ? '210px' : '64px',
          display: 'block',
          background: '#304156',
        }"
        @click="clickLinkHandler(route)"
      >
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :icon="route.meta?.icon"></SvgIcon>
        </el-icon>
        <template #title>
          <span>{{ route.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
  import { isExternal } from '@/utils';
  import { ElMessage } from 'element-plus';
  const props = defineProps({
    route: {
      type: Object,
      default: () => {},
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
    // 修改宽度传递当前是否展开或者折叠
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  });
  // 点击跳转外部链接(可能是单点登录进入到另外一个系统)
  const clickLinkHandler = (route) => {
    if (!route.path) {
      if (isExternal(route.meta.linkUrl)) {
        window.open(route.meta.linkUrl, '_blank');
      } else {
        ElMessage.warning(`${route.meta.linkUrl}不是合法的url地址`);
      }
    }
  };
</script>

<style lang="scss" scoped></style>
