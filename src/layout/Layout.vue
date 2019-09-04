<template>
  <div class="framement">
    <div class="header">
      <app-header></app-header>
    </div>
    <div
      class="content"
      :class="{'sidebar-close': !sidebarOpened}"
    >
      <div class="sidebar">
        <sidebar></sidebar>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { IViewState } from '@/store/view';

import AppHeader from './header';
import Breadcrumb from './breadcrumb';
import Sidebar from './sidebar';

@Component({
  components: {
    AppHeader,
    Breadcrumb,
    Sidebar,
  },
})
export default class Layout extends Vue {
  @Getter('viewStore/sidebarOpened') private sidebarOpened!: IViewState;
}
</script>

<style lang="less">
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
    width: 240px;
    height: inherit;
    background: #fff;
    padding: 1rem 0;
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
    background: #e5e5e5;
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