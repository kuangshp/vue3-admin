<template>
  <div class="sidebar">
    <router-link to="/home">
      <div class="logo-container">
        <el-avatar shape="square" :size="logoHeight"></el-avatar>
        <h1 class="logo-title" v-if="props.sidebarOpened">{{ title }}</h1>
      </div>
    </router-link>
    <!-- 加上有滚动条 -->
    <el-scrollbar>
      <!-- 菜单开始 -->
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#fff"
        :collapse="!props.sidebarOpened"
        :collapse-transition="true"
        :unique-opened="true"
        router
      >
        <SideBarItem
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></SideBarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import SideBarItem from './SideBarItem.vue';
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
    return route.path;
  });

  // 导入路由表
  import { routes } from '@/router';
  // 渲染路由
  const menuRoutes = computed(() => routes);
  console.log(menuRoutes, '路由');
</script>

<style lang="scss" scoped>
  .sidebar-container-menu {
    width: 211px;
  }
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-title {
      margin-left: 10px;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
</style>
