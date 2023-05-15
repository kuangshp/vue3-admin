<template>
  <div class="framement">
    <div v-show="!$route.meta.withoutLayout">
      <header>
        <app-header></app-header>
      </header>
      <section
        class="content"
        :class="{'sidebar-close': !sidebarOpened}"
      >
        <div class="menus">
          <Sidebar></Sidebar>
        </div>
        <div class="view">
          <!-- 处理里面的路由视图 -->
          <div class="conatiner">
            <keep-alive>
              <router-view v-show="$route.name" />
            </keep-alive>
          </div>
        </div>
      </section>
    </div>
    <!-- 专门处理不在主页后的路由视图 -->
    <router-view v-show="$route.meta.withoutLayout" />
  </div>
</template>

<script>

import AppHeader from '@/layout/header/Index.vue';
import Sidebar from '@/layout/sidebar/Index.vue';
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