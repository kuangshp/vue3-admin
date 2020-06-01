<template>
  <div class="sidebae">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="isCollapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <!-- <template v-for="(item, index) in menuList">
        <MenuItem
          :key="index"
          :item="item"
        />
      </template> -->
      <template v-for="item in menuList">
        <template v-if="item.subs">
          <el-submenu
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import MenuItem from './MenuItem.vue';
import { mapState } from 'vuex';

export default {
  props: {},
  data () {
    return {
      // isCollapse: false,
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.view.menuList,
      isCollapse: state => state.view.sidebarOpened,
    }),
    onRoutes () {
      return this.$route.path.replace('/', '');
    }
  },
  mounted () {
    console.log(this.menuList, '==aa=')
  },
  components: {
    // MenuItem,
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu {
  height: calc(100vh - 50px);
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}

[class*=" el-icon-lx"],
[class^="el-icon-lx"] {
  font-family: lx-iconfont !important;
}
</style>
