<template>
  <div class="app-wrapper">
    <!-- 侧边 -->
    <div class="sidebar-container">
      <sidebar />
    </div>
    <!-- 右边内容区域 -->
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting" />
        <div class="tags-view">tagsview</div>
      </div>
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="key" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup() {
    const route = useRoute();
    const key = computed(() => route.path);
    const showSettings = ref(false);
    const openSetting = () => {
      showSettings.value = true;
    };
    return {
      key,
      openSetting,
    };
  },
  components: {
    Sidebar: defineAsyncComponent(() => import('./sidebar/Index.vue')),
    Navbar: defineAsyncComponent(() => import('./navbar/Index.vue')),
  },
});
</script>
<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      background: cyan;
      .navbar {
        height: 50px;
        background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      .app-main {
        /* navbar 50px  */
        min-height: calc(100vh - 50px);
      }

      .fade-transform-enter-active,
      .fade-transform-leave-active {
        transition: all 0.5s;
      }

      .fade-transform-enter-from {
        opacity: 0;
        transform: translateX(-30px);
      }

      .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }
    }
  }
}
</style>
