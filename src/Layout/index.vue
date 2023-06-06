<template>
  <div class="app-wrapper" :class="[appStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左边导航 -->
    <Sidebar class="sidebar-container" :sidebarOpened="appStore.sidebarOpened"></Sidebar>
    <!-- 右边内容区域 -->
    <div class="main-container">
      <!-- 头部导航 -->
      <div class="fixed-header">
        <AppHeader />
        <TagsView />
      </div>
      <!-- 内容区域 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
  import AppHeader from './components/AppHeader/index.vue';
  import Sidebar from './components/Sidebar/index.vue';
  import AppMain from './components/AppMain/index.vue';
  import TagsView from './components/TagsView/index.vue';
  import { useAppStore } from '@/stores/app';
  const route = useRoute();
  const appStore = useAppStore();
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }
  .app-main {
    /* 浏览器可视区域的高度 100vh */
    min-height: calc(100vh - 50px - 43px);
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 104px 20px 20px 20px;
    box-sizing: border-box;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 64px);
  }

  .sidebar-container {
    transition: width 0.28s;
    width: 210px !important;
    height: 100%;
    position: fixed;
    background: #304156;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    // 重置 element-plus 的css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }

    &.has-logo {
      .el-scrollbar {
        height: calc(100% - 50px);
      }
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }

    .sub-el-icon {
      margin-right: 12px;
      margin-left: -2px;
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }

    .is-active > .el-submenu__title {
      color: #f4f4f5 !important;
    }

    & .nest-menu .el-submenu > .el-submenu__title,
    & .el-submenu .el-menu-item {
      min-width: 210px !important;
    }
  }

  .hideSidebar {
    .sidebar-container {
      width: 64px !important;
    }

    .main-container {
      margin-left: 64px;
    }

    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;

        .svg-icon {
          margin-left: 20px;
        }

        .sub-el-icon {
          margin-left: 19px;
        }
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0 !important;

        .svg-icon {
          margin-left: 20px;
        }

        .sub-el-icon {
          margin-left: 19px;
        }

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-submenu {
        & > .el-submenu__title {
          & > span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
  }
</style>
