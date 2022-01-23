<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// 生成数组数据
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
  const breadcrumb = route.matched.filter((item) => item.meta?.title);
  breadcrumbData.value =
    route.fullPath === '/home'
      ? breadcrumb
      : [
          {
            meta: {
              title: '首页',
            },
            path: '/home',
          },
          ...breadcrumb,
        ];
};
// 监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData();
  },
  {
    immediate: true,
    deep: true,
  },
);

// 处理点击事件

const onLinkClick = (item) => {
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    color: #304156;
  }
}
</style>
