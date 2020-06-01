<template>
  <el-row class="tac">
    <el-col :span="24">
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
        <template v-for="(item, index) in menuList">
          <MenuItem
            :key="index"
            :item="item"
          />
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import MenuItem from './MenuItem.vue';
import { mapState } from 'vuex';

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
    ...mapState({
      menuList: state => state.view.menuList,
    }),
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  mounted() {
    console.log(this.menuList, '===')
  },
  components: {
    MenuItem,
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
</style>
