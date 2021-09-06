<template>
  <div class="sidebar-item-container">
    <!-- 如果是外部连接和单个路由的时候 -->
    <template v-if="isRenderSingleRoute && theOnlyOneChildRoute">
      <menu-item-link
        v-if="theOnlyOneChildRoute.title"
        :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <i
            class="menu-icon"
            v-if="theOnlyOneChildRoute.icon"
            :class="theOnlyOneChildRoute.icon"
          ></i>
          <el-icon class="menu-icon" v-else>
            <folder-opened />
          </el-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.title }}</span>
          </template>
        </el-menu-item>
      </menu-item-link>
    </template>
    <!-- 递归调用自己渲染路由 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <i class="menu-icon" v-if="item.icon" :class="item.icon"></i>
        <el-icon v-else class="menu-icon">
          <folder-opened />
        </el-icon>
        <span class="submenu-title">{{ item.title }}</span>
      </template>
      <menu-item
        v-for="child in item.children"
        :key="child.id"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </menu-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import path from 'path';
import { FolderOpened } from '@element-plus/icons';
import { isExternal } from '@/utils';

export default defineComponent({
  name: 'MenuItem',
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
    const theOnlyOneChildRoute = computed(() => {
      return {
        ...props.item,
        path: isExternal(props.item.path) ? props.item.path : '', // resolvePath避免resolve拼接时 拼接重复
      };
    });
    // 拼接路径 父路径+子路径（相对路径）
    const resolvePath = (childPath: string) => {
      // 如果是带协议外链 直接返回
      if (isExternal(childPath)) {
        return childPath;
      }
      // 如果不是外链 需要和basePath拼接
      return path.resolve(props.basePath, childPath);
    };
    // 设置 alwaysShow: true，这样它就会忽略上面定义的规则，一直显示根路由 哪怕只有一个子路由也会显示为嵌套的路由菜单
    const alwaysShowRootMenu = computed(() => props.item.meta && props.item.meta.alwaysShow);
    // 是否有可渲染子路由
    const noShowingChildren = computed(() => showingChildNumber.value === 0);

    // 是否只有一条可渲染路由
    const isRenderSingleRoute = computed(
      () =>
        !alwaysShowRootMenu.value &&
        (!theOnlyOneChildRoute.value?.children || noShowingChildren.value)
    );
    return {
      theOnlyOneChildRoute,
      resolvePath,
      isRenderSingleRoute,
    };
  },
  components: {
    FolderOpened,
    MenuItemLink: defineAsyncComponent(() => import('./MenuItemLink.vue')),
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
  .is-active .el-submenu__icon-arrow {
    top: 58%;
    display: none;
  }
  .is-opened .el-submenu__icon-arrow {
    display: inline-block;
  }
}
</style>
