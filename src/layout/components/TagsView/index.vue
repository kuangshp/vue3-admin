<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        @contextmenu.prevent="openMenu($event, index)"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :style="{
          backgroundColor: isActive(tag) ? '#304156' : '',
          borderColor: isActive(tag) ? '#304156' : '',
        }"
        v-for="(tag, index) in $store.getters.tagsViewList"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
      >
        {{ tag.title }}
        <svg-icon icon="close" v-show="!isActive(tag)" class="el-icon-close" @click.prevent.stop="onCloseClick(index)"></svg-icon>
      </router-link>
    </el-scrollbar>
    <!-- 右键弹框 -->
    <ContextMenu v-show="visible" :style="menuStyle" :index="selectIndex"></ContextMenu>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ContextMenu from './components/ContextMenu';

const route = useRoute();
const store = useStore();

// 选中的序列号
const selectIndex = ref(0);
// 是否显示右键弹框
const visible = ref(false);
// 右键的时候鼠标位置
const menuStyle = reactive({
  left: 0,
  top: 0,
});
/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path;
};

// 导航右键操作
const openMenu = (e, index) => {
  const { x, y } = e;
  menuStyle.left = x + 'px';
  menuStyle.top = y + 'px';
  selectIndex.value = index;
  visible.value = true;
};
// 关闭右键弹框
const closeMenu = () => {
  visible.value = false;
};
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

// 关闭当前tag
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index,
  });
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 28px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
