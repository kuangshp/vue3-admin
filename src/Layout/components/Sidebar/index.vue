<template>
  <div class="sidebar">
    <router-link to="/home">
      <div class="logo-container">
        <el-avatar shape="square" :size="logoHeight"></el-avatar>
        <h1 class="logo-title" v-if="props.sidebarOpened">{{ title }}</h1>
      </div>
    </router-link>
    <!-- 加上有滚动条 -->
    <el-scrollbar class="scrollbar-wrapper">
      <!-- 菜单开始 -->
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        background-color="#fff"
        text-color="#4e5969"
        active-text-color="#409eff"
        :collapse="!props.sidebarOpened"
        :collapse-transition="false"
        :unique-opened="true"
      >
        <SideBarItem
          v-for="(route, index) in menuRoutes"
          :key="route.path + index"
          :route="route"
          :basePath="route.path"
        ></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import SideBarItem from './SideBarItem.vue';
  import { useAppStore } from '@/stores/app';
  const appStore = useAppStore();
  const menuRoutes = computed(() => appStore.authMenusList);
  const logoHeight = 44;
  const props = defineProps({
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  });
  const title = ref('OCR图像识别');

  const route = useRoute();
  // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
  const activeMenu = computed(() => {
    return route.path;
  });

  // 导入路由表
  // import { routes } from '@/router';
  // 渲染路由
  // const menuRoutes = computed(() => routes);
</script>

<style lang="scss" scoped>
  :v-deep(.scrollbar-wrapper.el-scrollbar) {
    height: calc(100vh - 70px);
  }
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-title {
      margin-left: 10px;
      color: #4e5969;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
  :deep(.el-menu) {
    border-right: none !important;
  }
  /* 自定义 el-menu 项的鼠标悬停样式 */
  :deep(.el-menu-item:hover) {
    background-color: #f2f3f5; /* 更改悬停时的背景颜色 */
  }
</style>

