<template>
  <div class="app-sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          v-if="menuList.length"
          background-color="#333"
          text-color="#fff"
          active-text-color="#f90"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="(item, index) in menuList">
            <MenuItem
              :key="index"
              :item="item"
            />
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import MenuItem from './MenuItem.vue';
// import { IViewState } from '@/store/view';

export default {
  props: {},
  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    menuList() {
      return [];
    }
  },
  components: {
    MenuItem,
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  .app-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .is-active {
      background: rgb(41, 41, 41);
    }
  }
}
</style>
