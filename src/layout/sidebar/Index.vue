<template>
  <div>
    <h5 @click="isCollapse = !isCollapse">展收测试</h5>
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
      <sidebar-item />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue';
export default defineComponent({
  name: 'Sidebar',
  setup() {
    const isCollapse = ref(true);
    return {
      isCollapse,
    };
  },
  components: {
    SidebarItem: defineAsyncComponent(() => import('./components/SidebarItem.vue')),
  },
});
</script>

<style></style>
