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
        <div class="conatiner">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AppHeader from './header/Index.vue';
import Sidebar from './sidebar/Index.vue';
import { mapState } from 'vuex';
export default {
  components: {
    AppHeader,
    Sidebar,
  },
  computed: {
    ...mapState({
      sidebarOpened: state => state.view.sidebarOpened,
    })
  }
}
</script>

<style lang="scss">
.content {
  position: fixed;
  left: 0;
  top: 50px;
  right: 0;
  bottom: -30px;
  .view {
    width: auto;
    height: inherit;
    padding: 1rem;
    position: absolute;
    left: 240px;
    right: 0;
    top: 0;
    bottom: 30px;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;
    overflow-y: auto;
    .conatiner {
      background: #fff;
      width: inherit;
      min-height: calc(100% - 35px);
      padding: 1rem;
    }
  }
}
.sidebar-close {
  .view {
    left: 64px;
  }
}
</style>