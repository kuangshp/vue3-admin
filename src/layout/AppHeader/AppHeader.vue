<template>
  <div class="navbar">
    <!-- 切换按钮 -->
    <hambuger />
    <!-- 面包屑导航 -->
    <breadcrumb />
    <!-- 右边菜单 -->
    <div class="right-menu">
      <!-- 全屏 -->
      <screenfull />
      <!-- 个人中心 -->
      <user-info style="margin-left: 15px" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  components: {
    Breadcrumb: defineAsyncComponent(() => import('./components/Breadcrumb.vue')),
    Hambuger: defineAsyncComponent(() => import('./components/Hambuger.vue')),
    Screenfull: defineAsyncComponent(() => import('./components/Screenfull.vue')),
    UserInfo: defineAsyncComponent(() => import('./components/UserInfo.vue')),
  },
});
</script>

<style lang="scss">
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 50px;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
  }
}
</style>
