<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { isTags } from '@/utils';

const route = useRoute();
const store = useStore();
// 获取标题
const getTitle = (to) => {
  let title = '';
  // 如果没配置title的时候
  if (!to.meta) {
    const pathAry = to.path.split('/')[1];
    // 取最后一个
    title = pathAry.pop();
  } else {
    title = to.meta.title;
  }
  return title;
};
// 监听路由的变化
watch(
  route,
  (to) => {
    // 如果不需要缓存的直接跳过
    if (!isTags(to.path)) {
      return;
    }
    // 将要缓存的数据提交到store中
    const { fullPath, meta, name, params, path, query } = to;
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
// 动画
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
</style>
