<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右边</li>
    <li @click="onCloseOtherClick">关闭其它</li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

// 刷新操作
const onRefreshClick = () => {
  router.go(0);
};
// 关闭右边
const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index,
  });
};

// 关闭其它
const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index,
  });
};
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
