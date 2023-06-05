<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <!-- 一个个tag view就是router-link -->
      <router-link
        class="tags-view-item"
        :class="{
          active: isActive(tag),
        }"
        v-for="(tag, index) in tagsViewStore.visitedViews"
        :key="index"
        :to="{ path: tag.path, query: tag.query }"
      >
        <el-dropdown trigger="contextmenu" @command="(command) => handleTagCommand(command, tag)">
          <span style="line-height: 26px">{{ tag.meta.title }}</span>
          <!-- affix固定的路由tag是无法删除 -->
          <span
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          ></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他</el-dropdown-item>
              <el-dropdown-item command="self" v-if="!tag.meta || !tag.meta.affix"
                >关闭</el-dropdown-item
              >
              <el-dropdown-item command="refresh">刷新</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-icon class="icon-close" v-if="!isAffix(tag)">
          <CloseBold @click.prevent.stop="closeSelectedTag(tag)" />
        </el-icon>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { useTagsViewStore } from '@/stores/tagsView';
  import { CloseBold } from '@element-plus/icons-vue';

  const tagsViewStore = useTagsViewStore();
  const route = useRoute();
  const router = useRouter();
  // 是否是当前应该激活的tag
  const isActive = (tag) => {
    return tag.path === route.path;
  };

  const isAffix = (tag) => {
    return tag.meta && tag.meta.affix;
  };
  // 添加到状态机种
  const addTags = () => {
    const { name } = route;
    if (name) {
      tagsViewStore.addView(route);
    }
  };
  // 关闭当前右键的tag路由
  const closeSelectedTag = (view) => {
    tagsViewStore.delView(view);
    // 如果移除的view是当前选中状态view, 就让删除后的集合中最后一个tag view为选中态
    if (isActive(view)) {
      toLastView(tagsViewStore.visitedViews, view);
    }
  };

  // 回到最后一个tag的时候
  const toLastView = (visitedViews, view) => {
    // 得到集合中最后一个项tag view 可能没有
    const lastView = visitedViews[visitedViews.length - 1];
    if (lastView) {
      router.push(lastView.path);
    } else {
      // 集合中都没有tag view时
      // 如果刚刚删除的正是home 就重定向回home（首页）
      if (view.name === 'home') {
        router.push({ path: view.path });
      } else {
        // tag都没有了 删除的也不是home 只能跳转首页
        router.push('/');
      }
    }
  };

  // 右键菜单的时候
  const handleTagCommand = (command, view) => {
    switch (command) {
      case 'all': // 右键删除标签导航所有tag 除了affix为true的
        handleCloseAllTag(view);
        break;
      case 'other': // 关闭其他tag 除了affix为true的和当前右键的tag
        handleCloseOtherTag(view);
        break;
      case 'self': // 关闭当前右键的tag affix为true的tag下拉菜单中无此项
        closeSelectedTag(view);
        break;
      case 'refresh': // 刷新当前右键选中tag对应的路由
        refreshSelectedTag(view);
        break;
    }
  };
  // 刷新
  const refreshSelectedTag = async (view) => {
    // 刷新前 将该路由名称从缓存列表中移除
    tagsViewStore.delCachedView(view);
    // router.push(view.path) // 无法刷新页面，因为页面没有任何变化

    router.push('/redirect' + view.path); // 跳转重定向路由
  };
  // 关闭全部的
  const handleCloseAllTag = (view) => {
    // 对于是affix的tag是不会被删除的
    tagsViewStore.delAllView();
    // 关闭所有后 就让切换到剩下affix中最后一个tag
    toLastView(visitedViews.value, view);
  };
  // 关闭其他
  const handleCloseOtherTag = (view) => {
    tagsViewStore.delOthersViews(view);
    if (!isActive(view)) {
      // 删除其他tag后 让该view路由激活
      router.push(view.path);
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
      .tags-view-item {
        display: inline-block;
        // height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        background: #fff;
        color: #495060;
        padding: 0 8px;
        box-sizing: border-box;
        font-size: 12px;
        margin-left: 5px;
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #304156;
          color: #fff;
          border-color: #304156;

          .el-dropdown {
            color: #fff;
          }
          &::before {
            position: relative;
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 5px;
            background: #fff;
          }
        }
      }
      span {
        vertical-align: middle;
      }
    }
    .icon-close {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      position: relative;
      left: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
</style>
