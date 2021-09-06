<template>
  <div>
    <div class="logo-container">
      <router-link to="/home">
        <div class="logo-icon" :class="{ 'is-collapse': isCollapse }"></div>
      </router-link>
    </div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <!-- 循环导航菜单 -->
      <menu-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
// 从后端请求回来的菜单接口数据
// import { asyncRoutes } from '@/router';
import { getTreeList } from '@/utils';
import { useStore } from '@/store';
import { menusList } from './menus';
export default defineComponent({
  name: 'SideBar',
  setup() {
    const route = useRoute();
    const store = useStore();
    const isCollapse = computed(() => !store.getters.sidebar.opened);
    const activeMenu = computed(() => {
      const { path } = route;
      return path;
    });
    const menuRoutes = computed(() => {
      return getTreeList(menusList);
    });
    return {
      isCollapse,
      activeMenu,
      menuRoutes,
    };
  },
  components: {
    MenuItem: defineAsyncComponent(() => import('./components/MenuItem.vue')),
  },
});
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  height: 50px;
  .logo-icon {
    width: 90%;
    margin: 0 auto;
    height: 50px;
  }
  .is-collapse {
    height: 50px;
    width: 100%;
  }
}
</style>
