<template>
  <div class="framement">
    <div class="header">
      <app-header></app-header>
    </div>
    <div class="content">
      <div
        class="sidebar"
        :class="{'sidebar-close': sidebarOpened}"
      >
        <app-sidebar></app-sidebar>
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

@Component({
  components: {},
})
export default class Framement extends Vue {
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
  display: flex;
  flex-direction: row;
  .sidebar {
    width: 240px;
    height: inherit;
    background: #fff;
    padding: 1rem 0;
    box-shadow: 0 0 1.2em rgba(0, 0, 0, 0.12);
    margin-right: 10px;
    overflow-y: auto;
    transition: width 1s;
  }
  .sidebar-close {
    width: 0;
    transition: width 1s;
    margin-right: 0;
  }
  .view {
    flex: 1;
    background: #e5e5e5;
    height: inherit;
    padding: 2rem;
  }
}
</style>