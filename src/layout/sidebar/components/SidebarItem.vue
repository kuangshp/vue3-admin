<template>
  <div class="sidebar-item-container">
    <!-- 一个路由下只有一个子路由的时候 只渲染这个子路由 -->
    <template v-if="theOnlyOneChildRoute && !theOnlyOneChildRoute.children">
      <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
        <el-icon>
          <folder-opened />
        </el-icon>
        <template #title>
          <span>{{ theOnlyOneChildRoute.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 多个子路由时 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon>
          <folder-opened />
        </el-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, toRefs } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import path from 'path';
import { FolderOpened } from '@element-plus/icons';
export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      // 当前路由（此时的父路由）
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      // 父路由路径（子路由路径如果是相对的 要基于父路径）
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { item } = toRefs(props);

    // 渲染菜单主要先看子路由
    // 比如我们的路由 一级路由一般都是layout组件 二级路由才是我们考虑要渲染成菜单的

    // 子路由数量
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
    const theOnlyOneChildRoute = computed(() => {
      // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
      if (showingChildNumber.value > 1) {
        return null;
      }

      // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
      // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
      if (item.value.children) {
        for (const child of item.value.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }

      // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
      // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
      return {
        ...props.item,
        path: '', // resolvePath避免resolve拼接时 拼接重复
      };
    });

    // menu icon
    const icon = computed(() => {
      // 子路由 如果没有icon就用父路由的
      return theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon);
    });

    // 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
    // resolvePath在模板中使用
    const resolvePath = (childPath: string) => {
      return path.resolve(props.basePath, childPath);
    };

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath,
    };
  },
  components: {
    FolderOpened,
  },
});
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    // icon样式调整
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
