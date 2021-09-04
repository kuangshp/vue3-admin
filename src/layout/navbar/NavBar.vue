<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened" />
    <breadcrumb />
    <div class="right-menu">
      <!-- 设置 -->
      <!-- 全屏 -->
      <screenfull id="screefull" class="right-menu-item hover-effect" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from '@/store/index';

export default defineComponent({
  name: 'NavBar',
  components: {
    Breadcrumb: defineAsyncComponent(() => import('./components/Breadcrumb.vue')),
    Hambuger: defineAsyncComponent(() => import('./components/Hambuger.vue')),
    Screenfull: defineAsyncComponent(() => import('./components/Screenfull.vue')),
    // SizeSelect,
    // Avatar,
  },
  emits: ['showSetting'],
  setup(props, { emit }) {
    // 使用我们自定义的useStore 具备类型提示
    // store.state.app.sidebar 对于getters里的属性没有类型提示
    const store = useStore();
    const toggleSidebar = () => {
      store.dispatch('app/toggleSidebar');
    };
    // 从getters中获取sidebar
    const sidebar = computed(() => store.getters.sidebar);

    // 打开设置面板
    const openShowSetting = () => {
      emit('showSetting', true);
    };

    return {
      toggleSidebar,
      sidebar,
      openShowSetting,
    };
  },
});
</script>

<style lang="scss">
.navbar {
  display: flex;
  background: #fff;
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    .setting {
      font-size: 26px;
    }
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
