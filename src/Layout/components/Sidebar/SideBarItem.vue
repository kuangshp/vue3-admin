<template>
  <div v-if="!route.meta?.hideInMenu">
    <!-- 没有子路由的时候,或者只有一个的时候 -->
    <template
      v-if="
        hasOneShowingChild(route.children, route) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !route.alwaysShow
      "
    >
      <el-menu-item :index="`${onlyOneChild.path}`" @click="meanItemClickHandler(route)">
        <el-icon v-if="onlyOneChild.meta?.icon">
          <SvgIcon :icon="onlyOneChild.meta?.icon"></SvgIcon>
        </el-icon>
        <template #title>
          <span>{{ onlyOneChild.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由的时候 -->
    <el-sub-menu
      v-else
      :index="route.path ? route.path : ''"
      :style="{ width: !props.sidebarOpened ? '200px' : '64px' }"
    >
      <template #title>
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :icon="route.meta.icon"> </SvgIcon>
        </el-icon>
        <span class="submenu-title">{{ route.meta?.title }}</span>
      </template>
      <!-- 递归循环 -->
      <SideBarItem v-for="item in route.children" :key="item.path" :route="item"></SideBarItem>
    </el-sub-menu>
  </div>
</template>

<script setup>
  import { isExternal } from '@/utils';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const props = defineProps({
    route: {
      type: Object,
      default: () => {},
      required: true,
    },
    // 修改宽度传递当前是否展开或者折叠
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  });
  // 点击跳转外部链接(可能是单点登录进入到另外一个系统)
  const meanItemClickHandler = (routeItem) => {
    if (routeItem.name) {
      if (isExternal(routeItem.name)) {
        window.open(routeItem.name, '_blank');
      } else {
        // 路由跳转
        router.push({
          name: routeItem.name,
        });
      }
    } else {
      ElMessage.error('路由name不能为空');
    }
  };

  const onlyOneChild = ref(null);
  // 判断是否只有一个字节点
  const hasOneShowingChild = (children = [], parent) => {
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false;
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item;
        return true;
      }
    });

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, noShowingChildren: true };
      return true;
    }
    return false;
  };
</script>

<style lang="scss" scoped></style>

