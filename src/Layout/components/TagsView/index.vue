<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper" style="width: unset; flex: none">
      <TagViewItem :tag="tagsViewStore.visitedViews[0]"></TagViewItem>
    </div>
    <el-scrollbar style="height: revert; margin-right: 20px">
      <el-row type="flex" class="tags-view-wrapper" style="flex-wrap: nowrap">
        <!-- 一个个tag view就是router-link -->
        <template v-for="(tag, index) in tagsViewStore.visitedViews.slice(1)" :key="index">
          <TagViewItem :tag="tag"></TagViewItem>
        </template>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { useTagsViewStore } from '@/stores/tagsView';
  import TagViewItem from './TagViewItem.vue';
  const tagsViewStore = useTagsViewStore();
  const route = useRoute();

  // 添加到状态机种
  const addTags = () => {
    const { name } = route;
    if (name) {
      tagsViewStore.addView(route);
    }
  };

  // 监听路由添加到tagsView中
  watch(
    () => route.path,
    () => {
      addTags();
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .tags-view-container {
    width: 100%;
    height: 34px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .tags-view-wrapper {
      width: 100%;
    }
  }
</style>
