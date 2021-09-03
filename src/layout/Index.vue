<template>
  <div class="app-wrapper">
    <!-- 侧边 -->
    <div class="sidebar-container">sidebar</div>
    <!-- 右边内容区域 -->
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar--{{ name }}</div>
        <div class="tags-view">tagsview</div>
      </div>
      <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from './sidebar/Index.vue';
import { ref } from 'vue';
@Options({
  components: {
    Sidebar,
  },
})
export default class Home extends Vue {
  setup() {
    const name = ref('hello');
    return {
      name,
    };
  }
}
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
      min-height: calc(100vh - 84px);
      background: red;
    }
  }
}
</style>
