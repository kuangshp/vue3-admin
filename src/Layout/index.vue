<template>
  <el-config-provider :locale="zhCn">
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
        <el-scrollbar>
          <AppMain />
        </el-scrollbar>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup>
  import AppHeader from './components/AppHeader/index.vue';
  import Sidebar from './components/Sidebar/index.vue';
  import AppMain from './components/AppMain/index.vue';
  import TagsView from './components/TagsView/index.vue';
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
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
    // min-height: calc(100vh - 50px - 43px);
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 104px 20px 20px 20px;
    box-sizing: border-box;
    background: #f2f3f5;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 200;
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
    background: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    border-right: 1px solid #f2f3f5;
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

    :deep(.el-menu--collapse) {
      .el-sub-menu {
        & > .el-sub-menu__title {
          & > span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
          & > .el-sub-menu__icon-arrow {
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
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: 210px;
    position: relative;
  }
</style>
