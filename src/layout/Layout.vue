<template>
  <div class="framement">
    <div class="header">
      <app-header></app-header>
    </div>
    <div
      class="content"
      :class="{'sidebar-close': !sidebarOpened}"
    >
      <!-- 左侧导航 -->
      <sidebar></sidebar>
      <!-- 右侧视图 -->
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import AppHeader from './header/Index.vue';
import Sidebar from './sidebar/Index.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    AppHeader,
    Sidebar,
  },
  methods: {
    ...mapActions(['sidebarOpened'])
  }
}
</script>

<style lang="scss">
.content {
  position: fixed;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  > * {
    transition: all 1s;
  }
  .sidebar {
    width: 230px;
    height: inherit;
    background: #fff;
    box-shadow: 0 0 1.2em rgba(0, 0, 0, 0.12);
    margin-right: 10px;
    overflow-y: auto;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 50px;
    right: 0;
    transform: translateX(0);
  }
  .view {
    margin-left: 240px;
    background: #f0f0f0;
    height: 100%;
    padding: 2rem;
  }
}
.sidebar-close {
  > * {
    transition: all 1s;
  }
  .sidebar {
    transform: translateX(-100%);
  }
  .view {
    margin-left: 0;
  }
}
</style>