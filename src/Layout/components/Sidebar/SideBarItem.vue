<template>
  <template v-if="!item.meta || !item.meta.hidden">
    <!-- 如果有一个孩子，或者没孩子，或者有一个孩子但是被hidden了 -->
    <template v-if="!alwaysShowRootMenu && theOnlyOneChildRoute">
      <!-- 如果没有meta属性意味着不必渲染了 -->
      <SideBarItemLink
        :to="resolvePath(theOnlyOneChildRoute.path)"
        v-if="theOnlyOneChildRoute.meta"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <el-icon v-if="icon">
            <SvgIcon :icon="icon"></SvgIcon>
          </el-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta?.title }}</span>
          </template>
        </el-menu-item>
      </SideBarItemLink>
    </template>
    <!-- 多个子路由时 TODO 需要处理-->
    <el-sub-menu v-else :index="item.path" teleported>
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <SvgIcon :icon="item.meta.icon"> </SvgIcon>
        </el-icon>
        <span class="submenu-title">{{ item.meta?.title }}</span>
      </template>
      <!-- 递归渲染 -->
      <el-menu-item-group>
        <SideBarItem
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
        >
        </SideBarItem>
      </el-menu-item-group>
    </el-sub-menu>
  </template>
</template>

<script setup>
  import path from 'path-browserify';
  import SideBarItemLink from './SideBarItemLink.vue';
  import { isExternal } from '@/utils';
  const props = defineProps({
    item: {
      type: Object,
      default: () => {},
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  });

  // 渲染菜单主要先看子路由
  // 比如我们的路由 一级路由一般都是layout组件 二级路由才是我们考虑要渲染成菜单的
  const showingChildNumber = computed(() => {
    // hidden路由排除掉 只算可渲染子路由
    const children = (props.item.children || []).filter((child) => {
      if (child.meta && child.meta.hidden) return false;
      return true;
    });
    return children.length;
  });

  // 要渲染的单个路由 如果该路由只有一个子路由 默认直接渲染这个子路由
  // theOnlyOneChildRoute直接通过el-menu-item组件来渲染
  const { item } = toRefs(props);
  const theOnlyOneChildRoute = computed(() => {
    // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
    if (showingChildNumber.value > 1) {
      return null;
    }
    if (item.value.children) {
      for (const child of item.value.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为rue)
    // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
    return {
      ...props.item,
      path: '', // resolvePath避免resolve拼接时 拼接重复
    };
  });

  // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
  // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
  // menu icon
  const icon = computed(() => {
    // 子路由 如果没有icon就用父路由的
    return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon);
  });
  // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
  // resolvePath在模板中使用
  const resolvePath = (childPath) => {
    if (isExternal(childPath)) {
      return childPath;
    }
    return path.resolve(props.basePath, childPath);
  };
  const alwaysShowRootMenu = computed(() => props.item.meta && props.item.meta.alwaysShow);
</script>

<style lang="scss" scoped></style>
