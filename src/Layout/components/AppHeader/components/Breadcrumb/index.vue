<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  // eslint-disable-next-line
  const linkHoverColor = ref('#304156');

  const route = useRoute();
  // 生成数组数据
  const breadcrumbData = ref([]);
  const getBreadcrumbData = () => {
    breadcrumbData.value = route.matched.filter((item) => item.meta && item.meta.title);
    // console.log(breadcrumbData.value)
  };

  const router = useRouter();
  const onLinkClick = (item) => {
    console.log(item);
    router.push(item.path);
  };

  // 监听路由变化时触发
  watch(
    route,
    () => {
      getBreadcrumbData();
    },
    {
      immediate: true,
    }
  );
</script>

<style lang="scss" scoped>
  .breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .redirect {
      color: #666;
      font-weight: 600;
    }

    .redirect:hover {
      // 将来需要进行主题替换，所以这里不去写死样式
      color: v-bind(linkHoverColor);
    }

    :deep(.no-redirect) {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
