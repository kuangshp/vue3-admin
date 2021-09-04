<template>
  <div>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      :default-active="activeMenu"
      :background-color="scssVariables.menuBg"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
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
// 导入scss变量在组件中使用
import variables from '@/assets/styles/variables.scss';
import { routes } from '@/router';
import { useStore } from '@/store';
export default defineComponent({
  name: 'SideBar',
  setup() {
    const route = useRoute();
    const store = useStore();
    const isCollapse = computed(() => !store.getters.sidebar.opened);
    const scssVariables = computed(() => variables);
    const activeMenu = computed(() => {
      const { path } = route;
      return path;
    });
    const menuRoutes = computed(() => routes);
    return {
      isCollapse,
      activeMenu,
      scssVariables,
      menuRoutes,
    };
  },
  components: {
    SidebarItem: defineAsyncComponent(() => import('./components/SidebarItem.vue')),
  },
});
</script>

<style></style>
