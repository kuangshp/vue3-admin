<template>
  <div class="sidebar">
    <router-link to="/home">
      <div class="logo-container">
        <el-avatar shape="square" :size="logoHeight"></el-avatar>
        <!-- <img src="@/assets/images/logo.png" alt="" style="width: 40px; height: 40px" /> -->
        <h1 class="logo-title" v-if="props.sidebarOpened">{{ title }}</h1>
      </div>
    </router-link>
    <!-- 加上有滚动条 -->
    <el-scrollbar class="scrollbar">
      <!-- 菜单开始 -->
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        background-color="#fff"
        text-color="#304156"
        active-text-color="#409eff"
        :collapse="!props.sidebarOpened"
        :collapse-transition="true"
        :unique-opened="true"
      >
        <SideBarItem
          :sidebarOpened="!props.sidebarOpened"
          v-for="route in menuRoutes"
          :key="route.path"
          :route="route"
        ></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import SideBarItem from './SideBarItem.vue';
  import { routes } from '@/router';
  import { useAppStore } from '@/stores/app';

  const appStore = useAppStore();

  const logoHeight = 44;
  const props = defineProps({
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  });
  const title = ref('admin-web');

  const route = useRoute();
  // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
  const activeMenu = computed(() => {
    return route.name;
  });

  console.log(appStore.serverMenu, '菜单');
  // 根据条件选择渲染路由
  const menuRoutes = computed(() => {
    if (appStore.menuFromServer) {
      return appStore.serverMenu;
    } else {
      return routes;
    }
  });
</script>

<style lang="scss" scoped>
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-title {
      margin-left: 10px;
      color: #304156;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
  .sidebar-container-menu {
    border-right: none !important;
  }
  .scrollbar {
    height: calc(100vh - 80px);
  }
</style>

