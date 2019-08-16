<template>
  <div class="app-sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          :default-active="$route.url"
          :router="true"
          background-color="#333"
          text-color="#fff"
          active-text-color="#f00"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="item of menus">
            <template v-if="item.children && item.children.length">
              <el-submenu
                :index="item.url"
                :key="item.url"
              >
                <template slot="title">
                  <i :class="item.ico"></i>
                  <span>{{item.label}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(subItem, index) of item.children"
                    :key="index"
                    :index="subItem.url"
                  >
                    <i :class="subItem.ico"></i>
                    <span>{{subItem.label}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </template>
          <template v-for="item of menus">
            <template v-if="!item.children || !item.children.length">
              <el-menu-item
                :key="item.url"
                :index="item.url"
              >
                <i :class="item.ico"></i>
                <span slot="title">{{item.label}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { menus } from '@/statics/menus';

@Component({
  components: {},
})
export default class AppSidebar extends Vue {
  @Provide() private data() {
    return {
      menus,
      isCollapse: false,
    };
  }

  @Provide() private handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  @Provide() private handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
}
</script>
<style lang="less">
.sidebar {
  position: relative;
  .app-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>