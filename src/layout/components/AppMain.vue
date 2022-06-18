<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具备组件缓存 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <div><component :is="Component" :key="route.path" /></div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { isTags } from '@/utils';
import { useRoute } from 'vue-router';
import { generateTitle, watchSwitchLang } from '@/utils/i18n';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();

/**
 * 生成 title
 */
const getTitle = (route) => {
  let title = '';
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/');
    title = pathArr[pathArr.length - 1];
  } else {
    title = generateTitle(route.meta.title);
  }
  return title;
};

/**
 * 监听路由变化
 */
watch(
  route,
  (to) => {
    // 并不是所有的路由都需要保存的
    if (!isTags(to.path)) return;
    console.log(to, '11122');
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

/**
 * 国际化 tags
 */
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
</script>

<style lang="scss" scoped>
.app-main {
  /* 浏览器可视区域的高度 100vh */
  /* min-height: calc(100vh - 50px); */
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /* padding: 61px 20px 20px 20px; */
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
