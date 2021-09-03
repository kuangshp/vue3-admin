<template>
  <div>
    <h5 @click="isCollapse = !isCollapse">展收测试</h5>
    <el-menu
      class="sidebar-container-menu"
      mode="vertical"
      router
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
import { defineComponent, ref, defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
// 导入scss变量在组件中使用
import variables from '@/assets/styles/variables.scss';
import { routes } from '@/router';
export default defineComponent({
  name: 'Sidebar',
  setup() {
    const isCollapse = ref(true);
    const route = useRoute();
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
