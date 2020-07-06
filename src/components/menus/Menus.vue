<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="!isCollapse" background-color="#fff" text-color="#333" active-text-color="#3273dc" unique-opened v-if="menuList.length" @select="selectMenu">
      <template v-for="(item, i) in menuList">
        <MenuItem :key="i" :item="item" />
      </template>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { mapState } from 'vuex';
import { getTreeList } from '@/utils';

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      authMenuList: state => state.menus.authMenuList,
      isCollapse: state => state.view.sidebarOpened,
    }),
    // 对菜单进行格式化
    menuList () {
      try {
        return getTreeList(this.authMenuList);
      } catch (e) {
        return [];
      }
    },
    onRoutes () {
      return this.$route.path.replace('/', '');
    }
  },
  methods: {
    selectMenu (item) {
      this.$router.push({ name: item, replace: true });
    }
  },
  components: {
    MenuItem,
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  /* display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll; */
  /* float: left; */
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu {
  height: calc(100vh - 50px);
  box-shadow: 0 0 1.2em rgba(0, 0, 0, 0.12);
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 240px;
}
</style>
