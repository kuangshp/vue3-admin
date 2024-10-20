<template>
  <div v-if="!route?.hidden">
    <template
      v-if="
        hasOneShowingChild(route.children, route) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !route.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <el-icon v-if="onlyOneChild.meta?.icon">
            <SvgIcon :icon="onlyOneChild.meta?.icon || (route.meta && route.meta.icon)"></SvgIcon>
          </el-icon>
          <template #title>
            <span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">
              {{ onlyOneChild.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>
    <!-- 有子路由的时候 -->
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(route.path)">
      <template v-if="route.meta" #title>
        <el-icon v-if="route.meta?.icon">
          <SvgIcon :icon="route.meta.icon"> </SvgIcon>
        </el-icon>
        <span class="submenu-title" :title="hasTitle(route.meta.title)">
          {{ route.meta?.title }}
        </span>
      </template>
      <!-- 递归循环 -->
      <SideBarItem
        v-for="item in route.children"
        :key="item.path"
        :route="item"
        :basePath="resolvePath(item.path)"
      ></SideBarItem>
    </el-sub-menu>
  </div>
</template>

<script setup>
  import { isExternal } from '@/utils';
  // import { ElMessage } from 'element-plus';
  import AppLink from './AppLink.vue';
  const props = defineProps({
    route: {
      type: Object,
      default: () => {},
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  });
  // // 点击跳转外部链接(可能是单点登录进入到另外一个系统)
  // const clickLinkHandler = (route) => {
  //   if (!route.path) {
  //     if (isExternal(route.meta.linkUrl)) {
  //       window.open(route.meta.linkUrl, '_blank');
  //     } else {
  //       ElMessage.warning(`${route.meta.linkUrl}不是合法的url地址`);
  //     }
  //   }
  // };
  const resolvePath = (routePath, routeQuery) => {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(props.basePath)) {
      return props.basePath;
    }
    if (routeQuery) {
      let query = JSON.parse(routeQuery);
      return { path: getNormalPath(props.basePath + '/' + routePath), query: query };
    }
    return getNormalPath(props.basePath + '/' + routePath);
  };
  // 返回项目路径
  const getNormalPath = (p) => {
    if (p.length === 0 || !p || p == 'undefined') {
      return p;
    }
    let res = p.replace('//', '/');
    if (res[res.length - 1] === '/') {
      return res.slice(0, res.length - 1);
    }
    return res;
  };

  const onlyOneChild = ref({});

  function hasOneShowingChild(children = [], parent) {
    if (!children) {
      children = [];
    }
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
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
      return true;
    }

    return false;
  }
  function hasTitle(title) {
    if (title.length > 5) {
      return title;
    } else {
      return '';
    }
  }
</script>

<style lang="scss" scoped></style>
