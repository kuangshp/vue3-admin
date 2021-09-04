<template>
  <div>
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
      <sidebar-item
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
import { asyncRoutes } from '@/router';
import { useStore } from '@/store';
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
    const menuRoutes = computed(() => asyncRoutes);
    return {
      isCollapse,
      activeMenu,
      menuRoutes,
    };
  },
  components: {
    SidebarItem: defineAsyncComponent(() => import('./components/SidebarItem.vue')),
  },
});
</script>

<style></style>
