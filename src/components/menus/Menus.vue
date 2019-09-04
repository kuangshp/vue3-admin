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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MenuItem from './MenuItem.vue';
import { State, Action } from 'vuex-class';
import { IViewState } from '@/store/view';

@Component({
  components: {
    MenuItem,
  },
})
export default class Menu extends Vue {
  // 获取本地存储的菜单
  @State private viewStore!: IViewState;

  private isCollapse: boolean = false;

  private handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  private handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }

  // 计算属性
  private get menuList() {
    return this.viewStore.menuList;
  }
}
</script>

<style scoped lang="less">
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
